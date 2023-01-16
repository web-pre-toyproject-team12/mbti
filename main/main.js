const E = document.getElementById("E");
const I = document.getElementById("I");
const S = document.getElementById("S");
const N = document.getElementById("N");
const T = document.getElementById("T");
const F = document.getElementById("F");
const J = document.getElementById("J");
const P = document.getElementById("P");
const startButton = document.getElementById("start-button");
const alphabets = document.querySelectorAll(".alphabet");

const changeCheck = (a) => {
  if (a.classList.contains("checked")) {
    return;
  }
  let b = a.innerHTML;
  console.log(b);
  if (b == "E" || b == "I") {
    E.classList.toggle("checked");
    I.classList.toggle("checked");
  } else if (b == "S" || b == "N") {
    S.classList.toggle("checked");
    N.classList.toggle("checked");
  } else if (b == "T" || b == "F") {
    T.classList.toggle("checked");
    F.classList.toggle("checked");
  } else if (b == "J" || b == "P") {
    J.classList.toggle("checked");
    P.classList.toggle("checked");
  }
};

for (let i = 0; i < alphabets.length; i++) {
  let a = alphabets[i];
  alphabets[i].addEventListener("click", () => changeCheck(a));
}

const getStart = () => {
  let c = document.querySelectorAll(".checked");
  let mbti = "";
  c.forEach((item) => (mbti += item.innerHTML));
  let SearchParams = new URLSearchParams(location.search);
  SearchParams.set("mbti", mbti);
  window.location.href = SearchParams;
};

startButton.addEventListener("click", getStart);
