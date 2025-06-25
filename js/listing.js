// שליפת דירות, סינון, חיפוש
const App = {
  apartments: [],

  init() {
    this.apartments = window.amsterdam || [];
    this.cacheDOM();
    this.bindEvents();
    this.loadUser();
    this.render(this.apartments);
  },

  cacheDOM() {
    this.listingSection = document.getElementById("listing-grid");
    this.filterBtn = document.getElementById("filterBtn");
    this.clearBtn = document.getElementById("clearFiltersBtn");
    this.minP = document.getElementById("minPrice");
    this.maxP = document.getElementById("maxPrice");
    this.minR = document.getElementById("minRating");
    this.numRoomsSelect = document.getElementById("numRooms");
    this.hamburger = document.getElementById("hamburger");
    this.navbar = document.querySelector(".navbar");
    this.darkModeBtn = document.getElementById("darkToggle") || document.getElementById("darkToggleMobile");
    this.resultsCount = document.getElementById("resultsCount");
  },

  bindEvents() {
    if (this.filterBtn) {
      this.filterBtn.addEventListener("click", () => this.applyFilters());
    }
    if (this.clearBtn) {
      this.clearBtn.addEventListener("click", () => this.clearFilters());
    }
    if (this.hamburger) {
      this.hamburger.addEventListener("click", () => this.navbar.classList.toggle("active"));
    }
    const darkModeBtn = document.getElementById("darkToggle");
    const darkModeMobile = document.getElementById("darkToggleMobile");

   if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => document.body.classList.toggle("dark-mode"));
  }

  if (darkModeMobile) {
    darkModeMobile.addEventListener("click", () => document.body.classList.toggle("dark-mode"));
  }
  },

  loadUser() {
    const user = localStorage.getItem("currentUser");
    if (user) {
      document.getElementById("userNameDisplay").textContent = user;
    }
  },

  applyFilters() {
    const minRating = parseFloat(this.minR.value) || 0;
    const minPrice = parseFloat(this.minP.value) || 0;
    const maxPrice = parseFloat(this.maxP.value) || Infinity;

    const selectedRoomValue = this.numRoomsSelect.value;
    const selectedRoom = selectedRoomValue ? parseInt(selectedRoomValue) : null;

    const filtered = this.apartments.filter(a => {
      const price = parseFloat(a.price.replace(/[^\d.]/g, "")) || 0;
      const rating = parseFloat(a.rating || a.review_scores_rating) || 0;
      const rooms = parseInt(a.bedrooms) || 0;

      const okPrice = price >= minPrice && price <= maxPrice;
      const okRating = rating >= minRating;
      const okRooms = selectedRoom === null || rooms === selectedRoom;

      return okPrice && okRating && okRooms;
    });

    this.render(filtered);
  },

  render(list) {
    this.resultsCount.textContent = list.length ? `Found ${list.length} apartments` : "No apartments match your filters.";
    this.listingSection.innerHTML = "";

    list.forEach(a => {
      const card = document.createElement("div");
      card.className = "apartment-card";
      card.innerHTML = `
        <img src="${a.picture_url}" alt="${a.name}" />
        <h3>${a.name}</h3>
        <p>${a.description.slice(0,100)}${a.description.length>100 ? '...' : ''}</p>
        <p><strong>ID:</strong> ${a.listing_id}</p>
        <p>Price: ${a.price} | Rating: ${a.rating || a.review_scores_rating}</p>
        <a href="${a.listing_url}" target="_blank">View Listing</a>
        <div class="card-btn"> 
        <button class="favorite-btn">Favorite</button>
        <button onclick="location.href='rent.html?listingId=${a.listing_id}'">Rent</button>
        </div>
      `;
      this.listingSection.appendChild(card);
    });
  },

  clearFilters() {
    this.minP.value = "";
    this.maxP.value = "";
    this.minR.value = "";
    this.numRoomsSelect.value = "";
    this.render(this.apartments);
  },
};

window.addEventListener("DOMContentLoaded", () => App.init());
