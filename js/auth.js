let users = JSON.parse(localStorage.getItem("usersList")) || [];
document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }
   const existingUser = users.find(function(user) {
    return user.username === username;
  });
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

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("usersList")) || [];

    const matchedUser = users.find(function(user) {
      return user.username === username && user.password === password;
    });
     if (!matchedUser) {
      alert("Invalid username or password.");
      return;
    }
     localStorage.setItem("currentUser", JSON.stringify(username));

    alert("Login successful!");
    window.location.href = "index.html";
  });
}