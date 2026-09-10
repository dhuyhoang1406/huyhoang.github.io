const GITHUB_USERNAME = "dhuyhoang1406";

// Pinned repositories - Update these to match your pinned repos on GitHub
const PINNED_REPOS = [
  "Herita-Social-Media-Frontend",
  "HTTT-FE",
  "trghieu9415/ooad_cnpm",
  "handwriting-siamese-one-shot-learning",
  "huyhoang.github.io",
  "dien2107/ec-project",
];

const projects = [
  {
    "title": "LifeHelper — AI-Powered Personal Productivity Platform",
    "link": "https://github.com/dhuyhoang1406/Lifehelper",
    "linkLabel": "Repository",
    "startDate": "Aug 2026",
    "endDate": "Present",
    "description": "Designed a six-service microservices architecture with isolated database ownership across identity, productivity, AI, document, notification, and analytics. Built a Clean Architecture backend foundation with NestJS, Prisma, PostgreSQL, Redis, per-service migrations, and integration testing. Designed event-driven patterns using transactional outbox and idempotent consumers, with an AWS deployment model targeting SQS/DLQ, ECS Fargate, RDS, ElastiCache, S3, and CloudWatch. Established GitHub Actions CI and automated OpenAI Codex PR reviews.",
    "technologies": [
      "Flutter",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Docker",
      "GitHub Actions"
    ],
    "team": "Personal Project",
    "role": "Software Engineer"
  },
  {
    "title": "E-commerce Clothing Platform",
    "link": "https://github.com/dhuyhoang1406/ec-project",
    "backendLink": "https://github.com/dhuyhoang1406/ec-project-backend",
    "startDate": "Sep 2025",
    "endDate": "Dec 2025",
    "description": "University project covering authentication, authorization, customer and inventory management, real-time chat, and administrative workflows. Implemented optimistic locking for inventory operations to prevent overselling under concurrent requests. Built an AI chatbot with Node.js and Gemini API, using Redis caching to reduce redundant API calls and improve response latency.",
    "technologies": [
      "React",
      ".NET 8",
      "SQL Server",
      "Redis",
      "Cloudinary",
      "Node.js",
      "Gemini API"
    ],
    "team": "University Project · Team of 6",
    "role": "Software Engineer"
  },
  {
    "title": "HeritaHub — Cultural Heritage Social App",
    "link": "https://github.com/dhuyhoang1406/Herita-Social-Media-Frontend",
    "backendLink": "https://github.com/dhuyhoang1406/HeritaHub-Backend",
    "startDate": "Feb 2025",
    "endDate": "Apr 2025",
    "description": "Top 10 Finalist in the WebDev Studios Competition. Designed database schemas and NestJS RESTful APIs for user profiles, real-time chat, and heritage-site modules, integrated with a React Native app. Modeled heritage-site relationships in Neo4j for graph-based recommendation queries and implemented bidirectional real-time messaging with Socket.IO.",
    "technologies": [
      "React Native",
      "Expo",
      "NestJS",
      "MySQL",
      "Neo4j",
      "Socket.IO",
      "JWT",
      "Argon2"
    ],
    "team": "Competition Project · Team of 5",
    "role": "Software Engineer",
    "achievement": "🏆 Top 10 Finalist"
  }
];

// Fetch GitHub Stats
async function fetchGitHubStats() {
  try {
    // Show loading state
    document.getElementById("total-repos").innerHTML =
      '<i class="fas fa-spinner fa-spin"></i>';
    document.getElementById("total-followers").innerHTML =
      '<i class="fas fa-spinner fa-spin"></i>';
    document.getElementById("total-following").innerHTML =
      '<i class="fas fa-spinner fa-spin"></i>';

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
    );

    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const data = await response.json();

    // Animate the numbers
    animateNumber("total-repos", 0, data.public_repos, 1000);
    animateNumber("total-followers", 0, data.followers, 1000);
    animateNumber("total-following", 0, data.following, 1000);
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    document.getElementById("total-repos").textContent = "N/A";
    document.getElementById("total-followers").textContent = "N/A";
    document.getElementById("total-following").textContent = "N/A";
  }
}

