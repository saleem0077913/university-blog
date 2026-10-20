
const stories = [
  {
    title: "University of Layyah and UET Partnership",
    category: "University News",
    image: "https://ul.edu.pk/storage/career/files/mou2-39f6f.jpeg",
    description: "Explore a university news story about academic and technological collaboration.",
    details: "This card provides a short educational summary. Visit the official university website to verify the complete news story.",
    link: "https://ul.edu.pk/"
  },
  {
    title: "University Campus and Facilities",
    category: "University News",
    image: "https://ul.edu.pk/storage/career/assets/uploads/Gemini_Generated_Image_6n0ejw6n0ejw6n0e.jpg",
    description: "Discover information about campus facilities and student services.",
    details: "The university website provides information about facilities such as the library, transport, medical services and scholarships. Check the official website for current details.",
    link: "https://ul.edu.pk/"
  },
  {
    title: "Technology in Modern Education",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description: "Digital tools can help students practise programming, research and collaboration.",
    details: "Students can build projects using HTML, CSS and JavaScript and publish their work on GitHub. This is sample educational content.",
    link: ""
  },
  {
    title: "Study Skills for University Students",
    category: "Education",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
    description: "Build a consistent study routine and improve your learning habits.",
    details: "Regular revision, practice questions and time management can help students prepare for exams. This is sample educational content.",
    link: ""
  },
  {
    title: "Explore Campus Life",
    category: "Student Life",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80",
    description: "Discover the value of teamwork, learning activities and student development.",
    details: "Students can check approved university activities and official announcements to find opportunities to participate.",
    link: "https://ul.edu.pk/"
  },
  {
    title: "Build Your First Web Project",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    description: "Start a portfolio project and learn how HTML, CSS and JavaScript work together.",
    details: "Create a structured HTML page, style it with CSS and add interactive features using JavaScript. Upload your project to GitHub when it is ready.",
    link: ""
  }
];

const grid = document.getElementById("storyGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

function renderStories() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = stories.filter(story => {
    const matchesCategory =
      category === "All" || story.category === category;

    const text = [
      story.title,
      story.category,
      story.description,
      story.details
    ].join(" ").toLowerCase();

    return matchesCategory && text.includes(term);
  });

  grid.replaceChildren();
  resultCount.textContent = `${filtered.length} article(s)`;
  emptyMessage.hidden = filtered.length > 0;

  filtered.forEach(story => {
    const card = document.createElement("article");
    card.className = "story-card";

    const img = document.createElement("img");
    img.src = story.image;
    img.alt = story.title;
    img.loading = "lazy";

    img.addEventListener("error", () => {
      img.style.display = "none";
    });

    const body = document.createElement("div");
    body.className = "story-body";

    const categoryLabel = document.createElement("span");
    categoryLabel.textContent = story.category;

    const heading = document.createElement("h3");
    heading.textContent = story.title;

    const description = document.createElement("p");
    description.textContent = story.description;

    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Read more";

    const detailsText = document.createElement("p");
    detailsText.textContent = story.details;

    details.append(summary, detailsText);
    body.append(categoryLabel, heading, description, details);

    if (story.link) {
      const link = document.createElement("a");
      link.href = story.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Visit university website ↗";
      body.append(link);
    }

    card.append(img, body);
    grid.append(card);
  });
}

searchInput.addEventListener("input", renderStories);
categoryFilter.addEventListener("change", renderStories);

// Responsive navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕ Close Menu" : "☰ Menu";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰ Menu";
  });
});

// Demo contact form: it does not send or store messages.
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = document.getElementById("visitorName").value.trim();
  document.getElementById("formMessage").textContent =
    `Thank you, ${name}. This is a demo form; no message was sent.`;

  form.reset();
});

// Automatic footer year
document.getElementById("year").textContent = new Date().getFullYear();

renderStories();
