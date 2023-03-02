// selecting all required elements
const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const result_box = document.querySelector('.result_box');
const option_list = document.querySelector('.option_list')

// if startQuiz button clicked
start_btn.onclick = function() {
    info_box.classList.add("activeInfo");
}

// if exitQuiz button clicked
exit_btn.onclick = function() {
    info_box.classList.remove("activeInfo");
}

// if continueQuiz button clicked
continue_btn.onclick = function() {
    info_box.classList.remove("activeInfo"); // hide info box
    quiz_box.classList.add("activeQuiz"); // show quiz box
    showQuestions(0);
}

let que_count = 0;
let userScore = 0;

// getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    // console.log(questions);
    // console.log(questions[0].question);
    let que_tag = "<span>" + questions[index].numb + ". " + questions[index].question + "</span>"
    let option_tag = '<div class="option">' + questions[index].options[0] + '</div>'
                    + '<div class="option">' + questions[index].options[1] + '</div>'
                    + '<div class="option">' + questions[index].options[2] + '</div>'
                    + '<div class="option">' + questions[index].options[3] + '</div>';
    
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    // console.log(option);

    // setting onclick attribute to a available options
    for (i = 0; i < option.length; i++) {
        // console.log(option[i]);
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    let userAns = answer.textContent; // getting user selected option;
    // console.log(userAns);
    let correctAns = questions[que_count].answer; // getting correct answer from array
    // console.log(correctAns);
    let alloptions = option_list.children.length;

    if (userAns == correctAns) {
        userScore++;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag)
        // console.log("correct answer");
        // console.log("Your score is " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag)
        // console.log("wrong answer");

        for (i = 0; i < alloptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
        }
    }

    for (i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled") // once user select an option than disabled all options
    }
}
