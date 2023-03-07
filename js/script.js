// 이유는 모르겠는데 next que 버튼을 누르자마자 timer가 0으로 되는게 아니라 
// 1초 정도 텀이 생긴 후에 15로 reset 됨... 원본 소스 코드 가지고 해봤는데도 같은 결과!

// selecting all required elements
const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const result_box = document.querySelector('.result_box');
const option_list = document.querySelector('.option_list')
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .time_sec");
const time_line = document.querySelector("header .time_line");
const canvas = document.querySelector("#my-canvas");

var audio = new Audio('applause.mp3');

// if startQuiz button clicked
start_btn.onclick = function() {
    info_box.classList.add("activeInfo");
}

// if exitQuiz button clicked
exit_btn.onclick = function() {
    info_box.classList.remove("activeInfo");
}

// if continueQuiz button clicked
// continue_btn.onclick = function() {
//     info_box.classList.remove("activeInfo"); // hide info box
//     quiz_box.classList.add("activeQuiz"); // show quiz box
//     showQuestions(0);
//     queCounter(1);
//     startTimer(15);
//     startTimerLine(0);
//     next_btn.classList.remove("show");
// }

// 이게 둘이 다른 건 아님...

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide info box
    quiz_box.classList.add("activeQuiz"); // show quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
    next_btn.classList.remove("show");
}


let que_count = 0;
let userScore = 0;
let que_num = 1;
let time_value = 15;
let counter;
let counterLine;
let width_value = 0;

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
    clearInterval(counter); // stoppint timer when user selected option
    clearInterval(counterLine);
    let userAns = answer.textContent; // getting user selected option;
    // console.log(userAns);
    let correctans = questions[que_count].answer; // getting correct answer from array
    // console.log(correctans);
    let alloptions = option_list.children.length;

    if (userAns == correctans) {
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
            if (option_list.children[i].textContent == correctans) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
        }
    }

    for (i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled") // once user select an option than disabled all options
    }

    next_btn.classList.add("show");

}

function queCounter(index) {
    let totalQueContTag = '<span><p>' + index + '</p> of <p>' + questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueContTag;
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer() {
        // console.log(time--);
        timeCount.textContent = time;
        time--;

        if(time < 9) {
            timeCount.textContent = "0" + timeCount.textContent;
        }

        if(time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";

            const allOptions = option_list.children.length; // 이름을 바꾸든지...
            let correctAns = questions[que_count].answer; // 이름을 바꾸든지...

            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                }
            }

            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled") // once user select an option than disabled all options
            }
        
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        time_line.style.width = time + "px";

        if (time > 549) { // 549ms = 15s
            clearInterval(counterLine);
        }
    }
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
    // que_count++;
    // showQuestions(que_count);
    if (que_count < questions.length - 1) {
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        
        clearInterval(counter);
        clearInterval(counterLine);
        
        startTimer(time_value);
        startTimerLine(width_value);

        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    } else {
        // console.log("questions completed congratulations");
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const score_text = document.querySelector(".score_text");
    let scoreTag = '';
    if(userScore >= 3) {
        scoreTag = '<span>and congrats, You got ' + userScore + ' out of ' + questions.length + '</span>'
        canvas.classList.add("show_canvas");
        audio.play();
        audio.loop = true;
    } else if (userScore > 1) {
        scoreTag = '<span>and nice, You got ' + userScore + ' out of ' + questions.length + '</span>'
    } else {
        scoreTag = '<span>and sorry, You got ' + userScore + ' out of ' + questions.length + '</span>'
    }

    score_text.innerHTML = scoreTag;
}

var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

const restart_quiz = document.querySelector(".result_box .buttons .restart");
const quit_quiz = document.querySelector(".result_box .buttons .quit");

quit_quiz.onclick = () => {
    window.location.reload();
}

restart_quiz.onclick = () => {
// 이부분이 좀 제대로 구현되지 않은 감이 좀 있다...

    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    canvas.classList.remove("show_canvas");
    audio.pause();

    que_count = 0;
    que_num = 1;
    userScore = 0;
    time_value = 15;
    width_value = 0;

    showQuestions(que_count);
    queCounter(que_num);
    
    clearInterval(counter);
    clearInterval(counterLine);
    
    startTimer(time_value);
    startTimerLine(width_value);

    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}