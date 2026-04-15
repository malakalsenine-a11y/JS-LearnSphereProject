const myCoursesContainer = document.getElementById("myCoursesContainer");
const statsContainer = document.getElementById("statsContainer");
const countBadge = document.getElementById("count");
const toggleBtn = document.getElementById("toggle_btn");

// ===== Load enrolled courses =====
let enrolledCourses = JSON.parse(localStorage.getItem("enrolled")) || [];

displayMyCourses();
updateNavbarCount();
applySavedTheme();

// ===== Display Enrolled Courses =====
function displayMyCourses() {
  myCoursesContainer.innerHTML = "";
  statsContainer.innerHTML = "";

  if (enrolledCourses.length === 0) {
    myCoursesContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-info">
          <p class="mb-3">You haven't enrolled in any courses yet.</p>
          <a href="courses.html" class="btn btn-primary">Browse Courses</a>
        </div>
      </div>
    `;
    return;
  }

  displayStats();

  enrolledCourses.forEach((course) => {
    const score = localStorage.getItem(`quizScore_${course.id}`);
    const numericScore = score !== null ? parseInt(score) : 0;
    const progress = (numericScore / 5) * 100;

    let progressClass = "bg-danger";
    if (progress >= 80) {
      progressClass = "bg-success";
    } else if (progress >= 40) {
      progressClass = "bg-warning";
    }

const stars = generateStars(course.rating);

    myCoursesContainer.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">${course.title}</h5>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Category:</strong> ${course.category}</p>
            <p><strong>Level:</strong> ${course.level}</p>
            <p class="text-warning fw-semibold stars">${stars} (${course.rating})</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Students:</strong> ${course.studentsCount}</p>
            <p class="fw-bold text-primary">$${course.price}</p>

            <p class="mt-2 mb-1">
              <strong>Quiz Score:</strong> 
              ${score !== null ? `<span class="text-success">${score}/5</span>` : `<span class="text-muted">Not attempted yet</span>`}
            </p>

            <p class="mb-1"><strong>Progress:</strong> ${progress}%</p>
            <div class="progress mb-3" style="height: 10px;">
              <div class="progress-bar ${progressClass}" role="progressbar" style="width: ${progress}%"></div>
            </div>

            <div class="mt-auto d-grid gap-2">
              <a href="course-details.html?id=${course.id}" class="btn btn-outline-primary">
                Continue Learning
              </a>

              <button class="btn btn-danger remove-btn" data-id="${course.id}">
                Remove Course
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  addRemoveEvents();
}

function generateStars(rating) {
  let starsHTML = "";
  const fullStars = Math.floor(rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHTML += `<i class="fa-solid fa-star"></i>`;
    } else {
      starsHTML += `<i class="fa-regular fa-star"></i>`;
    }
  }

  return starsHTML;
}
