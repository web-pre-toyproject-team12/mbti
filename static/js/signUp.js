$(function () {
  function sign_up() {
    let username = $("#input-username").val();
    let password = $("#input-password").val();
    let password2 = $("#input-password2").val();

    if ($("#help-id").hasClass("is-danger")) {
      alert("아이디를 다시 확인해주세요.");
      return;
    } else if (!$("#help-id").hasClass("is-success")) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    if (password == "") {
      $("#help-password")
        .text("비밀번호를 입력해주세요.")
        .removeClass("is-safe")
        .addClass("is-danger");
      $("#input-password").focus();
      return;
    } else if (!is_password(password)) {
      $("#help-password")
        .text(
          "비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자",
        )
        .removeClass("is-safe")
        .addClass("is-danger");
      $("#input-password").focus();
      return;
    } else {
      $("#help-password")
        .text("사용할 수 있는 비밀번호입니다.")
        .removeClass("is-danger")
        .addClass("is-success");
    }
    if (password2 == "") {
      $("#help-password2")
        .text("비밀번호를 입력해주세요.")
        .removeClass("is-safe")
        .addClass("is-danger");
      $("#input-password2").focus();
      return;
    } else if (password2 != password) {
      $("#help-password2")
        .text("비밀번호가 일치하지 않습니다.")
        .removeClass("is-safe")
        .addClass("is-danger");
      $("#input-password2").focus();
      return;
    } else {
      $("#help-password2")
        .text("비밀번호가 일치합니다.")
        .removeClass("is-danger")
        .addClass("is-success");
    }
    $.ajax({
      type: "POST",
      url: "/sign_up/save",
      data: {
        username_give: username,
        password_give: password,
        nickname_give: nickname,
      },
      success: function (response) {
        alert("회원가입을 축하드립니다!");
        window.location.replace("/login");
      },
    });
  }

  //input focus 에 따른 색 변환

  const idInput = document.querySelector(".loginFormId input");
  const pwInput = document.querySelector(".loginFormPw input");
  const nInput = document.querySelector(".loginFormN input");
  const idP = document.querySelector(".loginFormId p");
  const pwP = document.querySelector(".loginFormPw p");
  const nP = document.querySelector(".loginFormN p");
  idInput.addEventListener("focusin", function () {
    idP.style.color = "#5ededf";
  });
  idInput.addEventListener("blur", function () {
    idP.style.color = "inherit";
  });
  pwInput.addEventListener("focusin", function () {
    pwP.style.color = "#5ededf";
  });
  pwInput.addEventListener("blur", function () {
    pwP.style.color = "inherit";
  });
  nInput.addEventListener("focusin", function () {
    nP.style.color = "#5ededf";
  });
  nInput.addEventListener("blur", function () {
    nP.style.color = "inherit";
  });
  //back 버튼 전 페이지로

  const backBtn = document.querySelector(".back");
  backBtn.addEventListener("click", function () {});

  //전체 checkBOx controll

  const allBtn = document.querySelector("input[name=all]");
  const checkBtn = document.querySelectorAll("input[name=summit]");
  function checked(e) {
    e.preventDefault();
    for (let i = 0; i < checkBtn.length; i++) {
      checkBtn[i].checked = this.checked;
    }
  }

  allBtn.addEventListener("change", checked);
  //로그인 버튼 활성화

  const loginBox = document.querySelector(".boxes");
  const loginBtn = document.querySelector(".loginBtn");

  loginBox.addEventListener("keyup", () => {
    let idVal = document.querySelector(".id").value;
    let pwVal = document.querySelector(".pw").value;
    var nVal = document.querySelector(".n").value;
    idVal.includes("@") &&
    idVal.length > 2 &&
    pwVal.length > 5 &&
    nVal.length > 0
      ? loginBtn.classList.add("active")
      : loginBtn.classList.remove("active");
  });
  function checkLogin() {
    if (loginBtn.classList.contains("active")) {
      alert("회원가입 완료!");
    }
  }
  loginBtn.addEventListener("click", checkLogin);
  window.addEventListener("keypress", (e) => {
    if (e.key === 13) {
      checkLogin();
    }
  });

  //이용약관 펼치기
  const viewBtn1 = document.querySelector(".viewMore1");
  const viewBtn2 = document.querySelector(".viewMore2");
  const viewMore1 = document.querySelector(".viewMoreBox");
  const viewMore2 = document.querySelector(".viewMoreBox1");
  const closeBtn = document.querySelector(".closeBtn");
  const closeBtn1 = document.querySelector(".closeBtn1");
  viewBtn1.addEventListener("click", function () {
    viewMore1.classList.add("block");
  });
  viewBtn2.addEventListener("click", function () {
    viewMore2.classList.add("block");
  });
  closeBtn.addEventListener("click", function () {
    viewMore1.classList.remove("block");
  });
  closeBtn1.addEventListener("click", function () {
    viewMore2.classList.remove("block");
  });
});
