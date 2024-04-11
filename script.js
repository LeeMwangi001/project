const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback');
const scoreContainer = document.getElementById('score-value');
const restartButton = document.getElementById('restart-btn');
const newQuizButton = document.getElementById('new-quiz-btn');


let currentQuestionIndex = 0;
let score = 0;
let questions = [];



// Fetch questions from the API
fetch("https://opentdb.com/api.php?amount=10")
   .then(response => {
       if (!response.ok) {
           throw new Error("Failed to fetch questions from the API");
       }
       return response.json();
   })
   .then(data => {
       questions = data.results; // Store fetched questions
       displayQuestion(); // Display the first question
   })
   .catch(error => {
       console.error("Error fetching questions:", error);
   });  


// Function to display a question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question; // Display question text
 
 
    optionsContainer.innerHTML = ''; // Clear options container
    // Iterate through incorrect answers and create buttons for each
    currentQuestion.incorrect_answers.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option-item');
        optionButton.textContent = option;
        optionButton.value = option;
        optionButton.addEventListener('click', () => handleOptionClick(optionButton.value));
        optionsContainer.appendChild(optionButton);
    });
 
 
   