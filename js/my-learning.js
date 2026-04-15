const myCoursesContainer = document.getElementById("myCoursesContainer");
const statsContainer = document.getElementById("statsContainer");
const countBadge = document.getElementById("count");
const toggleBtn = document.getElementById("toggle_btn");

// ===== Load enrolled courses =====
let enrolledCourses = JSON.parse(localStorage.getItem("enrolled")) || [];

displayMyCourses();
updateNavbarCount();
applySavedTheme();

