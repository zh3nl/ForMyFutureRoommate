const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionDisplay = document.getElementById("questionDisplay"); 
const scoreDisplay = document.getElementById("score"); 

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is My Favorite IDE?',
        choice1: 'VSCode',
        choice2: 'IntelliJ',
        choice3: 'Eclipse',
        choice4: 'Xcode',
        answer: 1
    },
    {
        question: 'What is One Thing I Never Really Learned in Coding?',
        choice1: 'Reading documentation',
        choice2: 'Writing pseudocode',
        choice3: 'CSS Flexbox',
        choice4: 'Recursions',
        answer: 2
    },
    {
        question: 'What is My Favorite Programming Language?',
        choice1: 'Java',
        choice2: 'Python', 
        choice3: 'JavaScript',
        choice4: 'C#',
        answer: 3
    },
    {
        question: 'What is My Favorite Soccer Team?',
        choice1: 'Manchester United',
        choice2: 'LA Galaxy',
        choice3: 'Real Madrid',
        choice4: 'Manchester City',
        answer: 4
    },
    {
        question: 'What is Two Drinks I Cannot Live Without?',
        choice1: 'Sprite and Fanta',
        choice2: 'Coca-Cola and Milkshake',
        choice3: 'Matcha Latte and Milk Tea', 
        choice4: 'Apple Juice and Arizona Iced Tea',
        answer: 3
    }, 
    {
        question: 'Least Favorite Part of a Workout Split?',
        choice1: 'Leg Day', 
        choice2: 'Back/Bicep Day',
        choice3: 'Shoulders/Tricept',
        choice4: 'Chest/Tricep',
        answer: 1
    }, 
    {
        question: 'Most Productive Time of the Day?', 
        choice1: 'After 6PM', 
        choice2: 'After 9PM',
        choice3: 'Before Lunch',
        choice4: 'After Breakfast', 
        answer: 2
    },
    {
        question: 'Guess My Favorite Video Game',
        choice1: 'Fortnite',
        choice2: 'Valorant',
        choice3: 'League of Legends',
        choice4: 'Overwatch',
        answer: 4
    }, 
    {
        question: 'Guess My Niche Talent',
        choice1: "Can solve a Rubik's Cube",
        choice2: 'Knows the flags of over 100 countries',
        choice3: 'Can do card magic tricks',
        choice4: 'Knows how to use the yo-yo',
        answer: 2
    }, 
    {
        question: 'Guess A Random Interest', 
        choice1: 'Fashionista',
        choice2: 'Loves to surf',
        choice3: 'Likes to draw',
        choice4: 'Interior design connoisseur',
        answer: 1
    }
];

const CORRECT_BONUS = 1; 
const MAX_QUESTIONS = 10; 

function startGame() {
    questionCounter = 0; 
    score = 0;
    availableQuestions = [...questions]; 
    getNewQuestion(); 
}

function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);
        return window.location.assign('endpage.html');
    }
    questionCounter++;
    questionDisplay.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question; 

    choices.forEach((choice) => {
        const number = choice.dataset['number']; 
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1); 
    acceptingAnswers = true; 
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return; 
        acceptingAnswers = false;
        const selectedChoice = e.target; 
        const selectedAnswer = selectedChoice.dataset['number'];

        const result = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(result === "correct") {
            increaseScore(CORRECT_BONUS); 
        }
        selectedChoice.parentElement.classList.add(result); 

        

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(result);
            getNewQuestion(); 
        }, 800);
    });
});

function increaseScore(num) {
    score += num; 
    scoreDisplay.innerText = score; 
}

startGame(); 