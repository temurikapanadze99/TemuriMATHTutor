// ===== JAYmath Tutoring — script.js =====

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Header scroll shadow
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    });
}

// Contact form — AJAX submission via Formspree (no page redirect)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Replace the entire contact section content with a confirmation
                const contactSection = document.getElementById('contact');
                const container = contactSection.querySelector('.container');
                container.innerHTML = `
                    <div class="confirmation-message">
                        <h3>You're all set! 🎉</h3>
                        <p>Your request has been received. We'll reach out within 24 hours to confirm your spot and answer any questions.</p>
                        <p class="signature">— Temuri (TJ) &nbsp;·&nbsp; JAYmath Tutoring</p>
                    </div>
                `;
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert('Oops! Something went wrong: ' + (errorData.error || 'Please try again or call us directly.'));
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }

        } catch (err) {
            alert('Network error. Please check your connection and try again, or call us at (929) 403-4048.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

console.log('JAYmath Tutoring site loaded.');