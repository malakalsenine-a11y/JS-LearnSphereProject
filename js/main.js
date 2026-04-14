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
});