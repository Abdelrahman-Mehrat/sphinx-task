let myCarousel = document.getElementById("carouselExampleCaptions");
/* ----------------------- functions for choose answer ---------------------- */
let quizQuestions = Array.from(
  document.getElementsByClassName("quiz__question"),
);
function addAnswersEvent(quizQuestions) {
  quizQuestions.forEach(function (question) {
    question.addEventListener("click", getAnswerData);
  });
}
addAnswersEvent(quizQuestions);
function getAnswerData() {
  let answer = this.dataset.answer;
  if (answer === "correct") {
    this.classList.add("correct__answer");
    this.removeEventListener("click", getAnswerData);
    document.getElementById("correct__answerAudio").play();
    let wrongAnswer = Array.from(this.parentNode.children).filter(
      (ele) => ele.dataset.answer !== "correct",
    )[0];
    wrongAnswer.setAttribute("disabled",true);
    isQuestionChoosed();
  } else {
    this.classList.add("wrong__answer");
    document.getElementById("wrong__answerAudio").play();
    setTimeout(() => {
      this.classList.remove("wrong__answer");
    }, 1000);
  }
}
/* ----------------------- functions for restart quiz ----------------------- */
let restartQuiz = document.getElementById("app__restartQuiz");
window.onload = function () {
  getSlidersInfo();
};
restartQuiz.onclick = removeAnswersClasses;
function removeAnswersClasses() {
  quizQuestions.forEach((question) => {
    question.classList.remove("correct__answer", "wrong__answer");
    question.removeAttribute("disabled");
  });
  getFirstSlider();
  addAnswersEvent(quizQuestions);
}
function getFirstSlider() {
  let nextQuestion = document.getElementById("next__question");
  let allSliders = document.querySelectorAll(".carousel-inner .carousel-item");
  let firstSlider = myCarousel.children[0].children[0];
  allSliders.forEach((slider) => {
    slider.classList.remove("active");
  });
  firstSlider.classList.add("active");
  nextQuestion.removeAttribute("disabled");
  getSlidersInfo();
  isQuestionChoosed(); 
}
/* ---------------------- functions for replay question --------------------- */
let replayQuestion = document.getElementById("app__replayQuestion");
replayQuestion.onclick = replayQuestionQuiz;
function replayQuestionQuiz() {
  let activeQuizQuestion = document.querySelectorAll(
    ".carousel-item.active h5 button, .carousel-item.active p button",
  );
  activeQuizQuestion.forEach((ele) => {
    ele.classList.remove("correct__answer"), (ele.removeAttribute("disabled"));
  });
  isQuestionChoosed();
  addAnswersEvent(quizQuestions);
}
/* ----------------------- functions for show answers ----------------------- */
let showAnswer = document.getElementById("app__showAnswer");
showAnswer.onclick = showQuestionAnswer;
function showQuestionAnswer() {
  let activeQuizQuestion = document.querySelectorAll(
    ".carousel-item.active h5 button, .carousel-item.active p button",
  );
  activeQuizQuestion.forEach((ele) => {
    if (ele.dataset.answer === "correct") {
      ele.classList.add("correct__answer");
    } else {
      ele.setAttribute("disabled", "true");
    }
  });
  showAnswer.setAttribute("disabled", "true");
  isQuestionChoosed();
  removeAnswersEvent(quizQuestions);
}
/* -------------------- functions for stop buttons action ------------------- */
let prevQuestion = document.getElementById("prev__question");
let nextQuestion = document.getElementById("next__question");
let currentSlider = document.getElementById("current__slider");
let lastSlider = document.getElementById("last__slider");
function getSlidersInfo() {
  let slidersCount = myCarousel.children[0].children.length;
  lastSlider.innerHTML = slidersCount -2;
  currentSlider.innerHTML = slidersCount - slidersCount + 1;
  disableSliderButton(currentSlider.innerHTML, slidersCount);
}
myCarousel.addEventListener("slide.bs.carousel", function (e) {
  let slidersCount = document.querySelectorAll(".carousel-item").length ;
  currentSlider.innerHTML = e.to + 1;
  disableSliderButton(currentSlider.innerHTML, slidersCount);
  setTimeout(isQuestionChoosed, 900);
  addAnswersEvent(quizQuestions);
});
function disableSliderButton(currentSlider, slidersCount) {
  prevQuestion.removeAttribute("disabled");
  nextQuestion.removeAttribute("disabled");
  if (+currentSlider === 1) {
    prevQuestion.setAttribute("disabled", "true");
  } else if (+currentSlider === slidersCount) {
    nextQuestion.setAttribute("disabled", "true");
  } 
    
}
/* ---------------------------- repeated function --------------------------- */
function isQuestionChoosed() {
  let isChoosed = false;
  let activeQuizQuestion = document.querySelectorAll(
    ".carousel-item.active h5 button, .carousel-item.active p button",
  );
  let correctAnswerCount = Array.from(activeQuizQuestion).filter((ele)=>
    ele.classList.contains("correct__answer"),
  );
  if(correctAnswerCount.length > 1){
    showAnswer.setAttribute("disabled", "true");
    isChoosed = true;
  }

  !isChoosed && showAnswer.removeAttribute("disabled");
}
function removeAnswersEvent(quizQuestions){
  quizQuestions.forEach(function(question){
    question.removeEventListener("click",getAnswerData);
  });
}
/* ------------------------- header button functions ------------------------ */
let headerButtonImage = document.getElementById("header__buttonImage");
let headerButtonHelp = document.getElementById("header_buttonHelp");
let headerHiddenImage = document.getElementById("header__hiddenImage");
let headerHiddenHelp = document.getElementById("header__hiddenHelp");

let imageButtonClose = Array.from(
  document.getElementsByClassName("image__closeButton"),
);
headerButtonImage.onclick = showHeaderImage;
headerButtonHelp.onclick = showHeaderImage;
function showHeaderImage() {
  if (this.id === "header__buttonImage") {
    headerHiddenImage.classList.remove("hide__header");
  } else {
    headerHiddenHelp.classList.remove("hide__header");
  }
}
function closeHeaderImage() {
  this.parentNode.parentNode.classList.add("hide__header");
}
function addHeraderButtonEvent(imageButtonClose) {
  imageButtonClose.forEach((buttonImage) => {
    buttonImage.addEventListener("click", closeHeaderImage);
  });
}
addHeraderButtonEvent(imageButtonClose);
