// Apply grayscale filter and blur to all elements except the puzzle
Array.from(document.body.children).forEach(child => {
    child.style.filter = 'blur(33px)';

    //LOCK SCROLL
    document.body.style.overflow = 'hidden';
});

// Create and style the puzzle popup
const puzzleDiv = document.createElement('div');
document.body.appendChild(puzzleDiv);
puzzleDiv.style.cssText = `
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999999999;
    background: white;
    color: black;
    font-size: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

// Initialize the puzzle elements
puzzleDiv.innerHTML = `
    <p id="puzzle-question" style="color:'black';"></p>
    <input type="text" id="answer" autofocus>
    <button id="submitBtn">Submit</button>
`;

let correctAnswer;

// Function to generate and display the puzzle question
function generatePuzzle() {
    const n = Math.floor(Math.random() * 10) + 1;
    document.getElementById('puzzle-question').textContent = `What letter is ${n} letters before 'Z' in the alphabet?`;
    correctAnswer = String.fromCharCode(91 - n);
}

// Function to check the answer
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.toUpperCase();
    if (userAnswer === correctAnswer) {
        alert('Correct! You may proceed.');
        Array.from(document.body.children).forEach(child => child.style.filter = '');

        //UNLOCK SCROLL
        document.body.style.overflow = 'auto';

        document.body.removeChild(puzzleDiv);
    } else {
        alert('Wrong answer. Try again.');
    }
}

// Add event listener for submit button
document.getElementById('submitBtn').addEventListener('click', checkAnswer);

// Call generatePuzzle to update text and set correct answer
generatePuzzle();
