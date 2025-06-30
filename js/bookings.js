document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("currentUser");
  const bookingsKey = `${username}_bookings`;
  const bookingListDiv = document.getElementById("bookingList");

  if (!username || !localStorage.getItem(bookingsKey)) {
    bookingListDiv.textContent = "No bookings found.";
    return;
  }
  const allBookings = Object.keys(localStorage)
  .filter(k => k.endsWith(bookingsKey))


  const now = new Date();
  const futureBookings = [];

  const list = document.createElement("ul");
  allBookings.forEach((booking, index) => {
    const bookingDate = new Date(booking.date); // assume booking.date is ISO string
    const isFuture = bookingDate > now;

    const listItem = document.createElement("li");
    listItem.textContent = `Booking ${index + 1}: ${booking.listingName} on ${booking.date} - ${isFuture ? "Future" : "Past"}`;
    list.appendChild(listItem);

    if (isFuture) {
      futureBookings.push({ index, ...booking });
    }
  });
  bookingListDiv.appendChild(list);

  // Dropdown for future bookings
  if (futureBookings.length > 0) {
    const select = document.createElement("select");
    select.id = "bookingSelect";

    futureBookings.forEach((booking, idx) => {
      const option = document.createElement("option");
      option.value = booking.index;
      option.textContent = `Booking ${booking.index + 1}: ${booking.listingName} on ${booking.date}`;
      select.appendChild(option);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Selected Future Booking";
    deleteBtn.onclick = () => {
      const selectedIndex = parseInt(select.value);
      bookings.splice(selectedIndex, 1);
      localStorage.setItem(bookingsKey, JSON.stringify(bookings));
      location.reload(); // Refresh the page to reflect the changes
    };

    bookingListDiv.appendChild(document.createElement("hr"));
    bookingListDiv.appendChild(select);
    bookingListDiv.appendChild(deleteBtn);
  } else {
    const noFutureMsg = document.createElement("p");
    noFutureMsg.textContent = "No future bookings available to delete.";
    bookingListDiv.appendChild(noFutureMsg);
  }
});
