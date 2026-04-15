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

    currentCourse = course;
    displayCourseDetails(course);
    displayQuiz(course.quiz);
    updateNavbarCount();
    applySavedTheme();
  })
  .catch((error) => {
    console.error("Error loading course details:", error);
    courseDetails.innerHTML = `
      <div class="alert alert-danger text-center">
        Error loading course details.
      </div>
    `;
  });

  
// ===== Display Course Details =====
function displayCourseDetails(course) {
  const stars = generateStars(course.rating);

  courseDetails.innerHTML = `
    <div class="card shadow-sm border-0 p-4">
      <h2 class="fw-bold mb-3">${course.title}</h2>
      <p><strong>Instructor:</strong> ${course.instructor}</p>
      <p><strong>Category:</strong> ${course.category}</p>
      <p><strong>Level:</strong> ${course.level}</p>
      <p><strong>Rating:</strong> <span class="text-warning stars">${stars} (${course.rating})</span></p>
      <p><strong>Duration:</strong> ${course.duration}</p>
      <p><strong>Students:</strong> ${course.studentsCount}</p>
      <p><strong>Price:</strong> <span class="text-primary fw-bold">$${course.price}</span></p>

      <hr />

      <h4 class="fw-bold mb-3">Topics Covered</h4>
      <ul class="list-group">
        ${course.topics.map(topic => `<li class="list-group-item">${topic}</li>`).join("")}
      </ul>
    </div>
  `;
}
