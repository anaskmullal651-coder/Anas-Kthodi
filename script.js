const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navigationLinks = [...document.querySelectorAll(".nav-links a")];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navigationLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

sections.forEach((section) => observer.observe(section));

const lockModal = document.querySelector("#lockModal");
const privatePanel = document.querySelector("#privatePanel");
const pinForm = document.querySelector("#pinForm");
const pinInput = document.querySelector("#pinInput");
const pinError = document.querySelector(".pin-error");

function closeLockModal() {
  lockModal.classList.remove("open");
  lockModal.setAttribute("aria-hidden", "true");
  pinInput.value = "";
  pinError.textContent = "";
}

document.querySelector(".private-open").addEventListener("click", () => {
  lockModal.classList.add("open");
  lockModal.setAttribute("aria-hidden", "false");
  pinInput.focus();
});

document.querySelector(".lock-close").addEventListener("click", closeLockModal);

pinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (pinInput.value === "9947130517") {
    closeLockModal();
    privatePanel.classList.add("open");
    privatePanel.setAttribute("aria-hidden", "false");
  } else {
    pinError.textContent = "Incorrect PIN.";
    pinInput.select();
  }
});

function closePrivatePanel() {
  privatePanel.classList.remove("open");
  privatePanel.setAttribute("aria-hidden", "true");
}

document.querySelector(".panel-close").addEventListener("click", closePrivatePanel);
document.querySelector(".private-overlay").addEventListener("click", closePrivatePanel);

const viewContent = {
  students: {
    title: "Student Details",
    action: "+ Add Student",
    rows: [
      ["Leena Ahmed", "Business Administration"],
      ["Omar Khalil", "Computer Science"],
      ["Maya Saleh", "Media & Communication"]
    ]
  },
  photos: {
    title: "Student Photos",
    action: "+ Upload Photo",
    rows: [
      ["Leena-profile.jpg", "Community Lead"],
      ["Omar-profile.jpg", "Tech Mentor"],
      ["Maya-profile.jpg", "Volunteer Lead"]
    ]
  },
  programs: {
    title: "Programs",
    action: "+ Add Program",
    rows: [
      ["Future Leaders", "Leadership"],
      ["Career Launch", "Career"],
      ["Ideas Hub", "Innovation"]
    ]
  },
  settings: {
    title: "Community Settings",
    action: "+ Add Statistic",
    rows: [
      ["Active students", "1,200+"],
      ["Programs", "18"],
      ["Partner groups", "25+"]
    ]
  },
  wings: {
    title: "Community Wings",
    action: "+ Add Wing",
    rows: [
      ["01 · Academic Wing", "Study support and tutoring"],
      ["02 · Leadership Wing", "Training and student leadership"],
      ["03 · Sports Wing", "Teams, fitness and tournaments"],
      ["04 · Arts Wing", "Creative and cultural expression"],
      ["05 · Music Wing", "Performance and music production"],
      ["06 · Technology Wing", "Coding, innovation and robotics"],
      ["07 · Media Wing", "Photography, film and journalism"],
      ["08 · Debate Wing", "Public speaking and dialogue"],
      ["09 · Volunteer Wing", "Service and community support"],
      ["10 · Environment Wing", "Sustainability and green projects"],
      ["11 · Entrepreneur Wing", "Startups and business ideas"],
      ["12 · Career Wing", "Mentoring and job readiness"],
      ["13 · Health Wing", "Wellbeing and health awareness"],
      ["14 · Women Wing", "Empowerment and peer support"],
      ["15 · Research Wing", "Projects and knowledge sharing"],
      ["16 · Science Wing", "Experiments and discovery"],
      ["17 · Literature Wing", "Reading, writing and poetry"],
      ["18 · Language Wing", "Language exchange and learning"],
      ["19 · Social Wing", "Events and social connection"],
      ["20 · International Wing", "Global exchange and culture"]
    ]
  }
};

const privateViewTitle = document.querySelector("#privateViewTitle");
const privateAddButton = document.querySelector("#privateAddButton");
const adminList = document.querySelector("#adminList");

document.querySelectorAll(".private-option").forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelectorAll(".private-option").forEach((item) => item.classList.remove("active"));
    option.classList.add("active");
    const content = viewContent[option.dataset.view];
    privateViewTitle.textContent = content.title;
    privateAddButton.textContent = content.action;
    adminList.innerHTML = content.rows.map((row) => `
      <div class="admin-row"><span>${row[0]}</span><span>${row[1]}</span><button type="button">Edit</button></div>
    `).join("");
  });
});
