// ===== Get Instructor from URL =====
const params = new URLSearchParams(window.location.search);
const selectedInstructor = params.get("instructor");

let allCourses = [];
let selectedCategory = "All";

const coursesContainer = document.getElementById("coursesContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const levelFilter = document.getElementById("levelFilter");
const countBadge = document.getElementById("count");
const filterButtons = document.querySelectorAll(".filter-btn");

