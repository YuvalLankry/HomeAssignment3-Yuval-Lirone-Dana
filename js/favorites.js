// ניהול מועדפים לפי currentUser
document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("currentUser");
  const favoritesKey = `${username}_favorites`;

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  return null;
};

 let favID  =  getQueryVariable("listingId");

 if (favID != null)
 {
  
      let userFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
      let found = false;
      for(var i = 0; i < userFavorites.length; i++)
      {
        if(favID = userFavorites[i])
        {found = true;
          break;
        }


      }
      if(!found ){
      userFavorites.push(favID);
      localStorage.setItem(favoritesKey, JSON.stringify(userFavorites));}

 }

  const favoritesList = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  const container = document.createElement("div");
  container.id = "favoritesContainer";

  const title = document.createElement("h1");
  title.textContent = "Your Favorites";
  container.appendChild(title);

  if (favoritesList.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No favorites found.";
    container.appendChild(emptyMsg);
  } else {
    // List section
    const list = document.createElement("ul");
    favoritesList.forEach((fav, i) => {
      const item = document.createElement("li");
      item.textContent = `Favorite ${i + 1}: ${fav}`;
      list.appendChild(item);
    });
    container.appendChild(list);

    // Dropdown section
    const select = document.createElement("select");
    select.id = "favoriteSelect";
    favoritesList.forEach((fav, i) => {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = fav;
      select.appendChild(option);
    });
    container.appendChild(select);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Selected Favorite";
    deleteBtn.onclick = () => {
      const index = parseInt(select.id);
      favoritesList.splice(index, 1);
      localStorage.setItem(favoritesKey, JSON.stringify(favoritesList));
      location.reload(); // refresh to update UI
    };
    container.appendChild(deleteBtn);
  }

  document.body.appendChild(container);
});


