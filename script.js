const ques = document.querySelector(".question")
const next_btn = document.querySelector("button")
const options = document.querySelectorAll(".opt")

let currQues = 0;
const MaxQues = 5;
let score = 0;

async function fetchData(){
    const response = await fetch('questions.json')
    window.data = await response.json();
    ShowQuestion();
}


function check(opt) {
    const selectedAnswer = opt.textContent.trim().toLowerCase(); // Use textContent instead of innerHTML to avoid formatting issues
    const correctAnswer = data[ind].answer.trim().toLowerCase(); // Standardize case and remove extra spaces

    if (selectedAnswer === correctAnswer) {
        opt.style.background = "rgb(65, 216, 65)"; // Highlight the correct answer
        score++; // Increment score for the correct answer
    } else {
        opt.style.background = "rgb(241, 59, 59)"; // Highlight the wrong answer
        // Optionally highlight the correct answer
        options.forEach(option => {
            if (option.textContent.trim().toLowerCase() === correctAnswer) {
                option.style.background = "rgb(65, 216, 65)"; // Highlight correct answer
            }
        });
    }

    // Disable further clicks on options
    options.forEach(opt => (opt.style.pointerEvents = "none"));
    next_btn.disabled = false; // Enable the Next button after answering

    console.log(correctAnswer)
}

function ShowQuestion(){
    if(currQues>=MaxQues){
        ShowResults();
        return;
    }
    
    window.ind = Math.floor(Math.random()*data.length)
    
    ques.innerHTML = data[ind].question;
    document.querySelector(".opt1").innerHTML = `${data[ind].options[0]}`;
    document.querySelector(".opt2").innerHTML = `${data[ind].options[1]}`;
    document.querySelector(".opt3").innerHTML = `${data[ind].options[2]}`;
    document.querySelector(".opt4").innerHTML = `${data[ind].options[3]}`;
    
    options.forEach(opt => {
        opt.style.background = ""; // Reset option background
        opt.style.pointerEvents = "auto";
        opt.onclick = () => check(opt);
    });

    next_btn.disabled = true;
}

next_btn.addEventListener("click", ()=>{
    currQues++;
    ShowQuestion();
})

function ShowResults() {
    // Update results content
    document.querySelector(".results").innerHTML = `
        You scored ${score} out of ${MaxQues}
        <button id="restartBtn">Restart Test</button>
    `;
    // Make the results section visible
    document.querySelector(".results").style.display = "flex";

    // Hide other elements
    next_btn.style.display = "none";
    document.querySelector(".heading").style.display = "none";
    document.querySelector(".question").style.display = "none";
    document.querySelector(".options").style.display = "none";

    // Reinitialize the event listener for the new Restart button
    document.getElementById("restartBtn").addEventListener("click", () => {
        location.reload();
    });
}

fetchData();