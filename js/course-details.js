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

// ===== Fetch Data =====
fetch("./data/data.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Could not load course data");
    }
    return res.json();
  })
  .then((data) => {
    const course = data.courses.find((c) => c.id === courseId);

    if (!course) {
      courseDetails.innerHTML = `
        <div class="alert alert-danger text-center">
          Course not found.
        </div>
      `;
      return;
    }
