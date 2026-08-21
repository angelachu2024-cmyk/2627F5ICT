importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js');

let pyodide;

async function initialize() {
  pyodide = await loadPyodide();
  self.postMessage({ type: 'ready' });
}

const initPromise = initialize().catch((error) => {
  self.postMessage({ type: 'engine-error', message: error.toString() });
});

async function gradeSubmission(payload) {
  await initPromise;
  if (!pyodide) return;

  const requestId = payload?.requestId || null;

  const payloadLiteral = JSON.stringify(payload);
  const script = `
import ast
import io
import json
import re
import sys
import traceback

submission = json.loads(${JSON.stringify(payloadLiteral)})
problem = submission['problem']
student_code = submission['code']
mode = submission.get('mode', 'standard')
filename = submission.get('filename', '')
question_no = submission.get('questionNo')
homework = problem.get('homework', {})
homework_id = homework.get('id', 'HW1').upper()
hw_match = re.search(r'(\\d+)', homework_id)
homework_number = int(hw_match.group(1)) if hw_match else 1
question_template = homework.get('question_comment_template', '# HW1 Q{n}')

def normalize_template_parts(template):
  template_text = template.strip()
  if template_text.startswith('#'):
    template_text = template_text[1:].strip()
  if '{n}' not in template_text:
    template_text = template_text + ' {n}'
  pre, post = template_text.split('{n}', 1)
  pre_tokens = re.findall(r'[A-Za-z0-9]+', pre)
  post_tokens = re.findall(r'[A-Za-z0-9]+', post)
  pre_pattern = r'[\\s_]*'.join(re.escape(token) for token in pre_tokens)
  post_pattern = r'[\\s_]*'.join(re.escape(token) for token in post_tokens)
  return pre_pattern, post_pattern

def question_comment_regex(template, capture=False, q_no=None):
  pre_pattern, post_pattern = normalize_template_parts(template)
  number_pattern = r'0?(\\d+)' if capture else r'0?' + str(int(q_no))
  pattern = r'^\\s*#\\s*'
  if pre_pattern:
    pattern += pre_pattern + r'[\\s_]*'
  pattern += number_pattern
  if post_pattern:
    pattern += r'[\\s_]*' + post_pattern
  pattern += r'\\b.*$'
  return re.compile(pattern, re.MULTILINE | re.IGNORECASE)

def normalize_comment(text):
  return re.sub(r'[^a-z0-9]', '', text.lower())

def get_comment_lines(code):
  return [line for line in code.splitlines() if line.strip().startswith('#')]

def has_top_identity_comment(code):
  for line in get_comment_lines(code):
    normalized = normalize_comment(line)
    if re.match(r'^f5[abcd](0[1-9]|[12][0-9]|3[0-9]|40).+$', normalized):
      return True
  return False

def has_question_comment(code, q_no):
  regex = question_comment_regex(question_template, False, q_no)
  return bool(regex.search(code))

def has_optional_comment(code):
  normalized_comments = [normalize_comment(line) for line in get_comment_lines(code)]
  optional_no = 8
  optional_question = next((item for item in homework.get('questions', []) if item.get('optional')), None)
  if optional_question is not None:
    optional_no = int(optional_question.get('no', 8))

  optional_regex = question_comment_regex(question_template, False, optional_no)

  for comment in normalized_comments:
    if comment.startswith('questionoptional'):
      return True
  return bool(optional_regex.search(code))

def requirement_failed(detail, logs):
  return {'verdict': 'Requirement Failed', 'detail': detail, 'logs': logs}

def run_cases(code, cases):
  logs = []
  for index, test_case in enumerate(cases, 1):
    captured_output = io.StringIO()
    original_stdin, original_stdout = sys.stdin, sys.stdout
    try:
      sys.stdin = io.StringIO(test_case['input'])
      sys.stdout = captured_output
      exec(compile(code, '<student-submission>', 'exec'), {'__name__': '__main__'})
      actual = captured_output.getvalue().strip()
    except Exception:
      return {'verdict': 'Runtime Error', 'detail': 'Test case ' + str(index), 'logs': traceback.format_exc()}
    finally:
      sys.stdin, sys.stdout = original_stdin, original_stdout
    expected = test_case['expected_output'].strip()
    if actual != expected:
      return {
        'verdict': 'Wrong Answer',
        'detail': 'Test case ' + str(index),
        'logs': 'Expected: ' + repr(expected) + '\\nReceived: ' + repr(actual)
      }
    logs.append('Test case ' + str(index) + ': passed')
  return {'verdict': 'Accepted', 'detail': 'Complete', 'logs': '\\n'.join(logs)}

def check_loop_requirement(code):
  if not problem.get('requirements', {}).get('require_loop', False):
    return None
  try:
    tree = ast.parse(code)
  except SyntaxError:
    raise
  if not any(isinstance(node, (ast.For, ast.While)) for node in ast.walk(tree)):
    return requirement_failed('Loop Required', 'This challenge requires at least one for or while loop.')
  return None

def check_homework_headers(code, fname, q_no=None, require_filename=False):
  req = problem.get('requirements', {})
  if require_filename:
    pattern = req.get('enforce_filename_pattern')
    if pattern and not re.match(pattern, fname or '', re.IGNORECASE):
      return requirement_failed('Filename format', 'Use filename format like F5A01_YourName_' + homework_id + '.py where class is A-D and number is 01-40.')

  if req.get('require_top_homework_comment') and require_filename:
    if not has_top_identity_comment(code):
      return requirement_failed('Missing top comment', 'Add comment like "# F5A01 YourName" near the top. Class must be A-D and number 01-40.')

  if q_no is not None:
    optional_question = next((item for item in homework.get('questions', []) if item.get('optional')), None)
    optional_no = int(optional_question.get('no', 8)) if optional_question else 8
    if int(q_no) == optional_no:
      if not has_optional_comment(code):
        return requirement_failed('Missing question comment', 'Add comment "# Question: Optional" or "# ' + homework_id + ' Q' + str(optional_no) + '".')
    elif not has_question_comment(code, q_no):
      return requirement_failed('Missing question comment', 'Add comment like "' + question_template.replace('{n}', '1') + '" for this answer.')
  return None

if mode == 'standard':
  precheck = check_loop_requirement(student_code)
  result = precheck if precheck else run_cases(student_code, problem['test_cases'])
elif mode == 'single-question':
  precheck = check_homework_headers(student_code, filename, question_no, False)
  if precheck is not None:
    result = precheck
  else:
    question = next((item for item in problem['homework']['questions'] if item['no'] == question_no), None)
    if question is None:
      result = requirement_failed('Question not found', 'Select a valid question number.')
    else:
      result = run_cases(student_code, question['test_cases'])
      if result['verdict'] == 'Accepted':
        optional_question = next((item for item in homework.get('questions', []) if item.get('optional')), None)
        optional_no = int(optional_question.get('no', 8)) if optional_question else 8
        result['detail'] = 'Optional' if int(question_no) == optional_no else homework_id + ' Q' + str(question_no)
        result['logs'] += '\\n\\nQuestion passed.'
elif mode == 'full-homework':
  precheck = check_homework_headers(student_code, filename, None, True)
  if precheck is not None:
    result = precheck
  else:
    marker_re = question_comment_regex(question_template, True)
    optional_re = re.compile(r'^\\s*#\\s*Question\\s*:\\s*Optional\\b.*$', re.MULTILINE | re.IGNORECASE)
    markers = list(marker_re.finditer(student_code))
    marker_by_q = {int(match.group(1)): match for match in markers}
    sections = {}
    ordered = sorted((int(match.group(1)), match.start(), match.end()) for match in markers)
    for idx, (q_num, start_pos, _) in enumerate(ordered):
      end_pos = ordered[idx + 1][1] if idx + 1 < len(ordered) else len(student_code)
      sections[q_num] = student_code[start_pos:end_pos]

    logs = []
    optional_marker = optional_re.search(student_code)
    required_questions = [item for item in homework.get('questions', []) if not item.get('optional') and item.get('required_for_full_homework') is not False]
    first_required_no = required_questions[0]['no'] if required_questions else 1
    last_required_no = required_questions[-1]['no'] if required_questions else 1
    result = {'verdict': 'Accepted', 'detail': homework_id + ' Q' + str(first_required_no) + '-Q' + str(last_required_no), 'logs': ''}
    for question in problem['homework']['questions']:
      q_no = question['no']
      if question.get('required_for_full_homework') is False:
        continue
      if q_no not in marker_by_q:
        result = requirement_failed('Missing question comment', 'Missing comment: # ' + homework_id + ' Q' + str(q_no))
        break
      section_code = sections.get(q_no, '')
      if not section_code.strip():
        result = requirement_failed('Missing answer', 'No code found under # ' + homework_id + ' Q' + str(q_no) + '.')
        break
      section_result = run_cases(section_code, question['test_cases'])
      if section_result['verdict'] != 'Accepted':
        section_result['detail'] = homework_id + ' Q' + str(q_no) + ' - ' + section_result['detail']
        result = section_result
        break
      logs.append(homework_id + ' Q' + str(q_no) + ': passed')

    optional_question = next((item for item in problem['homework']['questions'] if item.get('optional')), None)
    if result['verdict'] == 'Accepted' and optional_question:
      optional_code = None
      optional_no = int(optional_question.get('no', 8))

      # Accept optional section marked either as "# Question: Optional" or as HWn/HW0n Qm.
      if optional_no in sections:
        optional_code = sections[optional_no]
      elif optional_marker:
        optional_start = optional_marker.start()
        optional_end = len(student_code)
        for q_num, start_pos, _ in ordered:
          if start_pos > optional_start:
            optional_end = start_pos
            break
        optional_code = student_code[optional_start:optional_end]

      if optional_code and optional_code.strip():
        optional_result = run_cases(optional_code, optional_question['test_cases'])
        if optional_result['verdict'] == 'Accepted':
          logs.append(homework_id + ' Optional: passed (0%)')
        else:
          logs.append(homework_id + ' Optional: not passed (0%): ' + optional_result['detail'])

    if result['verdict'] == 'Accepted':
      result['logs'] = '\\n'.join(logs) + '\\n\\nComplete homework passed.'
else:
  result = requirement_failed('Unsupported mode', 'Unknown grading mode.')

json.dumps(result)
`;

  try {
  const result = await pyodide.runPythonAsync(script);
  self.postMessage({ type: 'result', requestId, result: JSON.parse(result) });
  } catch (error) {
  self.postMessage({ type: 'result', requestId, result: { verdict: 'Runtime Error', detail: 'Evaluation error', logs: error.toString() } });
  }
}

self.onmessage = async (event) => {
  if (event.data.type === 'grade') await gradeSubmission(event.data.payload);
};
