
const options = document.querySelector('.options').children;
const questionNumberSpan = document.querySelector('.question-num-value');
const totalQuestionSpan = document.querySelector('.total-question');
const question = document.querySelector('.question');
const op1 = document.querySelector('.option1');
const op2 = document.querySelector('.option2');
const op3 = document.querySelector('.option3');
const scoreText = document.getElementById("score");

let questionIndex;
let index = 0;
let myArray = [];
let score = 0;
//let myArr = [];

// questions, options, answers

const questions = [
    {
        q: "What is the extension for an html file?",
        options: [".script", ".html", ".css"],
        answer: 1
    },
    {
        q: "Which virus is currently causing a pandemic?",
        options: ["malaria", "cholera",  "coronavirus"],
        answer: 2
    },
    {
        q:"Which is not a human body part?",
        options: ["hand", "head", "handle"],
        answer: 2
    },
    {
        q: "Bruno Fernades is a....",
        options: ["footballer","teacher", "musician"],
        answer: 0
    },
    {
        q:  "The social media app 'twitter' is represented with which animal?",
        options: ["bird", "lion", "goat"],
        answer: 0
    }
]

// constants
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;
// set questions, options, question number

totalQuestionSpan.innerHTML = questions.length;
function load(){
    questionNumberSpan.innerHTML = index + 1;

    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];

    index++;
}

function check(element){
    if(element.id == questions[questionIndex].answer){
        element.classList.add('correct');
        incrementScore(CORRECT_BONUS);
    }
    else {
        element.classList.add('wrong');
    }
    disabledOptions()
}

function disabledOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');
        if(options[i].id == questions[questionIndex].answer){
            options[i].classList.add('correct');
        }
        
    }
}

function enableOptions() {
    for (let i = 0; i < options.length; i++){
        options[i].classList.remove('disabled', 'correct', 'wrong');
    }
}

function next(){
    randomQuestion();
    enableOptions();
}

function randomQuestion(){
    if (index >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // GO TO END PAGE
        return window.location.assign("end.html");
    }
    let randomNumber = Math.floor(Math.random() * questions.length);
     let hitDuplicate = 0;   
    
    if (index == questions.length) {
            console.log('quiz over')
        }
        else{
            if (myArray.length > 0) {
                for (let i = 0; i < myArray.length; i++) {
                    if (myArray[i] == randomNumber) {
                        hitDuplicate = 1;
                        break;                        
                    }
                }
                if (hitDuplicate == 1) {
                    randomQuestion();
                }
                else {
                    questionIndex = randomNumber;
                    //myArr.push(questionIndex);
                    load();
                    //myArr.push(questionIndex);
                }
            }
            if (myArray.length == 0) {
                questionIndex = randomNumber;
                load();
                //myArr.push(questionIndex);
            }
            //console.log('myArr:' + myArr)
            myArray.push(randomNumber);
        
        }
}

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


window.onload = function() {
    randomQuestion()
    
}