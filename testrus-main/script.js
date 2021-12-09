function hello(){
  var id;
  id=window.open("", "example", "width=400, height=150");
  id.focus();
  id.document.open();
  id.document.write("<h1><from color='olive' face='Lucida Console' size='5'>Тест на тему Русская литература</form></h1>");
  id.document.write("<input type='button' value='Закрыть окно' onclick='window.close();'> </form>");
  id.document.close();
}





(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} из ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "У какой кошки нет или почти нет шерсти?",
        answers: {
          a: "Абиссинская",
          b: "Сфинкс",
          c: "Сибирская"
        },
        correctAnswer: "b"
    },
    {
      question: "Если кошка мотает хвостом из стороны в сторону, что это значит?",
        answers: {
          a: "Она приветствует хозяина",
          b: "Она чем-то рассержена",
          c: "Она чем-то удивлена"
        },
        correctAnswer: "b"
    },
    {
      question: "У какой из этих пород длинная шерсть?",
        answers: {
          a: "Сиамская",
          b: "Йорк",
          c: "Бенгальская",
          d: "Сфинкс"
        },
        correctAnswer: "b"
    },
    {
      question: "Средняя продолжительность жизни у кошек?",
        answers: {
          a: "12-15 лет",
          b: "8-10 лет",
          c: "15-18 лет"
        },
        correctAnswer: "c"
      },
      {
        question: "Ночью у кошек светятся...?",
        answers: {
          a: "Усы",
          b: "Глаза",
          c: "Когти"
        },
        correctAnswer: "b"
      },
      {
        question: "Что не любят кошки?",
        answers: {
          a: "Гулять",
          b: "Мыться",
          c: "Охотиться"
        },
        correctAnswer: "b"
    },
    {
      question: "Почему в Средние века инквизиция ненавидела кошек?",
      answers: {
        a: "Думалт, что связаны с ведьмами",
        b: "Она нормально относилась",
        c: "Они были переносчиками болезней"
      },
      correctAnswer: "a"
    },
    {
      question: "Как называется сказка Шарля Перро об умном коте?",
      answers: {
        a: "Чёрный кот",
        b: "Хитрый кот",
        c: "Кот в сапогах"
      },
      correctAnswer: "c"
    },
    {
      question: "В какой стране в древности кошку считали священным животным?",
      answers: {
        a: "Египет",
        b: "Индия",
        c: "Русь"
      },
      correctAnswer: "a"
    },
    {
      question: "Трёхцветными бывают только...",
      answers: {
        a: "Котята",
        b: "Кошки",
        c: "Коты"
      },
      correctAnswer: "b"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();