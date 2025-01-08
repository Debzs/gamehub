// Fetch Featured Games from RAWG API
async function fetchFeaturedGames() {
  try {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=c289e0883f6244b38247a1df7d73faf8&page_size=5"
    );
    const data = await response.json();
    const gameSlider = document.querySelector(".game-slider");

    // Render featured games dynamically
    if (data.results && data.results.length > 0) {
      gameSlider.innerHTML = data.results
        .map(
          (game) => `
  <div class="game-card" onclick="navigateToDetails('${game.id}')">
  <img src="${game.background_image || "default-image.jpg"}" alt="${
            game.name
          }" class="game-image">
  <h4>${game.name}</h4>
  </div>
  `
        )
        .join("");
    } else {
      gameSlider.innerHTML =
        "<p>No featured games available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error fetching featured games:", error);
    document.querySelector(".game-slider").innerHTML =
      "<p>Error loading featured games. Please try again later.</p>";
  }
}

// Navigate to Game Details Page
function navigateToDetails(gameId) {
  const detailsPageUrl = `game-details.html?gameId=${gameId}`;
  window.location.href = detailsPageUrl;
}

// Fetch Game Details
async function fetchGameDetails(gameId) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=c289e0883f6244b38247a1df7d73faf8`
    );
    const game = await response.json();

    // Display game details dynamically on details page
    const detailsSection = document.querySelector(".game-details");
    detailsSection.innerHTML = `
  <h2>${game.name}</h2>
  <img src="${game.background_image || "default-image.jpg"}" alt="${
      game.name
    }" class="details-image">
  <p>${game.description_raw || "No description available."}</p>
  <p><strong>Released:</strong> ${game.released || "Unknown"}</p>
  <p><strong>Rating:</strong> ${game.rating || "N/A"}</p>
  `;
  } catch (error) {
    console.error("Error fetching game details:", error);
    const detailsSection = document.querySelector(".game-details");
    detailsSection.innerHTML =
      "<p>Error loading game details. Please try again later.</p>";
  }
}

// Fetch Reviews for Game Reviews Page
async function fetchReviews() {
  try {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=c289e0883f6244b38247a1df7d73faf8&page_size=10"
    );
    const data = await response.json();
    const reviewsGrid = document.querySelector(".review-grid");
    const topRatedGrid = document.querySelector(".top-rated");
    const byGenresGrid = document.querySelector(".by-genres");
    const byPlatformGrid = document.querySelector(".by-platform");

    // Render reviews dynamically
    if (data.results && data.results.length > 0) {
      reviewsGrid.innerHTML = data.results
        .map(
          (game) => `
  <div class="review-card" onclick="navigateToDetails('${game.id}')">
  <img src="${game.background_image || "default-image.jpg"}" alt="${
            game.name
          }" class="review-image">
  <h4>${game.name}</h4>
  <p>Rating: ${game.rating || "N/A"}</p>
  </div>
  `
        )
        .join("");

      // Simulating additional categories
      topRatedGrid.innerHTML = reviewsGrid.innerHTML;
      byGenresGrid.innerHTML = "<p>More genres coming soon...</p>";
      byPlatformGrid.innerHTML = "<p>More platforms coming soon...</p>";
    } else {
      reviewsGrid.innerHTML =
        "<p>No reviews available at the moment. Check back later!</p>";
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    document.querySelector(".review-grid").innerHTML =
      "<p>Error loading reviews. Please try again later.</p>";
  }
}

// Fetch News from GameSpot API
async function fetchGameSpotNews() {
  const apiKey = "d564e38d07dbbf7e5b3a6ace3f7c28690994f9af";
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/articles/?api_key=${apiKey}&format=json`;

  try {
    console.log("fetching");

    const response = await fetch(apiUrl);

    console.log(response.ok);

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();

    const newsGrid = document.querySelector(".news-grid");

    // Render news dynamically
    if (data.results && data.results.length > 0) {
      newsGrid.innerHTML = data.results
        .map(
          (article) => `
  <div class="news-card">
  <img src="${article.image?.original || "default-image.jpg"}" alt="${
            article.title
          }" class="news-image">
  <h4>${article.title}</h4>
  <p>${article.lede || "No description available."}</p>
  <a href="${article.site_detail_url}" target="_blank">Read More</a>
  </div>
  `
        )
        .join("");
    } else {
      newsGrid.innerHTML = "<p>No news articles available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error fetching GameSpot news:", error);
    document.querySelector(
      ".news-grid"
    ).innerHTML = `<p>Error loading news. Please try again later.</p><p>${error.message}</p>`;
  }
}

