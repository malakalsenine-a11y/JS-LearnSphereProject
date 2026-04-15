const instructorsContainer = document.getElementById("instructorsContainer");
const instructorSearch = document.getElementById("instructorSearch");
const countBadge = document.getElementById("count");
const toggleBtn = document.getElementById("toggle_btn");

let allInstructors = [];

// ===== Fetch Courses and Extract Instructors =====
fetch("./data/data.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Could not load instructors data");
    }
    return res.json();
  })
  .then((data) => {
    allInstructors = extractInstructors(data.courses);
    displayInstructors(allInstructors);
    updateNavbarCount();
    applySavedTheme();
  })
  .catch((error) => {
    console.error("Error loading instructors:", error);
    instructorsContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-danger">
          Error loading instructors.
        </div>
      </div>
    `;
  });

// ===== Extract Unique Instructors =====
function extractInstructors(courses) {
  const instructorMap = {};

  courses.forEach((course) => {
    if (!instructorMap[course.instructor]) {
      instructorMap[course.instructor] = {
        name: course.instructor,
        category: course.category,
        coursesCount: 1,
        rating: course.rating,
        level: course.level
      };
    } else {
      instructorMap[course.instructor].coursesCount++;
    }
  });

  return Object.values(instructorMap);
}
