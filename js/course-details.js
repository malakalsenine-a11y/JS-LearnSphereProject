const courseDetails = document.getElementById("courseDetails");
const quizForm = document.getElementById("quizForm");
const submitQuizBtn = document.getElementById("submitQuiz");
const quizResult = document.getElementById("quizResult");
const countBadge = document.getElementById("count");
const toggleBtn = document.getElementById("toggle_btn");

// ===== Get Course ID from URL =====
const params = new URLSearchParams(window.location.search);
const courseId = parseInt(params.get("id"));

let currentCourse = null;

