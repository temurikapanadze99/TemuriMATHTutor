// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Handle contact form submission via AJAX (no redirect)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Stop default form submission (prevents redirect)

        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success: hide the form and show a custom message
                const contactSection = document.getElementById('contact');
                const container = form.closest('.container');

                // Create confirmation message
                const confirmationDiv = document.createElement('div');
                confirmationDiv.className = 'confirmation-message';
                confirmationDiv.innerHTML = `
                    <h3>Thank you!</h3>
                    <p>Your request has been sent. We will get back to you within 24 hours.</p>
                    <p class="signature">— Temuri Kapanadze (TJ)</p>
                `;

                // Replace form with confirmation
                form.style.display = 'none';
                container.appendChild(confirmationDiv);
            } else {
                // Handle error
                const errorData = await response.json();
                alert('Oops! Something went wrong: ' + (errorData.error || 'Please try again later.'));
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        } catch (error) {
            alert('Network error. Please check your connection and try again.');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

console.log("Temuri MATH Tutor site loaded");