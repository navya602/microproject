const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "London"],
    correct: 2
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    correct: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "2", "22"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((btn, index) => {
    btn.innerText = q.options[index];
    btn.disabled = false;
    btn.style.backgroundColor = "#eee";
  });
  document.getElementById("result").innerText = "";
}

function selectAnswer(index) {
  const q = quizData[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (index === q.correct) {
    score++;
    buttons[index].style.backgroundColor = "lightgreen";
  } else {
    buttons[index].style.backgroundColor = "salmon";
    buttons[q.correct].style.backgroundColor = "lightgreen";
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").innerHTML = `
    <h2>Quiz Complete!</h2>
    <p>Your score is ${score} out of ${quizData.length}</p>
    <button onclick="restartQuiz()">Restart</button>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  location.reload();
}

window.onload = loadQuestion;
