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
 
 
 // Create button for correct answer
 const correctOptionButton = document.createElement('button');
 correctOptionButton.classList.add('option-item');
 correctOptionButton.textContent = currentQuestion.correct_answer;
 correctOptionButton.value = currentQuestion.correct_answer;
 correctOptionButton.addEventListener('click', () => handleOptionClick(correctOptionButton.value));
 optionsContainer.appendChild(correctOptionButton);
}


// Function to handle when an option is clicked
function handleOptionClick(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
   
   
    // Provide feedback based on selected option
    if (selectedOption === correctAnswer) {
        feedbackContainer.textContent = "Correct!";
        score++;
    } else {
        feedbackContainer.textContent = "Incorrect! The correct answer is: " + correctAnswer;
    }
   
   
    currentQuestionIndex++; // Move to the next question
    // If there are more questions, display the next question
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else { // If all questions have been answered
        feedbackContainer.innerHTML += "<br>Quiz completed!";
        displayFinalScore();
    }
   
   
    // Update score display
    scoreContainer.textContent = score;
   }
   
   
   // Function to display final score and enable restart button
   function displayFinalScore() {
    restartButton.disabled = false;
   }
   
   // Add event listener for the restart button to restart the quiz
   restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0; // Reset question index
    score = 0; // Reset score
    scoreContainer.textContent = 0; // Update score display
    feedbackContainer.textContent = ""; // Clear feedback
    displayQuestion(); // Display the first question
   });
   
   
   // Add event listener for the new quiz button to reload the page
   newQuizButton.addEventListener('click', () => {
    location.reload(); // Reload the page
   });
   