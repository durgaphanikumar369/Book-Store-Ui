// Element references
const searchInputEl = document.getElementById("searchInput");
const selectDisplayCountEl = document.getElementById("selectDisplayCount");
const searchResultsEl = document.getElementById("searchResults");
const spinnerEl = document.getElementById("spinner");

// Function to create and append a search result
function createAndAppendSearchResult(book) {
    const resultEl = document.createElement("div");
    resultEl.classList.add("col-6", "text-center");

    const imageEl = document.createElement("img");
    imageEl.src = book.imageLink;
    imageEl.alt = book.title; // Adding alt text for accessibility
    resultEl.appendChild(imageEl);

    const authorEl = document.createElement("p");
    authorEl.textContent = book.author;
    authorEl.classList.add("text-center");
    resultEl.appendChild(authorEl);

    searchResultsEl.appendChild(resultEl);
}

// Function to display the fetched books
function displayBooks(data) {
    spinnerEl.classList.add("d-none");
    searchResultsEl.innerHTML = ""; // Clear previous results

    if (data.search_results.length === 0) {
        const noResultEl = document.createElement("p");
        noResultEl.textContent = "No Results Found";
        noResultEl.classList.add("no-results");
        searchResultsEl.appendChild(noResultEl);
    } else {
        const headerEl = document.createElement("div");
        headerEl.classList.add("col-12");
        headerEl.textContent = "Popular Books";
        searchResultsEl.appendChild(headerEl);

        data.search_results.forEach(createAndAppendSearchResult);
    }
}

// Function to handle the book search
function searchBooks(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");

        const search = searchInputEl.value.trim();
        const count = selectDisplayCountEl.value;

        if (!search) {
            spinnerEl.classList.add("d-none");
            alert("Please enter a search term.");
            return;
        }

        const url = `https://apis.ccbp.in/book-store?title=${search}&maxResults=${count}`;

        fetch(url)
            .then(response => response.json())
            .then(displayBooks)
            .catch(error => {
                spinnerEl.classList.add("d-none");
                alert("Something went wrong. Please try again later.");
                console.error("Error fetching data:", error);
            });
    }
}

// Event listener for the search input
searchInputEl.addEventListener("keydown", searchBooks);
