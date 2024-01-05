var menuLinks = [
  { text: "biography", href: "/biography" },
  {
    href: "#",
    subLinks: [
      { text: "life", href: "/life" },
    ]
  },
  {
    text: "poems",
    href: "#",
    subLinks: [
      { text: "And Still I Rise", href: "/poems/rise" },
      { text: "On the Pulse of Morning", href: "/poems/pulse" },
      { text: "Letter to my daughter", href: "/poems/letter" },
    ],
  },
  {
    text: "books",
    href: "#",
    subLinks: [
      { text: "I know why the Caged Bird  Sings", href: "/books/caged" },
      { text: "The Collected Autobiographies of Maya Angelou", href: "/books/autobio" },
    ],
  },
];


// Top Menu
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = `var(--top-menu-bg)`;
topMenuEl.classList.add("flex-around");

//  Menu clicks event listener

function handleClick(event) {
  event.preventDefault();

  // Check if clicked element is an anchor
  if (!event.target.matches("a")) return;

  console.log(event.target.textContent);
}

topMenuEl.addEventListener("click", handleClick);

// Track currently selected item
let currentMenuItem = null;

// Event listener for subMenuEl
function onClick(event) {
  event.preventDefault();

  // Check if clicked element is an anchor
  if (!event.target.matches("a")) return;

  const clickedLink = event.target;
  const subMenuEl = clickedLink.closest("#sub-menu");

  subMenuEl.style.top = clickedLink.subLinks && "100%";
  subMenuEl.classList.toggle("active");
  clickedLink.classList.add("active");
  currentMenuItem = clickedLink;

  // Build submenu dynamically if needed
  if (clickedLink.subLinks) {
    buildSubmenu(clickedLink, subMenuEl);
  }
}

function buildSubmenu(clickedLink, subMenuEl) {
  subMenuEl.innerHTML = "";

  for (const subLink of clickedLink.subLinks) {
    const anchorElement = document.createElement("a");
    anchorElement.href = subLink.href;
    anchorElement.textContent = subLink.text;

    subMenuEl.appendChild(anchorElement);
  }
}

topMenuEl.addEventListener("click", onClick);

// Loop topMenuEl link object and create a subMenuEl link
for (const link of menuLinks) {
  const anchorElement = document.createElement("a");
  anchorElement.href = link.href;
  anchorElement.textContent = link.text;

  // Create and add a sub-menu element if the link has subLinks
  if (link.subLinks) {
    const subMenuEl = document.createElement("ul");
    subMenuEl.style.display = "none";
    anchorElement.appendChild(subMenuEl);

    // Build the submenu initially
    buildSubmenu(link, subMenuEl);
  }

  topMenuEl.appendChild(anchorElement);
}


// Get references to the form and submit button
const form = document.querySelector('form');
const submitButton = document.querySelector('submitBtn');

// Function to check if exactly one quote is selected
const validateForm = () => {
  let selectedQuotes = 0;
  const quoteCheckboxes = document.querySelectorAll('input[type="checkbox"]');

  quoteCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedQuotes++;
    }
  });

  return selectedQuotes === 1;
};

// Add event listener to the submit button
submitButton.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission

  if (validateForm()) {
    // Submit the form if validation passes
    form.submit();
  } else {
    // Display an error message
     alert("Please select one quote.");
  }
});