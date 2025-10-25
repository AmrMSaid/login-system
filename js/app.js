var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var username = localStorage.getItem("sessionUsername");
var usernameElement = document.getElementById("username");
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegex = /^[a-zA-Z0-9]{6,}$/;
var usersArr = [];
var baseURL =
  location.pathname.substring(0, location.pathname.lastIndexOf("/")) || "/";

if (localStorage.getItem("users") == null) {
  usersArr = [];
} else {
  usersArr = JSON.parse(localStorage.getItem("users"));
}

function loginFields() {
  if (!loginEmail || !loginPassword) return false;
  return loginEmail.value.trim() !== "" && loginPassword.value !== "";
}

function login() {
  var incorrectElement = document.getElementById("incorrect");
  if (!loginFields()) {
    incorrectElement.innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }
  var password = loginPassword.value;
  var email = loginEmail.value.trim();

  var user = null;
  for (var i = 0; i < usersArr.length; i++) {
    if (usersArr[i].email.toLowerCase() === email.toLowerCase()) {
      user = usersArr[i];
      break;
    }
  }

  if (!user) {
    incorrectElement.innerHTML =
      '<span class="p-2 text-danger">incorrect email</span>';
    return false;
  }

  if (user.password !== password) {
    incorrectElement.innerHTML =
      '<span class="p-2 text-danger">incorrect password</span>';
    return false;
  }

  localStorage.setItem("sessionUsername", user.name);
  if (baseURL === "/") {
    location.replace(location.origin + "/home.html");
  } else {
    location.replace(baseURL + "/home.html");
  }
}

function signupFields() {
  if (!signupName || !signupEmail || !signupPassword) return false;
  return (
    signupName.value.trim() !== "" &&
    signupEmail.value.trim() !== "" &&
    signupPassword.value.trim() !== ""
  );
}

function emailExists(email) {
  if (!email) return false;
  for (var i = 0; i < usersArr.length; i++) {
    if (usersArr[i].email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function signUp() {
  var existElement = document.getElementById("exist");
  if (!signupFields()) {
    existElement.innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }
  var signUp = {
    name: signupName.value.trim(),
    email: signupEmail.value.trim(),
    password: signupPassword.value,
  };
  if (emailExists(signUp.email)) {
    existElement.innerHTML =
      '<span class="text-danger m-3">email already exists</span>';
    return false;
  }
  if (!emailRegex.test(signUp.email)) {
    existElement.innerHTML =
      '<span class="text-danger m-3">email is not valid</span>';
    return false;
  }
  if (!passwordRegex.test(signUp.password)) {
    existElement.innerHTML =
      '<span class="text-danger m-3">password must be at least 6 characters long.</span>';
    return false;
  }
  usersArr.push(signUp);
  localStorage.setItem("users", JSON.stringify(usersArr));
  localStorage.setItem("sessionUsername", signUp.name);

  existElement.innerHTML = '<span class="text-success m-3">Success</span>';
  if (baseURL === "/") {
    location.replace(location.origin + "/home.html");
  } else {
    location.replace(baseURL + "/home.html");
  }
  return true;
}

if (username && usernameElement) {
  usernameElement.innerHTML = "Welcome " + username;
}

function logout() {
  localStorage.removeItem("sessionUsername");
}
