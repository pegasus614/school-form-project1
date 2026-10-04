/* =========================
JOB DATA
========================= */

const jobs = [
  {
    id: "childcare",
    title: "Childcare Assistant",
    icon: "fa-child",
    type: "Part-Time",
    location: "Flexible Location",
    description:
      "A flexible student-friendly opportunity for individuals who enjoy working with children and creating a safe, positive environment.",

    details: `
      <h2>Childcare Assistant</h2>

      <p>
        The Childcare Assistant position is designed for students who enjoy
        working with children and want a flexible part-time opportunity that
        can fit around their academic schedule.
      </p>

      <p>
        Responsibilities may include supervising children, helping with meals
        and snacks, organizing age-appropriate activities, reading with
        children, assisting with homework, helping with daily routines,
        organizing play areas, and maintaining a safe and welcoming
        environment.
      </p>

      <p>
        This position can be a good opportunity for students who are
        responsible, patient, dependable, and comfortable communicating with
        children and families.
      </p>

      <p>
        <strong>Schedule:</strong> Flexible part-time hours based on
        availability and the needs of the position.
      </p>

      <button
        class="apply-btn"
        onclick="openApplication('Childcare Supply Personnel')"
      >
        Apply for This Position
      </button>
    `
  },

  {
    id: "supply",
    title: "Supply Personnel Aide",
    icon: "fa-box",
    type: "Part-Time",
    location: "Flexible Location",
    description:
      "Assist with organizing supplies, inventory, deliveries, and general supply-related tasks.",

    details: `
      <h2>Supply Personnel Aide</h2>

      <p>
        The Supply Personnel Aide supports daily supply and organization
        activities.
      </p>

      <p>
        Responsibilities may include organizing supplies, checking inventory,
        preparing items for distribution, assisting with deliveries,
        organizing storage areas, and providing general operational support.
      </p>

      <p>
        <strong>Schedule:</strong> Flexible part-time hours designed to work
        around a student's academic schedule.
      </p>

      <button
        class="apply-btn"
        onclick="openApplication('Childcare Supply Personnel')"
      >
        Apply for This Position
      </button>
    `
  },

  {
    id: "errand",
    title: "Errand Assistant",
    icon: "fa-person-walking",
    type: "Part-Time",
    location: "Flexible Location",
    description:
      "Help with approved everyday errands, pickups, deliveries, organization, and simple support tasks.",

    details: `
      <h2>Errand Assistant</h2>

      <p>
        The Errand Assistant provides support with everyday errands and
        approved general tasks.
      </p>

      <p>
        Responsibilities may include pickups and drop-offs, delivering or
        collecting items, organizing belongings, assisting with simple tasks,
        and completing other approved errands as needed.
      </p>

      <p>
        <strong>Schedule:</strong> Flexible part-time hours that can be
        arranged around classes and other school responsibilities.
      </p>

      <button
        class="apply-btn"
        onclick="openApplication('Errand Assistant')"
      >
        Apply for This Position
      </button>
    `
  }
];

/* =========================
DISPLAY JOBS
========================= */

const jobsContainer = document.getElementById("jobsContainer");

function displayJobs(jobList) {
  jobsContainer.innerHTML = "";

  if (jobList.length === 0) {
    jobsContainer.innerHTML = `
      <div class="job-card">
        <h3>No jobs found</h3>
        <p>
          Try searching for another position.
        </p>
      </div>
    `;

    return;
  }

  jobList.forEach((job) => {
    const card = document.createElement("div");

    card.className = "job-card";

    card.innerHTML = `
      <div class="job-icon">
        <i class="fas ${job.icon}"></i>
      </div>

      <h3>${job.title}</h3>

      <p>
        ${job.description}
      </p>

      <div class="job-info">

        <span class="job-tag">
          ${job.type}
        </span>

        <span class="job-tag">
          ${job.location}
        </span>

      </div>

      <button
        class="view-btn"
        onclick="openJob('${job.id}')"
      >
        View Position
      </button>
    `;

    jobsContainer.appendChild(card);
  });
}

/* =========================
SEARCH
========================= */

const searchInput = document.getElementById("searchInput");
const jobFilter = document.getElementById("jobFilter");

function filterJobs() {
  const search = searchInput.value.toLowerCase().trim();
  const filter = jobFilter.value;

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search) ||
      job.description.toLowerCase().includes(search);

    const matchesFilter =
      filter === "all" ||
      job.id === filter;

    return matchesSearch && matchesFilter;
  });

  displayJobs(filteredJobs);
}

searchInput.addEventListener("input", filterJobs);
jobFilter.addEventListener("change", filterJobs);

/* =========================
JOB DETAILS MODAL
========================= */

const modal = document.getElementById("jobModal");
const modalContent = document.getElementById("modalContent");
const closeModalButton = document.getElementById("closeModal");

function openJob(jobId) {
  const job = jobs.find((item) => item.id === jobId);

  if (!job) return;

  modalContent.innerHTML = job.details;

  modal.classList.add("active");

  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");

  document.body.style.overflow = "";
}

closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

/* =========================
APPLICATION FORM
========================= */

const applicationModal =
  document.getElementById("applicationModal");

const closeApplicationModal =
  document.getElementById("closeApplicationModal");

const applicationForm =
  document.getElementById("applicationForm");

const applicationJob =
  document.getElementById("applicationJob");

function openApplication(jobName) {
  /*
  Close the job details modal first.
  */

  closeModal();

  /*
  Automatically select the job.
  */

  applicationJob.value = jobName;

  /*
  Show application form.
  */

  applicationModal.classList.add("active");

  document.body.style.overflow = "hidden";
}

function closeApplication() {
  applicationModal.classList.remove("active");

  document.body.style.overflow = "";
}

closeApplicationModal.addEventListener(
  "click",
  closeApplication
);

applicationModal.addEventListener("click", (event) => {
  if (event.target === applicationModal) {
    closeApplication();
  }
});

/* =========================
FORM SUBMISSION
========================= */

applicationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    fullName: document.getElementById("fullName").value,
    age: document.getElementById("age").value,
    gender: document.querySelector(
      'input[name="gender"]:checked'
    ).value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    schoolEmail: document.getElementById("schoolEmail").value,
    personalEmail: document.getElementById("personalEmail").value,
    bank: document.getElementById("bank").value,
    depositLimit: document.getElementById("depositLimit").value,
    applicationJob: document.getElementById("applicationJob").value
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const result = await response.json();

    if (result.success) {
      alert(
        "Your application has been received. Thank you for applying!"
      );

      applicationForm.reset();

      closeApplication();
    } else {
      alert(
        result.message || "Application submission failed."
      );
    }
  } catch (error) {
    console.error("Application error:", error);

    alert(
      "Unable to submit your application. Please try again."
    );
  }
});

/* =========================
MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const icon = menuBtn.querySelector("i");

  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

/* CLOSE MOBILE MENU */

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    const icon = menuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

/* =========================
INITIAL LOAD
========================= */

displayJobs(jobs);