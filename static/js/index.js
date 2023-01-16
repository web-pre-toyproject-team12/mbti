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
const loginArea = document.getElementById("login-area");
const signUpButton = document.getElementById("sign_up_button");
const signInButton = document.getElementById("sign_in_button");

const changeCheck = (a) => {
  if (a.classList.contains("check")) {
    return;
  }
  let b = a.innerHTML;
  if (b == "E" || b == "I") {
    E.classList.toggle("check");
    I.classList.toggle("check");
  } else if (b == "S" || b == "N") {
    S.classList.toggle("check");
    N.classList.toggle("check");
  } else if (b == "T" || b == "F") {
    T.classList.toggle("check");
    F.classList.toggle("check");
  } else if (b == "J" || b == "P") {
    J.classList.toggle("check");
    P.classList.toggle("check");
  }
};

for (let i = 0; i < alphabets.length; i++) {
  let a = alphabets[i];
  alphabets[i].addEventListener("click", () => changeCheck(a));
}

const getStart = () => {
  let c = document.querySelectorAll(".check");
  let mbti = "";
  c.forEach((item) => (mbti += item.innerHTML));
  let url = new URL(window.location.href);
  url += "emoji?mbti=";
  url += mbti;
  alert(url);
  window.location.href = url;
};

startButton.addEventListener("click", getStart);

function sign_up() {
  let email = document.getElementById("floatingInput").value;
  let password = document.getElementById("floatingPassword").value;

  $.ajax({
    type: "POST",
    url: "/sign_up",
    data: { email_give: email, pw_give: password },
    success: function (response) {
      if (response["result"] == "success") {
        alert("회원가입이 완료되었습니다.");
      } else {
        alert(response["msg"]);
      }
    },
  });
}

const sign_in = () => {
  let email = document.getElementById("floatingInput").value;
  let password = document.getElementById("floatingPassword").value;

  $.ajax({
    type: "POST",
    url: "/sign_in",
    data: { email_give: email, pw_give: password },
    success: function (response) {
      if (response["result"] == "success") {
        // $.cookie("mytoken", response["token"], { path: "/" });
        //로그인이 정상적으로 된다면 token을 받아옵니다.
        //이 토큰을 mytoken이라는 key값으로 쿠키에 저장합니다.
        alert("로그인 성공!");
        loginArea.innerHTML = "";
        document
          .querySelectorAll(".display-none")
          .forEach((item) => item.classList.remove("display-none"));
      } else {
        alert(response["msg"]);
      }
    },
  });
};

// signUpButton.addEventListener("click", sign_up);
signInButton.addEventListener("click", sign_in);

// 결과 버튼

$(".button--bubble").each(function () {
  var $circlesTopLeft = $(this).parent().find(".circle.top-left");
  var $circlesBottomRight = $(this).parent().find(".circle.bottom-right");

  var tl = new TimelineLite();
  var tl2 = new TimelineLite();

  var btTl = new TimelineLite({ paused: true });

  tl.to($circlesTopLeft, 1.2, {
    x: -25,
    y: -25,
    scaleY: 2,
    ease: SlowMo.ease.config(0.1, 0.7, false),
  });
  tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: "+=6", y: "-=2" });
  tl.to(
    $circlesTopLeft.eq(1),
    0.1,
    { scaleX: 1, scaleY: 0.8, x: "-=10", y: "-=7" },
    "-=0.1"
  );
  tl.to(
    $circlesTopLeft.eq(2),
    0.1,
    { scale: 0.2, x: "-=15", y: "+=6" },
    "-=0.1"
  );
  tl.to($circlesTopLeft.eq(0), 1, {
    scale: 0,
    x: "-=5",
    y: "-=15",
    opacity: 0,
  });
  tl.to(
    $circlesTopLeft.eq(1),
    1,
    { scaleX: 0.4, scaleY: 0.4, x: "-=10", y: "-=10", opacity: 0 },
    "-=1"
  );
  tl.to(
    $circlesTopLeft.eq(2),
    1,
    { scale: 0, x: "-=15", y: "+=5", opacity: 0 },
    "-=1"
  );

  var tlBt1 = new TimelineLite();
  var tlBt2 = new TimelineLite();

  tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
  tlBt1.add(tl);

  tl2.set($circlesBottomRight, { x: 0, y: 0 });
  tl2.to($circlesBottomRight, 1.1, {
    x: 30,
    y: 30,
    ease: SlowMo.ease.config(0.1, 0.7, false),
  });
  tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: "-=6", y: "+=3" });
  tl2.to(
    $circlesBottomRight.eq(1),
    0.1,
    { scale: 0.8, x: "+=7", y: "+=3" },
    "-=0.1"
  );
  tl2.to(
    $circlesBottomRight.eq(2),
    0.1,
    { scale: 0.2, x: "+=15", y: "-=6" },
    "-=0.2"
  );
  tl2.to($circlesBottomRight.eq(0), 1, {
    scale: 0,
    x: "+=5",
    y: "+=15",
    opacity: 0,
  });
  tl2.to(
    $circlesBottomRight.eq(1),
    1,
    { scale: 0.4, x: "+=7", y: "+=7", opacity: 0 },
    "-=1"
  );
  tl2.to(
    $circlesBottomRight.eq(2),
    1,
    { scale: 0, x: "+=15", y: "-=5", opacity: 0 },
    "-=1"
  );

  tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
  tlBt2.add(tl2);

  btTl.add(tlBt1);
  btTl.to($(this).parent().find(".a.effect-button"), 0.8, { scaleY: 1.1 }, 0.1);
  btTl.add(tlBt2, 0.2);
  btTl.to(
    $(this).parent().find(".a.effect-button"),
    1.8,
    { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) },
    1.2
  );

  btTl.timeScale(2.6);

  $(this).on("mouseover", function () {
    btTl.restart();
  });
});
