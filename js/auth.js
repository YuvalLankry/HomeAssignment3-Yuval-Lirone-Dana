let users = JSON.parse(localStorage.getItem("usersList")) || [];

const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert("This username is already taken. Please choose another.");
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("usersList", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("usersList")) || [];
    const matchedUser = users.find(user => user.username === username && user.password === password);

    if (!matchedUser) {
      alert("Invalid username or password.");
      return;
    }

    localStorage.setItem("currentUser", username); 
    alert("Login successful!");
    window.location.href = "index.html";
  });
}

const signOutBtn = document.getElementById("signOutBtn");
 const signOutMobile = document.getElementById("signOutBtnMobile");

  if (signOutBtn) {
    signOutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }

  if (signOutMobile) {
    signOutMobile.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("active");
});

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});


