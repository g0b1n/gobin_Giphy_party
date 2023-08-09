// API access key for Giphy API
const accessKey = "sM5le5Nt6Zd5nhVNj8vzVyOS9k4bFe83";

// Select DOM Elements
const form = document.querySelector('#gif-form');          // Form for submitting search
const input = document.querySelector('#search-input');     // Input field for search
const removeBtn = document.querySelector('#remove-button');// Button to remove displayed GIFs
const gifContainer = document.querySelector('#gif-container'); // Container to display GIFs

// Function to fetch and display GIFs based on a search term
function searchGIFs(search) {
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${accessKey}`;
    console.log("API URL:", url);

    // Make a GET request to Giphy API using Axios
    axios.get(url)
    .then(function (response) {
        const gifData = response.data.data; // Extract GIF data from the response
        appendGIFs(gifData); // Call function to append GIFs to the container
    })
    .catch(function (error){
        console.log("ERROR Fetching GIFs:", error);
    });
}

// Function to append GIFs to the container
function appendGIFs(gifData) {
    removeGIFs(); // Clear existing GIFs from the container

    // Loop through each GIF in the data
    gifData.forEach(function (gif) {
        const gifUrl = gif.images.fixed_height.url; // Get the GIF URL
        const gifElement = document.createElement('img'); // Create an img element
        gifElement.src = gifUrl; // Set the src attribute to the GIF URL
        gifElement.classList.add("gif"); // Add a class for styling
        gifContainer.appendChild(gifElement); // Append the img element to the container
    });
}

// Event listener for the search form submission
form.addEventListener('submit', function(e){
    e.preventDefault(); // Prevent default form submission behavior
    const search = input.value; // Get the search term from the input field
    searchGIFs(search); // Call function to fetch and display GIFs
});

// Event listener for the remove button
removeBtn.addEventListener('click', function() {
    removeGIFs(); // Call function to remove displayed GIFs
});

// Function to remove all displayed GIFs from the container
function removeGIFs() {
    gifContainer.innerHTML = ''; // Clear the inner HTML of the container
}
