const ques = document.querySelector(".question")
const next_btn = document.querySelector(".nxt-btn button")
const options = document.querySelectorAll(".opt")
const dark_mode = document.querySelector(".heading button")
const lang = document.querySelector(".lang select")
const no_of_ques = document.querySelector(".noques select")

let currQues = 0;
const MaxQues = no_of_ques.value;
let score = 0;

async function fetchData(){

    let response;
    if(lang.value == "C++"){
        response = await fetch('cpp.json')
    }
    else if(lang.value == "Python"){
        response = await fetch('python.json')
    }
    else if(lang.value == "C"){
        response = await fetch('c.json')
    }
    else if(lang.value == "Java"){
        response = await fetch('java.json')
    }
    else if(lang.value == "JavaScript"){
        response = await fetch('javascript.json')
    }

    window.data = await response.json();
    ShowQuestion();
}

const savedTheme = localStorage.getItem("theme");

// Apply the saved theme on page load
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    dark_mode.innerHTML = "☀️"; // Set icon for dark mode
} else {
    dark_mode.innerHTML = "🌙"; // Set icon for light mode
}

// Add event listener to toggle dark mode
dark_mode.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        dark_mode.innerHTML = "☀️";
        localStorage.setItem("theme", "dark"); // Save dark mode preference
    } else {
        dark_mode.innerHTML = "🌙";
        localStorage.setItem("theme", "light"); // Save light mode preference
    }
});


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

    
    document.getElementById("restartBtn").addEventListener("click", () => {
        currQues = 0;
        score = 0;
        document.querySelector(".results").style.display = "none";
        next_btn.style.display = "block";
        document.querySelector(".heading").style.display = "flex";
        document.querySelector(".question").style.display = "block";
        document.querySelector(".options").style.display = "flex";
        ShowQuestion();})
}

fetchData();