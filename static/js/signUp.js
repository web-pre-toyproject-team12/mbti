$(function () {
  userList = [];
  users_get();
});
function users_get() {
  $.ajax({
    type: "GET",
    url: "/sign_up/get",
    data: {},
    success: function (response) {
      userList = response["idLists"];
    },
  });
}
function sign_up() {
  let userEmail = $("#input-username").val();
  let password = $("#input-password").val();
  let password2 = $("#input-password2").val();
  let pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  // 아이디값 공란
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].email == userEmail) {
      $(".error").remove();
      $(".loginFormId").append(
        '<div class="error">이미 가입된 이메일 입니다</div>',
      );
      $("#input-username").focus();
    }
  }
  // 비밀번호값 공란값 공란
  if (password == "") {
    $(".loginFormPw").append("<div>비밀번호 확인!!</div>");
    $("#input-password").focus();
    return;
  } else if (!pwdCheck.test(password)) {
    $(".loginFormPw").append(
      "<div>비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다</div>",
    );
    $("#input-password").focus();
    return;
  } else {
    $(".loginFormPw").append("<div>사용가능한 비밀번호입니다.</div>");
  }

  if (password2 == "") {
    $(".loginFormN").append("<div>비밀번호 확인!!</div>");
    $("#input-password2").focus();
    return;
  } else if (password2 != password) {
    $(".error").remove();
    $('#input-password"').val("");
    $("#input-password2").val("");
    $(".loginFormN").append('<div class="error">비밀번호 불일치!!</div>');
    $("#input-password").focus();
    return;
  } else {
    $(".loginFormN").append("<div>비밀번호 일치!!</div>");
  }

  $.ajax({
    type: "POST",
    url: "/sign_up/save",
    data: {
      email_give: userEmail,
      password_give: password,
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

//로그인 버튼 활성화
const loginBox = document.querySelector(".boxes");
loginBox.addEventListener("keyup", () => {
  let idVal = document.querySelector(".id").value;
  let pwVal = document.querySelector(".pw").value;
  idVal.includes("@") && idVal.length > 2 && pwVal.length > 5
    ? loginBtn.classList.add("active")
    : loginBtn.classList.remove("active");
});
function checkLogin() {
  if (loginBtn.classList.contains("active")) {
    alert("회원가입 완료!");
  }
}
window.addEventListener("keypress", (e) => {
  if (e.key === 13) {
    checkLogin();
  }
});
