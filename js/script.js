// selecting all required elements
const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const result_box = document.querySelector('.result_box');

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
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
}