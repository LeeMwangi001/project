const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback');
const scoreContainer = document.getElementById('score-value');
const restartButton = document.getElementById('restart-btn');
const newQuizButton = document.getElementById('new-quiz-btn');


let currentQuestionIndex = 0;
let score = 0;
let questions = [];



