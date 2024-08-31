document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const trackingForm = document.getElementById('trackingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Handle booking form submission
            alert('Booking form submitted!');
        });
    }

    if (trackingForm) {
        trackingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Handle tracking form submission
            alert('Tracking form submitted!');
        });
    }
});
