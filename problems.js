const PROBLEMS = [
  {
    id: 'hw1',
    title: 'Homework 1: Python Lists',
    description: 'Submit one question at a time by pasting code and pressing the button, or submit a complete homework file by drag and drop. ',
    references: [
      'https://www.w3schools.com/python/python_lists.asp',
      'https://www.w3schools.com/python/python_strings.asp'
    ],
    requirements: {
      require_loop: false,
      enforce_filename_pattern: '^F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)_[A-Za-z][A-Za-z0-9]*_HW0?1\\.py$',
      require_top_homework_comment: true,
      top_homework_comment_pattern: '^\\s*#\\s*F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)\\s+\\S+'
    },
    homework: {
      id: 'HW1',
      top_comment_example: '# F5A01 YourName',
      question_comment_template: '# HW1 Q{n}',
      screenshot_name_example: 'F5A01_YourName_HW01.png',
      questions: [
        {
          no: 1,
          title: 'Create a List',
          prompt: 'Create a list named fruits containing "apple", "banana", "orange" and print it.',
          test_cases: [
            { input: '', expected_output: "['apple', 'banana', 'orange']" }
          ]
        },
        {
          no: 2,
          title: 'Access List Elements',
          prompt: 'Print the first and last items in fruits line by line.',
          test_cases: [
            { input: '', expected_output: 'apple\norange' }
          ]
        },
        {
          no: 3,
          title: 'Modify List Elements',
          prompt: 'Change the second fruit to grape and print the list.',
          test_cases: [
            { input: '', expected_output: "['apple', 'grape', 'orange']" }
          ]
        },
        {
          no: 4,
          title: 'Append to List',
          prompt: 'Use append() to add mango at the end and print the list.',
          test_cases: [
            { input: '', expected_output: "['apple', 'banana', 'orange', 'mango']" }
          ]
        },
        {
          no: 5,
          title: 'Insert into List',
          prompt: 'Use insert() to insert kiwi at index 1 and print the list.',
          test_cases: [
            { input: '', expected_output: "['apple', 'kiwi', 'banana', 'orange']" }
          ]
        },
        {
          no: 6,
          title: 'Remove from List',
          prompt: 'Use remove() to delete banana and print the list.',
          test_cases: [
            { input: '', expected_output: "['apple', 'orange']" }
          ]
        },
        {
          no: 7,
          title: 'Pop from List',
          prompt: 'Use pop(2), store in removed_fruit, and print removed fruit and updated list.',
          test_cases: [
            { input: '', expected_output: "Removed fruit: orange\nUpdated list: ['apple', 'banana']" }
          ]
        },
        {
          no: 8,
          title: 'Optional: Event Attendees (0%)',
          prompt: 'Create attendees list, collect 5 names with input, append each, and print attendees list. Use comment # Question: Optional or # HW1 Q8.',
          optional: true,
          required_for_full_homework: false,
          test_cases: [
            {
              input: 'LinaBell\nStella\nDuffy\nShellieMay\nGelatoni\n',
              expected_output: "Please enter your name: Please enter your name: Please enter your name: Please enter your name: Please enter your name: attendees: ['LinaBell', 'Stella', 'Duffy', 'ShellieMay', 'Gelatoni']"
            }
          ]
        }
      ],
      marking_scheme: [
        'Screenshots: included all codes and outputs (10%)',
        'All file names and extensions are correct (10%)',
        'Comments for each question (10%)',
        'Complete Q1-Q7, each worth 10% (70%)',
        'Optional question: 0%'
      ]
    }
  },
  {
    id: 'hw2',
    title: 'Homework 2: Lists and Strings',
    description: 'Submit one question at a time by pasting code and pressing the button, or submit a complete homework file by drag and drop.',
    references: [
      'https://www.w3schools.com/python/python_lists.asp',
      'https://www.w3schools.com/python/python_strings.asp'
    ],
    requirements: {
      require_loop: false,
      enforce_filename_pattern: '^F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)_[A-Za-z][A-Za-z0-9]*_HW0?2\\.py$',
      require_top_homework_comment: true,
      top_homework_comment_pattern: '^\\s*#\\s*F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)\\s+\\S+'
    },
    homework: {
      id: 'HW2',
      top_comment_example: '# F5A01 YourName',
      question_comment_template: '# HW2 Q{n}',
      screenshot_name_example: 'F5A01_YourName_HW02.png',
      questions: [
        {
          no: 1,
          title: 'Convert String to List',
          prompt: 'Convert word into a list, store it in list1, and print list1.',
          test_cases: [
            { input: '', expected_output: "['P', 'y', 't', 'h', 'o', 'n']" }
          ]
        },
        {
          no: 2,
          title: 'List Membership Testing',
          prompt: 'Run the membership tests and print all six boolean results in order.',
          test_cases: [
            { input: '', expected_output: 'True\nFalse\nFalse\nFalse\nTrue\nTrue' }
          ]
        },
        {
          no: 3,
          title: 'Multiple Assignment from List',
          prompt: 'Assign red list values into gift, like, eat using multiple assignment, then print them.',
          test_cases: [
            { input: '', expected_output: 'flower blood apple' }
          ]
        },
        {
          no: 4,
          title: 'Split Date into Variables',
          prompt: 'Split the date into year, month, day and print in required format.',
          test_cases: [
            { input: '', expected_output: 'year: 1939\nmonth: 01\nday: 06' }
          ]
        },
        {
          no: 5,
          title: 'Split Date (Partial)',
          prompt: 'Split date with one split only and print resulting list.',
          test_cases: [
            { input: '', expected_output: "['1939', '01/06']" }
          ]
        },
        {
          no: 6,
          title: 'Find Index in List',
          prompt: 'Find index of David in names list and print it in sentence format.',
          test_cases: [
            { input: '', expected_output: 'The index of David is 3' }
          ]
        },
        {
          no: 7,
          title: 'List Comprehension with range()',
          prompt: 'Create a list from 1 to 10 and print it.',
          test_cases: [
            { input: '', expected_output: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]' }
          ]
        },
        {
          no: 8,
          title: 'Optional: Square of Each Element (0%)',
          prompt: 'Continue from Q7 and print squared_numbers list with squares from 1 to 10.',
          optional: true,
          required_for_full_homework: false,
          test_cases: [
            { input: '', expected_output: '[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]' }
          ]
        }
      ],
      marking_scheme: [
        'Submitted clear screenshots (10%)',
        'Submit the file correctly, with the correct file name and extension (10%)',
        'Each question has input comments (10%)',
        'Complete Q1-Q7, each worth 10% (70%)',
        'Optional question: 0%'
      ]
    }
  },
  {
    id: 'hw3',
    title: 'Homework 3: List Processing and Sorting',
    description: 'Submit one question at a time by pasting code and pressing the button, or submit a complete homework file by upload.',
    references: [
      'https://www.w3schools.com/python/python_lists.asp',
      'https://www.w3schools.com/python/python_lists_sort.asp'
    ],
    requirements: {
      require_loop: false,
      enforce_filename_pattern: '^F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)_[A-Za-z][A-Za-z0-9]*_HW0?3\\.py$',
      require_top_homework_comment: true,
      top_homework_comment_pattern: '^\\s*#\\s*F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)\\s+\\S+'
    },
    homework: {
      id: 'HW3',
      top_comment_example: '# F5A01 YourName',
      question_comment_template: '# HW3 Q{n}',
      screenshot_name_example: 'F5A01_YourName_HW03.png',
      questions: [
        {
          no: 1,
          title: 'Iterate and Modify List Items',
          prompt: 'Iterate colours; print ORANGE in uppercase, others with title case, using a for loop.',
          test_cases: [
            { input: '', expected_output: 'Red ORANGE Yellow Green' }
          ]
        },
        {
          no: 2,
          title: 'Save Found Value to Another List',
          prompt: 'Copy colours into newcolours, replacing orange with purple, then print newcolours.',
          test_cases: [
            { input: '', expected_output: "['red', 'purple', 'yellow', 'green']" }
          ]
        },
        {
          no: 3,
          title: 'Sort List in Ascending Order',
          prompt: 'Sort numbers = [2, 8, 5, 7, 3, 4, 8, 9] in ascending order and print.',
          test_cases: [
            { input: '', expected_output: '[2, 3, 4, 5, 7, 8, 8, 9]' }
          ]
        },
        {
          no: 4,
          title: 'Sort List in Reverse Order',
          prompt: 'Sort numbers = [2, 8, 5, 7, 3, 4, 8, 9] in reverse order and print.',
          test_cases: [
            { input: '', expected_output: '[9, 8, 8, 7, 5, 4, 3, 2]' }
          ]
        },
        {
          no: 5,
          title: 'Count Elements Containing a Letter',
          prompt: 'Count elements in colours containing letter r and print in the required sentence.',
          test_cases: [
            { input: '', expected_output: '3 colours that contain the letter r.' }
          ]
        },
        {
          no: 6,
          title: 'Subtract, Absolute Value, and Sort',
          prompt: 'From numbers [100, 50, 65, 82, 23], subtract 50, take abs, sort ascending, and print.',
          test_cases: [
            { input: '', expected_output: '[0, 15, 27, 32, 50]' }
          ]
        }
      ],
      marking_scheme: [
        'Submitted clear screenshots (10%)',
        'Submit the file correctly, with the correct file name and extension (10%)',
        'Each question has input comments (10%)',
        'Complete Q1-Q4, each worth 10% (40%)',
        'Complete Q5-Q6, each worth 15% (30%)'
      ]
    }
  },
  {
    id: 'hw4',
    title: 'Homework 4: Python Dictionaries',
    description: 'Submit one question at a time by pasting code and pressing the button, or submit a complete homework file by upload.',
    references: [
      'https://www.w3schools.com/python/python_dictionaries.asp'
    ],
    requirements: {
      require_loop: false,
      enforce_filename_pattern: '^F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)_[A-Za-z][A-Za-z0-9]*_HW0?4\\.py$',
      require_top_homework_comment: true,
      top_homework_comment_pattern: '^\\s*#\\s*F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)\\s+\\S+'
    },
    homework: {
      id: 'HW4',
      top_comment_example: '# F5A01 YourName',
      question_comment_template: '# HW4 Q{n}',
      screenshot_name_example: 'F5A01_YourName_HW04.png',
      questions: [
        {
          no: 1,
          title: 'Create a Dictionary',
          prompt: 'Create dict student with name, age, major and print it.',
          test_cases: [
            { input: '', expected_output: "{'name': 'Alice', 'age': 20, 'major': 'Computer Science'}" }
          ]
        },
        {
          no: 2,
          title: 'Access Dictionary Value',
          prompt: 'Print the value of key name in student.',
          test_cases: [
            { input: '', expected_output: 'Alice' }
          ]
        },
        {
          no: 3,
          title: 'Add Key-Value Pair',
          prompt: 'Add key gpa with value 3.8 to student and print it.',
          test_cases: [
            { input: '', expected_output: "{'name': 'Alice', 'age': 20, 'major': 'Computer Science', 'gpa': 3.8}" }
          ]
        },
        {
          no: 4,
          title: 'Modify Dictionary Value',
          prompt: 'Change student age to 21 and print student.',
          test_cases: [
            { input: '', expected_output: "{'name': 'Alice', 'age': 21, 'major': 'Computer Science', 'gpa': 3.8}" }
          ]
        },
        {
          no: 5,
          title: 'Check if Key Exists',
          prompt: 'Check whether gender and name are keys in student and print both results.',
          test_cases: [
            { input: '', expected_output: 'False\\nTrue' }
          ]
        },
        {
          no: 6,
          title: 'Delete Key-Value Pair',
          prompt: 'Delete key major from student and print student.',
          test_cases: [
            { input: '', expected_output: "{'name': 'Alice', 'age': 21, 'gpa': 3.8}" }
          ]
        },
        {
          no: 7,
          title: 'Iterate Through Dictionary',
          prompt: 'Use for loop with items() to print every key-value pair in student.',
          test_cases: [
            { input: '', expected_output: 'name: Alice\\nage: 21\\ngpa: 3.8' }
          ]
        },
        {
          no: 8,
          title: 'Optional: Intelligent Chatbot (0%)',
          prompt: 'Create chatbot dictionary, repeatedly answer questions until exit, and print Goodbye! when ending.',
          optional: true,
          required_for_full_homework: false,
          test_cases: [
            {
              input: 'Where is the computer room?\\nwhere is my classroom?\\nexit\\n',
              expected_output: "Enter a question: It's in room N313.\\nEnter a question: I don't know, please ask another question or type exit.\\nEnter a question: Goodbye!"
            }
          ]
        }
      ],
      marking_scheme: [
        'Submitted clear screenshots (10%)',
        'Submit the file correctly, with the correct file name and extension (10%)',
        'Each question has input comments (10%)',
        'Complete Q1-Q7, each worth 10% (70%)',
        'Optional question: 0%'
      ]
    }
  },
  {
    id: 'testrevision',
    title: 'Test Revision: Python Fundamentals',
    description: 'Submit one question at a time by pasting code and pressing the button, or submit a complete TestRevision file by upload.',
    requirements: {
      require_loop: false,
      enforce_filename_pattern: '^F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)_[A-Za-z][A-Za-z0-9]*_TestRevision\\.py$',
      require_top_homework_comment: true,
      top_homework_comment_pattern: '^\\s*#\\s*F5[ABCD](0[1-9]|[12][0-9]|3[0-9]|40)\\s+\\S+'
    },
    homework: {
      id: 'TestPractice',
      top_comment_example: '# F5A01 YourName',
      question_comment_template: '# TestPractice Q{n}',
      screenshot_name_example: 'F5A01_YourName_TestRevision.png',
      questions: [
        {
          no: 1,
          title: 'Create a List',
          prompt: 'Create list subjects = ["va", "english", "maths"] and print it.',
          test_cases: [
            { input: '', expected_output: "['va', 'english', 'maths']" }
          ]
        },
        {
          no: 2,
          title: 'Access List Elements',
          prompt: 'Print the second element of list subjects.',
          test_cases: [
            { input: '', expected_output: 'english' }
          ]
        },
        {
          no: 3,
          title: 'Modify List Elements',
          prompt: 'Change first element of clubs to "bt" and print clubs.',
          test_cases: [
            { input: '', expected_output: "['bt', 'drama club', 'choir']" }
          ]
        },
        {
          no: 4,
          title: 'Append to List',
          prompt: 'Append "Spanish" to languages and print list.',
          test_cases: [
            { input: '', expected_output: "['English', 'Chinese', 'Portuguese', 'Spanish']" }
          ]
        },
        {
          no: 5,
          title: 'Insert into List',
          prompt: 'Insert "orange" between red and yellow in colors and print list.',
          test_cases: [
            { input: '', expected_output: "['red', 'orange', 'yellow', 'green']" }
          ]
        },
        {
          no: 6,
          title: 'Delete from List',
          prompt: 'Remove green from colors and print list.',
          test_cases: [
            { input: '', expected_output: "['red', 'orange', 'yellow']" }
          ]
        },
        {
          no: 7,
          title: 'Iterate Through Nested List',
          prompt: 'Print the products list line by line with title line and separator exactly as required.',
          test_cases: [
            {
              input: '',
              expected_output: "- - - - - - - - - - - - - - - - - - - - -\\n商品串列\\n['iphone', 6888]\\n['MacPro', 14800]\\n['小米6', 2499]\\n['Coffee', 31]\\n['Book', 60]\\n['Nike', 699]"
            }
          ]
        },
        {
          no: 8,
          title: 'Remove Duplicates from List',
          prompt: 'Remove duplicate elements in data and print the deduplicated list preserving first occurrence.',
          test_cases: [
            { input: '', expected_output: "['aaron', 'andy', 'apple', 'amber', 'abner']" }
          ]
        },
        {
          no: 9,
          title: 'Count Characters in String',
          prompt: 'Count how many a/A characters appear in the user input string and print result.',
          test_cases: [
            { input: 'SACred HeArt Canossian College\\n', expected_output: 'Please enter a string: The number of a is: 4' }
          ]
        },
        {
          no: 10,
          title: 'Sort List in Descending Order',
          prompt: 'Sort data = [1, 5, 2, 8, 3] descending and print it.',
          test_cases: [
            { input: '', expected_output: '[8, 5, 3, 2, 1]' }
          ]
        },
        {
          no: 11,
          title: 'Create a Dictionary',
          prompt: 'Create dictionary my_dict with name, age, city and print it.',
          test_cases: [
            { input: '', expected_output: "{'name': 'John', 'age': 30, 'city': 'Macau'}" }
          ]
        },
        {
          no: 12,
          title: 'Find Numbers Divisible by 13',
          prompt: 'Find all numbers divisible by 13 in range 1-100 and print as a list.',
          test_cases: [
            { input: '', expected_output: '[13, 26, 39, 52, 65, 78, 91]' }
          ]
        },
        {
          no: 13,
          title: 'Cube of Even Numbers',
          prompt: 'From data = [1,2,3,4,5], put cubes of even numbers into new_list and print.',
          test_cases: [
            { input: '', expected_output: '[8, 64]' }
          ]
        },
        {
          no: 14,
          title: 'Inventory Management System',
          prompt: 'Repeatedly read product and amount until blank input; update stock and print final dictionary.',
          test_cases: [
            {
              input: 'orange 20\\napple 5\\n\\n',
              expected_output: "Please input product name and amount: Please input product name and amount: Please input product name and amount: {'apple': 15, 'banana': 5, 'orange': 20}"
            }
          ]
        },
        {
          no: 15,
          title: 'Word Frequency Counter',
          prompt: 'Split input sentence into lowercase words, count each word frequency, and print dictionary.',
          test_cases: [
            {
              input: 'The quick brown fox jumps over the lazy dog\\n',
              expected_output: "Please input a sentence: {'the': 2, 'quick': 1, 'brown': 1, 'fox': 1, 'jumps': 1, 'over': 1, 'lazy': 1, 'dog': 1}"
            }
          ]
        },
        {
          no: 16,
          title: 'CSV Parser with Quoted Fields',
          prompt: 'Parse a CSV line where commas inside quoted fields are preserved and print resulting list.',
          test_cases: [
            {
              input: '"apple,banana","orange,grape",strawberry\\n',
              expected_output: "Please input a CSV line: ['apple,banana', 'orange,grape', 'strawberry']"
            }
          ]
        }
      ],
      marking_scheme: [
        'Submitted clear screenshots',
        'Submit the file correctly, with the correct file name and extension',
        'Each question has input comments',
        'Complete Q1-Q16'
      ]
    }
  }
];
