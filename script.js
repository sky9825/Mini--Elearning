// --- Course Data ---
const courses = [
  { id: 1, title: "HTML Basics", description: "Learn the structure of web pages using HTML." },
  { id: 2, title: "CSS Styling", description: "Make your web pages beautiful with CSS." },
  { id: 3, title: "JavaScript Essentials", description: "Add interactivity to your websites using JS." },
];

// --- Display Courses in Table ---
const courseTableBody = document.getElementById("course-table-body");
if (courseTableBody) {
  courses.forEach(course => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${course.title}</td>
      <td>${course.description}</td>
      <td><button onclick="viewCourse(${course.id})">View Details</button></td>
    `;
    courseTableBody.appendChild(row);
  });
}

// --- Course Details ---
function viewCourse(id) {
  localStorage.setItem("selectedCourse", id);
  window.location.href = "course.html";
}

const courseDetails = document.getElementById("course-details");
if (courseDetails) {
  const selectedId = localStorage.getItem("selectedCourse");
  const course = courses.find(c => c.id == selectedId);
  if (course) {
    courseDetails.innerHTML = `
      <section>
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <ul>
          <li>Lesson 1: Introduction</li>
          <li>Lesson 2: Practice</li>
          <li>Lesson 3: Quiz</li>
        </ul>
        <button onclick="markCourseComplete(${course.id})">Mark as Completed</button>
      </section>
    `;
  }
}

// --- Mark Course Complete ---
function markCourseComplete(id) {
  let completed = JSON.parse(localStorage.getItem("completedCourses") || "[]");
  if (!completed.includes(id)) completed.push(id);
  localStorage.setItem("completedCourses", JSON.stringify(completed));
  alert("Course marked as completed!");
}

// --- Assignments ---
function markAssignmentComplete(id) {
  const status = document.getElementById(`status-${id}`);
  if (status) {
    status.textContent = "Status: Submitted ✅";
    status.style.color = "green";
  }
}

// --- Profile Page ---
const completedCoursesList = document.getElementById("completed-courses");
if (completedCoursesList) {
  const completed = JSON.parse(localStorage.getItem("completedCourses") || "[]");
  if (completed.length === 0) {
    completedCoursesList.innerHTML = "<li>No courses completed yet.</li>";
  } else {
    completed.forEach(id => {
      const course = courses.find(c => c.id == id);
      const li = document.createElement("li");
      li.textContent = course ? course.title : "Unknown Course";
      completedCoursesList.appendChild(li);
    });
  }
}


  