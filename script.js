/* =====================================================
   PERSONAL ACADEMIC PORTFOLIO WEBSITE
   script.js
===================================================== */

/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

if (dropdownToggle && dropdownMenu) {
  dropdownToggle.addEventListener("click", function (e) {
    e.preventDefault();

    dropdownMenu.classList.toggle("show-dropdown");
  });
}
/* =====================================================
   HOVER GLOW EFFECT
===================================================== */

const interactiveItems = document.querySelectorAll(
  ".nav-links a, .btn, .project-link",
);

interactiveItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transition = "0.3s";
    item.style.filter = "brightness(115%)";
    item.style.transform = "translateY(-2px)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.filter = "brightness(100%)";
    item.style.transform = "translateY(0)";
  });
});

/* =====================================================
   BUTTON CLICK EFFECT
===================================================== */

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(0.96)";

    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 120);
  });
});

/* =====================================================
   FADE-IN EFFECT FOR SECTIONS
===================================================== */

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.2,
  },
);

sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(40px)";
  section.style.transition = "all 0.8s ease";

  observer.observe(section);
});

/* =====================================================
   BIOGRAPHY AUDIO
===================================================== */

const playButton = document.getElementById("playAudio");
const bioAudio = document.getElementById("bioAudio");

if (playButton && bioAudio) {
  playButton.addEventListener("click", () => {
    if (bioAudio.paused) {
      bioAudio.play();
      playButton.textContent = "Pause Audio";
    } else {
      bioAudio.pause();
      playButton.textContent = "Listen to Audio";
    }
  });

  bioAudio.addEventListener("ended", () => {
    playButton.textContent = "Listen to Audio";
  });
}

/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || phone === "" || message === "") {
      alert("Please complete all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^[0-9]+$/;

    if (!phonePattern.test(phone)) {
      alert("Phone number should contain digits only.");
      return;
    }

    alert("Your message has been sent successfully!");

    contactForm.reset();
  });
}

/* =====================================================
   ACADEMIC PLANNER DEMO
===================================================== */

const addButton = document.querySelector(".add-btn");

if (addButton) {
  addButton.addEventListener("click", () => {
    alert("Task added successfully!");
  });
}

const deleteButton = document.querySelector(".delete-btn");

if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    alert("Task deleted.");
  });
}

const completeButton = document.querySelector(".complete-btn");

if (completeButton) {
  completeButton.addEventListener("click", () => {
    alert("Task marked as completed.");
  });
}

/* =====================================================
   PROJECT CARD HOVER EFFECT
===================================================== */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
    card.style.transition = "0.3s";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

/* =====================================================
   PHOTO HOVER EFFECT
===================================================== */

const photos = document.querySelectorAll(".photo-card img");

photos.forEach((photo) => {
  photo.addEventListener("mouseenter", () => {
    photo.style.transform = "scale(1.03)";
    photo.style.transition = "0.4s";
  });

  photo.addEventListener("mouseleave", () => {
    photo.style.transform = "scale(1)";
  });
});
document.addEventListener("click", function (event) {
  if (
    dropdownMenu &&
    dropdownToggle &&
    !dropdownToggle.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.classList.remove("show-dropdown");
  }
});
// ===============================
// Academic Planner
// ===============================

const MAX_TASKS = 5;

const taskName = document.getElementById("taskName");

const addTaskBtn = document.getElementById("addTaskBtn");

const deleteTaskBtn = document.getElementById("deleteTaskBtn");

const completeTaskBtn = document.getElementById("completeTaskBtn");

const taskContainer = document.getElementById("taskContainer");

let selectedTask = null;

// Create first two empty fields

for (let i = 0; i < 2; i++) {
  createTask("");
}

function createTask(taskText) {
  const taskItem = document.createElement("div");

  taskItem.className = "task-item";

  const taskField = document.createElement("input");

  taskField.type = "text";

  taskField.className = "task-field";

  taskField.readOnly = true;

  taskField.value = taskText;

  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";

  checkbox.className = "complete-checkbox";

  taskField.addEventListener("click", () => {
    document
      .querySelectorAll(".task-field")

      .forEach((field) => field.classList.remove("selected"));

    taskField.classList.add("selected");

    selectedTask = taskItem;
  });

  taskItem.appendChild(taskField);

  taskItem.appendChild(checkbox);

  taskContainer.appendChild(taskItem);
}

// Add Task

addTaskBtn.addEventListener("click", () => {
  const value = taskName.value.trim();

  if (value === "") return;

  const fields = document.querySelectorAll(".task-field");

  for (let field of fields) {
    if (field.value === "") {
      field.value = value;

      taskName.value = "";

      return;
    }
  }

  if (fields.length < MAX_TASKS) {
    createTask(value);

    taskName.value = "";
  } else {
    alert("You have reached the maximum number of tasks.");
  }
});

// Delete

deleteTaskBtn.addEventListener("click", () => {
  if (selectedTask == null) {
    alert("Select a task first.");

    return;
  }

  selectedTask.remove();

  selectedTask = null;
});

// Mark Complete

completeTaskBtn.addEventListener("click", () => {
  if (selectedTask == null) {
    alert("Select a task first.");

    return;
  }

  selectedTask.querySelector(".complete-checkbox").checked = true;
});
