const accessKey = "MDg5mP4kzkGW-9NtyqN_Qnv9hmOuKoq6_ixFQcM3NxA";
const formEl = document.querySelector("form");
const inputEl = document.querySelector("#search-input"); // Fixed the ID selector
const searchResults = document.querySelector(".main");
const show = document.querySelector(".show");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value; // Corrected variable name
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img"); // Changed "image" to "img" for the image element
    image.src = result.urls.small; // Changed "result.url.small" to "result.urls.small"
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    // child

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  page++;

  if (page > 1) {
    show.style.display = "block"; // Corrected "diplay" to "display"
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

show.addEventListener("click", () => {
  searchImages();
});