async function fetchGameSpotGuides() {
  const apiUrl = `https://www.reddit.com/r/GameGuides.json`;

  try {
    console.log("fetching");

    const response = await fetch(apiUrl);

    console.log(response.ok);

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    console.log(data.data);
    const newsGrid = document.querySelector(".guides-grid");

    // Render news dynamically
    if (data.data && data.data.children.length > 0) {
      newsGrid.innerHTML = data.data.children
        .map(
          (article) => `
  <div class="news-card">
  <img src="${
    article.data.preview?.images.length
      ? article.data.preview.images[0].source.url
      : "default-image.jpg"
  }" alt="${article.data.id}" class="news-image">
  <h4 style="color:black">${article.data.title}</h4>
  <p>${article.data.author || "No author available."}</p>
  <a href="${article.data.url}" target="_blank">Read More</a>
  </div>
  `
        )
        .join("");
    } else {
      newsGrid.innerHTML = "<p>No news articles available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error fetching GameSpot news:", error);
    document.querySelector(
      ".guides-grid"
    ).innerHTML = `<p>Error loading news. Please try again later.</p><p>${error.message}</p>`;
  }
}
async function fetchPlatformDetails(platformId) {
  const apiKey = "c289e0883f6244b38247a1df7d73faf8";
  const apiUrl = `https://api.rawg.io/api/platforms/${platformId}?key=${apiKey}`;

  try {
    console.log(`Fetching details for platform ID: ${platformId}`);

    const response = await fetch(apiUrl);

    // Handle 404 error
    if (response.status === 200) {
      console.error(
        "404 error: Platform not found. Redirecting to RAWG main page..."
      );
      window.location.href = "https://rawg.io"; // Redirect to RAWG main page
      return; // Exit the function after redirecting
    }

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const platform = await response.json();
    const detailsSection = document.querySelector(".platform-details");

    detailsSection.innerHTML = `
      <h2>${platform.name}</h2>
      <p>${platform.description || "No description available."}</p>
      <p><strong>Games Available:</strong> ${platform.games_count}</p>
    `;
    navigateTo("platform-details");
  } catch (error) {
    console.error("Error fetching platform details:", error);

    // Handle other non-404 errors
    const detailsSection = document.querySelector(".platform-details");
    detailsSection.innerHTML = `<p>Error loading platform details. Please try again later.</p>`;
  }
}

// Fetch platforms from RAWG API
async function fetchRawgPlatforms() {
  const apiKey = "c289e0883f6244b38247a1df7d73faf8";
  const apiUrl = `https://api.rawg.io/api/platforms?key=${apiKey}`;

  try {
    console.log("Fetching platforms...");

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    const platformsGrid = document.querySelector(".platforms-grid");

    if (data.results && data.results.length > 0) {
      platformsGrid.innerHTML = data.results
        .map((platform) => {
          const { name, games_count, id } = platform; // Use slug instead of id
          console.log(platform);
          return `
            <div class="platform-card">
              <h3>${name}</h3>
              <p>${games_count} games available</p>
              <a href="#" onclick="fetchPlatformDetails(${id}); return false;">Explore Platform</a>
            </div>`;
        })
        .join("");
    } else {
      platformsGrid.innerHTML = "<p>No platforms available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error fetching RAWG platforms:", error);
    const platformsGrid = document.querySelector(".platforms-grid");
    if (platformsGrid) {
      platformsGrid.innerHTML = `
        <p>Error loading platforms. Please try again later.</p>
        <p>${error.message}</p>`;
    }
  }
}

// Dynamic Guides Content
function loadGuidesContent() {
  const gameStrategy = document.querySelector(".game-strategy");
  const beginnerTips = document.querySelector(".beginner-tips");
  const advancedTechniques = document.querySelector(".advanced-techniques");

  gameStrategy.innerHTML =
    "<p>Strategies to master the toughest challenges.</p>";
  beginnerTips.innerHTML =
    "<p>Essential tips for beginners to get started.</p>";
  advancedTechniques.innerHTML =
    "<p>Advanced techniques for expert gamers.</p>";
}

// Dynamic Forums Content
function loadForumsContent() {
  const generalDiscussion = document.querySelector(".general-discussion");
  const gameRecommendations = document.querySelector(".game-recommendations");
  const troubleshooting = document.querySelector(".troubleshooting");
  const tipsTricks = document.querySelector(".tips-tricks");

  generalDiscussion.innerHTML =
    "<p>Discuss your favorite games and gaming news here.</p>";
  gameRecommendations.innerHTML =
    "<p>Find recommendations for games based on your taste.</p>";
  troubleshooting.innerHTML =
    "<p>Get help for your technical gaming issues.</p>";
  tipsTricks.innerHTML = "<p>Share and discover gaming tips and tricks.</p>";
}

// Navigation Handler
function navigateTo(page) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((p) => (p.style.display = "none")); // Hide all pages
  document.querySelector(`#${page}`).style.display = "block"; // Show the selected page

  console.log(page);

  // Clear specific content when navigating
  if (page === "home") {
    fetchFeaturedGames();
  } else if (page === "reviews") {
    fetchReviews();
  } else if (page === "news") {
    fetchGameSpotNews();
  } else if (page === "guides") {
    fetchGameSpotGuides();
  } else if (page === "forums") {
    fetchRawgPlatforms();
  } else if (page === "about") {
    const aboutSection = document.querySelector("#about .team-section");
    aboutSection.innerHTML = `
  <img src="imoleayo-ashaolu.jpg" alt="Imoleayo Ashaolu" class="team-photo">
  <p>Hi, I am Imoleayo Ashaolu, the creator of Game Hub. I am passionate about gaming and technology, and I created this platform to connect gamers worldwide.</p>
  `;
  } else if (page === "platform-details") {
    navigateTo("home");
  }
}

// Automatically load the home page on initial load
document.addEventListener("DOMContentLoaded", () => {
  navigateTo("home");
});

// Contact Form Handler
document
  .querySelector(".contact-page form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#contact-name").value;
    const email = document.querySelector("#contact-email").value;
    const message = document.querySelector("#contact-message").value;

    if (name && email && message) {
      console.log("Form submitted:", { name, email, message });
      alert("Thank you for contacting us! Your message has been received.");
    } else {
      alert("Please fill out all fields before submitting.");
    }
  });
