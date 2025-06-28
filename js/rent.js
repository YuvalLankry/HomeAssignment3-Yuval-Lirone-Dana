//  ניהול תהליך השכרה של דירה אחת
/**
 * פונקציית עזר לבדיקת חפיפה בין שני טווחי תאריכים.
 * מחזירה true אם יש חפיפה, false אם אין.
 * @param {string} start1 - תאריך התחלה של הטווח הראשון (בפורמט 'YYYY-MM-DD')
 * @param {string} end1 - תאריך סיום של הטווח הראשון (בפורמט 'YYYY-MM-DD')
 * @param {string} start2 - תאריך התחלה של הטווח השני (בפורמט 'YYYY-MM-DD')
 * @param {string} end2 - תאריך סיום של הטווח השני (בפורמט 'YYYY-MM-DD')
 * @returns {boolean} - האם יש חפיפה בין הטווחים
 */
function isDateRangeOverlap(start1, end1, start2, end2) {
  return !(end1 < start2 || start1 > end2);
}

/**
 * בודק האם הטווח שהתבקש פנוי להשכרה בדירה מסוימת.
 * יש לממש את החלק של קריאת ההזמנות ב-localStorage והבדיקה בעזרת isDateRangeOverlap.
 * @param {string} listingId - מזהה הדירה
 * @param {string} startDate - תאריך התחלה שנבחר להשכרה
 * @param {string} endDate - תאריך סיום שנבחר להשכרה
 * @returns {boolean} - true אם הזמנים פנויים, false אם יש חפיפה
 */
function checkAvailability(listingId, startDate, endDate) {
  // TODO: לולאה על כל מפתחות ה-localStorage של המשתמשים
  // רמז - key.endsWith('_bookings')
  //      - קריאה לנתוני ההזמנות שלהם
  //      - חיפוש הזמנות עם listingId זה
  //      - שימוש ב-isDateRangeOverlap להשוואה בין טווחים
  // להחזיר false אם יש חפיפה, true אם פנוי
}


    const listingId = localStorage.getItem('selected_listing_id');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    function isDateRangeOverlap(start1, end1, start2, end2) {
      return !(new Date(end1) < new Date(start2) || new Date(start1) > new Date(end2));
    }

    function renderListingDetails() {
      const listing = amsterdam.find(l => l.listing_id === listingId);
      if (!listing) {
        document.getElementById('details').textContent = 'Listing not found.';
        return;
      }
      document.getElementById('details').innerHTML = `
        <h3>${listing.name}</h3>
        <img src="${listing.picture_url}" alt="${listing.name}" width="200"/><br/>
        <p><strong>Description:</strong> ${listing.description}</p>
        <p><strong>Price:</strong> ${listing.price}</p>
        <p><strong>Neighborhood:</strong> ${listing.neighbourhood}</p>
      `;
    }

    function bookListing() {
      const start = document.getElementById("startDate").value;
      const end = document.getElementById("endDate").value;
      if (!start || !end) return alert("Please select valid dates.");

      const allBookings = Object.keys(localStorage)
        .filter(k => k.endsWith("_bookings"))
        .flatMap(k => JSON.parse(localStorage.getItem(k)))
        .filter(b => b.listingId === listingId);

      const conflict = allBookings.some(b => isDateRangeOverlap(start, end, b.startDate, b.endDate));

      const statusDiv = document.getElementById("bookingStatus");

      if (conflict) {
        statusDiv.textContent = "⚠️ Selected dates are unavailable.";
        statusDiv.style.color = "red";
      } else {
        const newBooking = { listingId, startDate: start, endDate: end };
        const key = `${currentUser.username}_bookings`;
        const userBookings = JSON.parse(localStorage.getItem(key)) || [];
        userBookings.push(newBooking);
        localStorage.setItem(key, JSON.stringify(userBookings));

        statusDiv.textContent = "✅ Booking confirmed!";
        statusDiv.style.color = "green";
      }
    }

    renderListingDetails();