// ===== Counter Animation =====
function animateCounter(id, target) {
  let count = 0;
  const speed = 50;
  const increment = target / speed;

  const element = document.getElementById(id);

  const update = () => {
    count += increment;

    if (count < target) {
      element.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      element.innerText = target;
    }
  };

  update();
}

// ===== Fetch Data =====
fetch('./data/data.json')
  .then(res => res.json())
  .then(data => {

    // ===== Stats (مع الحركة) =====
    animateCounter("coursesCount", data.stats.totalCourses);
    animateCounter("studentsCount", data.stats.studentsEnrolled);
    animateCounter("instructorsCount", data.stats.instructors);

    // ===== Featured Courses =====
    const featured = document.getElementById('featuredCourses');

    const firstThree = data.courses.slice(0, 3);

    featured.innerHTML = firstThree.map(course => `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm p-3">

          <h5>${course.title}</h5>

          <span class="badge bg-info">${course.category}</span>

          <p class="mt-2">
            <i class="fa-solid fa-chalkboard-user me-2 text-primary"></i>
            ${course.instructor}
          </p>

          <p class="text-warning stars">
            ${generateStars(course.rating)} (${course.rating})
          </p>

          <p>
            <i class="fa-regular fa-clock me-2 text-secondary"></i>
            ${course.duration}
          </p>

          <p>
            <i class="fa-solid fa-signal me-2 text-dark"></i>
            <span class="badge bg-warning text-dark">${course.level}</span>
          </p>

          <button class="btn btn-success w-100 mt-3">
            <i class="fa-solid fa-user-plus me-2"></i>
            Enroll Now
          </button>

        </div>
      </div>
      
});