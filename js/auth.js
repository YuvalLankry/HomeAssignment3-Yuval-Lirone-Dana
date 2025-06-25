// function checkAuth() {
//   const currentUser = localStorage.getItem("currentUser");
//   if (!currentUser) {
//     window.location.href = "login.html";
//   }
// }

// checkAuth();     

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