// Animate number counting
function animateNumber(elementId, start, end, duration) {
  const element = document.getElementById(elementId);
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (
      (increment > 0 && current >= end) ||
      (increment < 0 && current <= end)
    ) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Display Pinned GitHub Repositories
async function displayPinnedRepos() {
  const reposContainer = document.getElementById("github-repos");

  try {
    const repoPromises = PINNED_REPOS.map(async (repoPath) => {
      // Handle both "owner/repo" and "repo" formats
      const fullPath = repoPath.includes("/")
        ? repoPath
        : `${GITHUB_USERNAME}/${repoPath}`;

      try {
        const response = await fetch(
          `https://api.github.com/repos/${fullPath}`,
        );
        if (response.ok) {
          return await response.json();
        }
        return null;
      } catch (error) {
        console.error(`Error fetching ${fullPath}:`, error);
        return null;
      }
    });

    const repos = (await Promise.all(repoPromises)).filter(
      (repo) => repo !== null,
    );

    if (repos.length === 0) {
      reposContainer.innerHTML = `
        <div class="loading">
          <p>Unable to load pinned repositories.</p>
        </div>
      `;
      return;
    }

    displayGitHubRepos(repos);
  } catch (error) {
    console.error("Error fetching pinned repos:", error);
    reposContainer.innerHTML = `
      <div class="loading">
        <p>Unable to load pinned repositories.</p>
      </div>
    `;
  }
}

// Display GitHub Repositories
function displayGitHubRepos(repos) {
  const reposContainer = document.getElementById("github-repos");

  // Display repos in the order they were pinned (no filtering or sorting)
  const displayRepos = repos.slice(0, 6);

  if (displayRepos.length === 0) {
    reposContainer.innerHTML = `
            <div class="loading">
                <p>No repositories to display yet.</p>
            </div>
        `;
    return;
  }

  reposContainer.innerHTML = displayRepos
    .map(
      (repo) => `
        <div class="repo-card">
            <a href="${repo.html_url}" target="_blank" class="repo-name">
                <i class="fab fa-github"></i> ${repo.name}
            </a>
            <p class="repo-description">${
              repo.description || "No description available"
            }</p>
            <div class="repo-stats">
                <span><i class="fas fa-star"></i> ${
                  repo.stargazers_count
                }</span>
                <span><i class="fas fa-code-branch"></i> ${
                  repo.forks_count
                }</span>
                ${
                  repo.language
                    ? `<span><i class="fas fa-circle"></i> ${repo.language}</span>`
                    : ""
                }
            </div>
        </div>
    `,
    )
    .join("");
}

// Display Projects
function displayProjects() {
  const projectsGrid = document.getElementById("projects-grid");

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                ${
                  project.achievement
                    ? `<span class="project-badge">${project.achievement}</span>`
                    : ""
                }
                <p class="project-date">${project.startDate} - ${
                  project.endDate
                }</p>
                <p class="project-role">${project.role} • ${project.team}</p>
            </div>
            <div class="project-body">
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
                <div class="project-links">
                    <a href="${
                      project.link
                    }" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> ${project.linkLabel || "Frontend"}
                    </a>
                    ${
                      project.backendLink
                        ? `
                        <a href="${project.backendLink}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> Backend
                        </a>
                    `
                        : ""
                    }
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

// Smooth Scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

// Add scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".project-card, .repo-card, .skill-category, .contact-card, .detail-item",
  );

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize scroll reveal styles
function initScrollReveal() {
  const reveals = document.querySelectorAll(
    ".project-card, .repo-card, .skill-category, .contact-card, .detail-item",
  );
  reveals.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });
}

// External statistics images can fail independently of the portfolio.
function initGitHubImageFallbacks() {
  document.querySelectorAll("#github img").forEach((img) => {
    const showFallback = () => {
      if (img.hidden) return;
      img.hidden = true;
      const fallback = document.createElement("div");
      fallback.className = "github-image-fallback";
      const message = document.createElement("p");
      message.textContent = `${img.alt} is temporarily unavailable.`;
      const link = document.createElement("a");
      link.href = `https://github.com/${GITHUB_USERNAME}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "project-link";
      link.textContent = "View activity on GitHub";
      fallback.append(message, link);
      img.insertAdjacentElement("afterend", fallback);
    };
    img.addEventListener("error", showFallback, { once: true });
    // Also handle images that failed before DOMContentLoaded.
    if (img.complete && img.naturalWidth === 0) showFallback();
  });
}

// Initialize everything
window.addEventListener("DOMContentLoaded", () => {
  initGitHubImageFallbacks();
  displayProjects();
  fetchGitHubStats();
  initScrollReveal();
  revealOnScroll();
});

// Add scroll event listener
window.addEventListener("scroll", revealOnScroll);
