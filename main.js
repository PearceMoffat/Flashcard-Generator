var inquirer = require("inquirer");
var BasicCard = require("./Basic-Card.js");
var ClozeCard = require("./Cloze-Card.js");

// Array of all presidents in order
var presidents = ["George Washington", 
"John Adams", 
"Thomas Jefferson", 
"James Madison", 
"James Monroe",
"John Adams",
"Andrew Jackson",
"Martin Van Buren",
"William Harrison",
"John Tyler",
"James Polk",
"Zachary Taylor",
"Millard Fillmore",
"Franklin Pierce",
"James Buchanan",
"Abraham Lincoln",
"Andrew Johnson",
"Ulysses Grant",
"Rutherford Hayes",
"James Garfield",
'Chester Arthur',
'Grover Cleveland',
'Benjamin Harrison',
'Grover Cleveland',
'William McKinley',
'Theodore Roosevelt',
'William Taft',
'Woodrow Wilson',
'Warren Harding',
'Calvin Coolidge',
'Herbert Hoover',
'Franklin Roosevelt',
'Harry Truman',
'Dwight Eisenhower',
'John Kennedy',
'Lyndon Johnson',
'Richard Nixon',
'Gerald Ford',
'Jimmy Carter',
'Ronald Reagan',
'George Bush',
'Bill Clinton',
'George Bush',
'Barack Obama',
'Donald Trump'];

var numberArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];
shuffle(numberArray); // Randomize order of presidents
var questionArray = []; // Array to hold the questions after they are created

// Function to shuffle an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

// Function to get the ordinal from an integer
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

// Create the array of questions at the set difficulty
function makeQuestions(difficulty) {
    for (var i=0; i<numberArray.length; i++) {
        questionArray.push(new ClozeCard(presidents[numberArray[i]] + " was the " + ordinal_suffix_of(numberArray[i]+1) + " president of the USA", presidents[numberArray[i]], difficulty));
    }
}

// Ask the user a question, repeat until all presidents have been asked about
function askQuestion() {
    inquirer.prompt([
        {
            type: "input",
            message: questionArray[count].partial,
            name: "answer"
        }
    ]).then(function(resp) {
        // The answer was correct
        if (resp.answer.toLowerCase() === questionArray[count].cloze.toLowerCase()) {
            console.log("Correct");
            score++; // Increase score
        }
        // The answer was incorrect
        else {
            console.log("Incorrect");
            console.log("The correct answer was " + questionArray[count].cloze)
        }
        count++;
        // If there are more presidents left, ask another question
        if (count < questionArray.length) {
            askQuestion();
        }
        // Otherwise the game is over, display final score
        else {
            console.log("Quiz over. You got " + score + "/" + questionArray.length + " correct.");
        }
    })
}

// Start the question count and player score at 0
var count = 0;
var score = 0;

// Prompt the user for difficulty level
inquirer.prompt([
    {
        type: "list",
        message: "What difficulty would you like?",
        choices: ["easy", "medium", "hard"],
        name: "difficulty"
    }
]).then(function(resp) {
    // Create the cloze cards at the inputted difficulty
    makeQuestions(resp.difficulty);
    // Start the quiz
    askQuestion();
});