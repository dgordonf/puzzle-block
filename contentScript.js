// Function to apply ugly styling
function applyUglyStyling() {

    Array.from(document.body.children).forEach(child => {
        child.style.filter = 'blur(43px) grayscale(80%)'; // Blur and invert colors
    });

    document.body.style.overflow = 'hidden'; // Lock the scroll
}

// Function to remove ugly styling
function removeUglyStyling() {
    Array.from(document.body.children).forEach(child => {
        child.style.filter = ''; // Reset filter
        child.style.transform = ''; // Reset transform
    });

    document.body.style.overflow = ''; // Unlock the scroll
}

// Set interval to reapply ugly styling every 5 seconds
applyUglyStyling();

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
    <form id="puzzle-form">
        <input type="text" id="answer" autofocus>
        <button id="submitBtn">Submit</button>
    </form>
`;

let correctAnswer;

// Function to generate and display the puzzle question
function generatePuzzle() {
    const n = Math.floor((Math.random() * 10) + (Math.random() * 10)) + 1;
    document.getElementById('puzzle-question').textContent = `What letter is ${n} letters before 'Z' in the alphabet?`;
    correctAnswer = String.fromCharCode(91 - n);
}

// Function to check the answer
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.toUpperCase();
    if (userAnswer === correctAnswer) {
        
        document.body.removeChild(puzzleDiv);

        // Disable the ugly styling
        removeUglyStyling(); // Uncomment this line to disable the styling
        
    } else {
        alert('Wrong answer. Try again.');
        // clear the input field
        document.getElementById('answer').value = '';

        // When user closes the alert put cursor back in the input field
        document.getElementById('answer').focus();

    }
}

// Add event listener for submit button
document.getElementById('submitBtn').addEventListener('click', checkAnswer);

//or of they press enter
document.getElementById('puzzle-form').addEventListener('submit', (event) => {
    event.preventDefault();
    checkAnswer();
});

// Call generatePuzzle to update text and set correct answer
generatePuzzle();
