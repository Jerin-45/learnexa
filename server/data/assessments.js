export const ASSESSMENTS_DATA = {
  "JavaScript": {
    skill: "JavaScript",
    title: "JavaScript ES6+ & Core Architecture Assessment",
    timeLimit: 10,
    questions: [
      {
        id: "js-q1",
        question: "What will be printed to the console given this code snippet?",
        code: `console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);`,
        options: [
          "1, 2, 3, 4",
          "1, 4, 3, 2",
          "1, 4, 2, 3",
          "1, 3, 4, 2"
        ],
        correctIndex: 1,
        explanation: "Synchronous code runs first (1, 4). Microtasks from Promise resolution run before macrotasks (3), and setTimeout callback runs in the next macrotask turn (2)."
      },
      {
        id: "js-q2",
        question: "Which of the following creates a genuine lexical closure in JavaScript?",
        code: `function createCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}`,
        options: [
          "An inner function referencing a variable defined in its outer enclosing function scope",
          "Passing an object by reference to another function",
          "Using the 'bind' method on an arrow function",
          "Declaring variables with 'var' instead of 'let'"
        ],
        correctIndex: 0,
        explanation: "A closure is formed when an inner function retains access to its enclosing lexical scope even after the outer function has executed."
      },
      {
        id: "js-q3",
        question: "What is the primary difference between Promise.all() and Promise.allSettled()?",
        options: [
          "Promise.all returns immediately with undefined, while allSettled returns an array",
          "Promise.all rejects immediately if any promise rejects; Promise.allSettled waits for all promises to settle regardless of rejection",
          "Promise.allSettled only works in Node.js environments",
          "Promise.all executes promises sequentially whereas allSettled runs in parallel"
        ],
        correctIndex: 1,
        explanation: "Promise.all fails-fast on the first rejection, whereas Promise.allSettled returns an array of objects describing each promise outcome (fulfilled or rejected)."
      },
      {
        id: "js-q4",
        question: "What does the 'typeof NaN' expression evaluate to in JavaScript?",
        options: [
          "'undefined'",
          "'null'",
          "'number'",
          "'NaN'"
        ],
        correctIndex: 2,
        explanation: "According to IEEE 754 and JavaScript specifications, NaN (Not-a-Number) is of numeric type, so typeof NaN === 'number'."
      }
    ]
  },
  "React.js": {
    skill: "React.js",
    title: "React.js Component Architecture & Hooks Assessment",
    timeLimit: 10,
    questions: [
      {
        id: "react-q1",
        question: "Why should you never call React Hooks inside loops, conditions, or nested functions?",
        options: [
          "It causes TypeScript compilation errors only",
          "React relies on the exact order in which Hooks are called across multiple renders to preserve state",
          "Hooks execute synchronously in the browser main thread and cause stack overflows",
          "React requires all hooks to be async functions"
        ],
        correctIndex: 1,
        explanation: "React relies on a predictable hook invocation order on each render to match up hook states with their internal linked list."
      },
      {
        id: "react-q2",
        question: "When should you use the 'useCallback' hook in a React component?",
        options: [
          "To fetch remote API data inside useEffect",
          "To cache the returned value of an expensive calculation",
          "To preserve referential identity of a callback passed to an optimized child component wrapped in React.memo",
          "To force a component to re-render without state update"
        ],
        correctIndex: 2,
        explanation: "useCallback caches the function instance between renders, preventing unnecessary child re-renders when children depend on reference equality."
      },
      {
        id: "react-q3",
        question: "What is the purpose of the key prop when rendering lists in React?",
        options: [
          "It provides CSS styling hooks for list elements",
          "It helps React identify which items have changed, been added, or been removed for efficient reconciliation",
          "It encrypts sensitive list data in the DOM",
          "It assigns unique tabindex values for keyboard accessibility"
        ],
        correctIndex: 1,
        explanation: "React's Virtual DOM reconciliation diffing algorithm uses the key prop to uniquely match items across renders."
      }
    ]
  },
  "Node.js": {
    skill: "Node.js",
    title: "Node.js Architecture & Asynchronous Runtimes",
    timeLimit: 10,
    questions: [
      {
        id: "node-q1",
        question: "Which component of Node.js handles asynchronous I/O operations and thread pooling?",
        options: [
          "V8 JavaScript Engine",
          "Libuv",
          "Babel Compiler",
          "Npm Registry"
        ],
        correctIndex: 1,
        explanation: "Libuv is the multi-platform C library that powers the Node.js event loop, asynchronous non-blocking I/O, and worker thread pool."
      },
      {
        id: "node-q2",
        question: "What is the primary advantage of using Node.js Streams for large file transfers?",
        options: [
          "Data is processed in chunks rather than loading the entire file into RAM, keeping memory usage constant and low",
          "Streams automatically compress files with Brotli",
          "Streams bypass operating system socket security checks",
          "Streams convert binary buffers directly to JSON"
        ],
        correctIndex: 0,
        explanation: "Streams enable reading and writing data piece by piece in chunks, preventing buffer overflows and massive memory allocation."
      }
    ]
  },
  "Python": {
    skill: "Python",
    title: "Python Data Structures & Computational Foundations",
    timeLimit: 10,
    questions: [
      {
        id: "py-q1",
        question: "What is the time complexity of looking up a key in a standard Python dictionary on average?",
        options: [
          "O(n)",
          "O(log n)",
          "O(1)",
          "O(n^2)"
        ],
        correctIndex: 2,
        explanation: "Python dictionaries are implemented as hash tables, providing average O(1) time complexity for lookup, insertion, and deletion."
      },
      {
        id: "py-q2",
        question: "What keyword is used to create a generator function in Python that produces a lazy sequence?",
        options: [
          "generate",
          "return lazy",
          "yield",
          "stream"
        ],
        correctIndex: 2,
        explanation: "The 'yield' statement pauses the function and emits a value to the caller, resuming state on subsequent next() calls."
      }
    ]
  }
};
