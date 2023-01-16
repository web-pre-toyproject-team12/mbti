// const imgBox = document.querySelector("imgBox");

// imgBox.addEventListener("click", function () {
//   let clickedCard = e.target;
//   clickedCard.classList.add("flip");
// });

// 해당하는 MBTI값을 리턴합니다.
const getMBTI = () => {
  let a = new URL(window.location.href);
  let b = a.searchParams;
  let c = b.get("mbti");

  return c;
};
let MBTI = getMBTI();

// 테스트 용입니다.
document.getElementById("test").innerHTML = `<h1>${MBTI}</h1>`;
