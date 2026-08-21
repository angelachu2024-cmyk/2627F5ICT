(() => {
  const problemSelect = document.querySelector('#problem-select');
  const problemTitle = document.querySelector('#problem-title');
  const problemDescription = document.querySelector('#problem-description');
  const problemReference = document.querySelector('#problem-reference');
  const problemMeta = document.querySelector('#problem-meta');
  const requirements = document.querySelector('#requirements');
  const homeworkPanel = document.querySelector('#homework-panel');
  const homeworkTitle = document.querySelector('#homework-title');
  const codeNameExample = document.querySelector('#code-name-example');
  const screenshotNameExample = document.querySelector('#screenshot-name-example');
  const topCommentExample = document.querySelector('#top-comment-example');
  const questionCommentExample = document.querySelector('#question-comment-example');
  const wholeFileDescription = document.querySelector('#whole-file-description');
  const markingList = document.querySelector('#marking-list');
  const questionChecks = document.querySelector('#question-checks');
  const wholeFileResult = document.querySelector('#whole-file-result');
  const checkFileButton = document.querySelector('#check-file-button');
  const fileInput = document.querySelector('#file-input');
  const fileName = document.querySelector('#file-name');
  const resultsPanel = document.querySelector('#results-panel');
  const engineStatus = document.querySelector('#pyodide-status');
  let worker;
  let gradeTimeout;
  let activeRequest;

  function currentProblem() {
    return PROBLEMS.find((problem) => problem.id === problemSelect.value);
  }

  function setEngineStatus(state, text) {
    engineStatus.dataset.state = state;
    engineStatus.lastChild.textContent = ` ${text}`;
  }

  function createWorker() {
    if (worker) worker.terminate();
    worker = new Worker('worker.js');
    worker.onmessage = onWorkerResult;
    worker.onerror = () => setEngineStatus('error', 'Python unavailable');
  }

  function initializeDashboard() {
    populateProblems();
    createWorker();
  }

  function populateProblems() {
    problemSelect.innerHTML = PROBLEMS.map((problem) => `<option value="${problem.id}">${problem.title}</option>`).join('');
    updateProblem(PROBLEMS[0]);
  }

  function showHomeworkDetails(problem) {
    const homework = problem.homework;
    const requiredQuestions = homework.questions.filter((item) => item.required_for_full_homework !== false);
    const firstRequired = requiredQuestions[0]?.no ?? 1;
    const lastRequired = requiredQuestions[requiredQuestions.length - 1]?.no ?? 1;
    homeworkPanel.hidden = false;
    resultsPanel.hidden = true;
    homeworkTitle.textContent = `${homework.id} Instructions`;
    codeNameExample.textContent = homework.code_name_example || `F5A01_YourName_${homework.id}.py`;
    screenshotNameExample.textContent = homework.screenshot_name_example || `F5A01_YourName_${homework.id}.png`;
    topCommentExample.textContent = homework.top_comment_example || '# F5A01 YourName';
    questionCommentExample.textContent = homework.question_comment_template ? homework.question_comment_template.replace('{n}', 'n') : `# ${homework.id} Qn`;
    wholeFileDescription.textContent = `Upload the complete ${homework.id} file to validate Q${firstRequired}-Q${lastRequired} in one run (optional question is 0%).`;
    questionChecks.innerHTML = homework.questions
      .map((item) => `
        <article class="question-card">
          <h4>${item.optional ? 'Optional' : `Q${item.no}`}. ${item.title}</h4>
          <p>${item.prompt}</p>
          <div class="expected-output">
            <div class="editor-tab">Expected output</div>
            <pre>${escapeHtml(item.test_cases?.[0]?.expected_output || '(no expected output)')}</pre>
          </div>
          <label for="question-code-${item.no}">Code for ${item.optional ? 'Optional' : `Q${item.no}`}</label>
          <textarea id="question-code-${item.no}" class="code-editor" placeholder="#${homework.id} Q${item.no}"></textarea>
          <div class="question-actions">
            <button class="primary-button question-run" type="button" data-question-no="${item.no}">Check ${item.optional ? 'Optional' : `Q${item.no}`}</button>
          </div>
          <section id="question-result-${item.no}" class="inline-result" aria-live="polite">
            <div class="results-placeholder"><span aria-hidden="true">&middot;&middot;&middot;</span><p>Result for ${item.optional ? 'Optional' : `Q${item.no}`} will appear here.</p></div>
          </section>
        </article>
      `)
      .join('');

    questionChecks.querySelectorAll('.question-run').forEach((button) => {
      button.addEventListener('click', () => handleQuestionCheck(Number(button.dataset.questionNo)));
    });

    markingList.innerHTML = homework.marking_scheme.map((item) => `<li>${item}</li>`).join('');
    wholeFileResult.innerHTML = '<div class="results-placeholder"><span aria-hidden="true">&middot;&middot;&middot;</span><p>Whole-file result will appear here.</p></div>';
  }

  function hideHomeworkDetails() {
    homeworkPanel.hidden = true;
    resultsPanel.hidden = false;
  }

  function updateProblem(problem) {
    problemTitle.textContent = problem.title;
    problemDescription.textContent = problem.description;
    problemReference.innerHTML = '';
    for (element of problem.references) {
      problemReference.innerHTML = problemReference.innerHTML+` <a href="${element}" target="_blank">${element}</a>`;
    }
    problemReference.innerHTML = 'REFERENCES: '+problemReference.innerHTML;
    if (problem.homework) {
      problemMeta.textContent = `${problem.homework.questions.length} questions · paste one or submit full file`;
      requirements.innerHTML = '<span>Filename required</span><span>Header comments required</span>';
      showHomeworkDetails(problem);
    } else {
      const testCount = problem.test_cases?.length ?? 0;
      problemMeta.textContent = `${testCount} test cases · input/output`;
      requirements.innerHTML = problem.requirements.require_loop ? '<span>Loop required</span>' : '<span>Standard challenge</span>';
      hideHomeworkDetails();
    }
  }

  function renderInlineResult(targetElement, result) {
    const className = result.verdict.toLowerCase().replaceAll(' ', '-');
    targetElement.innerHTML = `<div class="result-header"><h2 class="verdict ${className}">${result.verdict}</h2><span class="result-cases">${result.detail || 'Complete'}</span></div><pre class="result-log">${escapeHtml(result.logs)}</pre>`;
  }

  function escapeHtml(value) {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  function showGradingState(targetElement, message) {
    targetElement.innerHTML = `<div class="results-placeholder"><span aria-hidden="true">&middot;&middot;&middot;</span><p>${message}</p></div>`;
    setEngineStatus('loading', 'Grading submission');
  }

  function requestGrade(payload, pendingMessage, targetElement) {
    if (activeRequest) {
      renderInlineResult(targetElement, { verdict: 'Requirement Failed', detail: 'Busy', logs: 'Please wait for the current check to finish before starting another.' });
      return;
    }
    if (!worker) createWorker();
    const requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    activeRequest = { id: requestId, targetElement };
    showGradingState(targetElement, pendingMessage);
    payload.requestId = requestId;
    worker.postMessage({ type: 'grade', payload });
    clearTimeout(gradeTimeout);
    gradeTimeout = setTimeout(() => {
      const timeoutTarget = activeRequest?.targetElement || resultsPanel;
      worker.terminate();
      renderInlineResult(timeoutTarget, { verdict: 'Runtime Error', detail: 'Execution timed out', logs: 'The submission ran for too long and was stopped.' });
      setEngineStatus('loading', 'Restarting Python');
      activeRequest = null;
      createWorker();
    }, 12000);
  }

  function validateHomeworkInputs(code, filename, targetElement) {
    if (!code) {
      renderInlineResult(targetElement, { verdict: 'Requirement Failed', detail: 'No code provided', logs: 'Paste your code first, then press the question check button.' });
      return false;
    }
    return true;
  }

  function handleQuestionCheck(questionNo) {
    const problem = currentProblem();
    if (!problem?.homework) return;
    const codeField = document.querySelector(`#question-code-${questionNo}`);
    const target = document.querySelector(`#question-result-${questionNo}`);
    const code = codeField ? codeField.value.trim() : '';
    if (!validateHomeworkInputs(code, '', target)) return;
    requestGrade(
      {
        mode: 'single-question',
        code,
        filename: `${problem.homework.id}.py`,
        questionNo,
        problem
      },
      `Running Q${questionNo} checks...`,
      target
    );
  }

  function handleFile(file) {
    if (!file) return;
    if (!file.name.endsWith('.py')) {
      fileName.textContent = 'Please choose a .py file.';
      fileName.style.color = 'var(--red)';
      return;
    }
    fileName.style.color = '';
    fileName.textContent = `Preparing ${file.name}...`;
    const reader = new FileReader();
    reader.onload = () => {
      const problem = currentProblem();
      fileName.textContent = `${file.name} · grading in progress`;
      const target = problem.homework ? wholeFileResult : resultsPanel;
      requestGrade(
        {
          mode: problem.homework ? 'full-homework' : 'standard',
          code: reader.result,
          filename: file.name,
          problem
        },
        'Running your submission against the test cases...',
        target
      );
    };
    reader.readAsText(file);
  }

  function handleWholeFileButton() {
    const problem = currentProblem();
    if (!problem?.homework) return;
    fileInput.click();
  }

  problemSelect.addEventListener('change', () => updateProblem(PROBLEMS.find((problem) => problem.id === problemSelect.value)));
  checkFileButton.addEventListener('click', handleWholeFileButton);
  fileInput.addEventListener('change', () => handleFile(fileInput.files[0]));

  function onWorkerResult(event) {
    if (event.data.type === 'ready') setEngineStatus('ready', 'Python ready');
    if (event.data.type === 'engine-error') setEngineStatus('error', 'Python unavailable');
    if (event.data.type !== 'result') return;
    clearTimeout(gradeTimeout);
    setEngineStatus('ready', 'Python ready');
    const requestId = event.data.requestId;
    if (!activeRequest || requestId !== activeRequest.id) return;
    renderInlineResult(activeRequest.targetElement, event.data.result);
    activeRequest = null;
  }

  initializeDashboard();
})();
