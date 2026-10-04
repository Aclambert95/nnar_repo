document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[data-email-subject]');
    if (!form || typeof emailjs === 'undefined') return;

    emailjs.init({ publicKey: 'JCDGWkoTNJTEu0EKA' });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submitButton = form.querySelector('[type="submit"]');
        if (submitButton) submitButton.disabled = true;

        const values = new Map();
        for (const [name, value] of new FormData(form).entries()) {
            if (!values.has(name)) values.set(name, []);
            values.get(name).push(value);
        }

        const escapeHtml = (value) => String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        const rows = [...values.entries()].map(([name, entries]) => `
            <tr>
                <td style="padding:6px;border:1px solid #d9d9d9;max-width:220px;white-space:normal;word-break:break-word;">${escapeHtml(name)}</td>
                <td style="padding:6px;border:1px solid #d9d9d9;">${escapeHtml(entries.join(', '))}</td>
            </tr>
        `).join('');

        try {
            await emailjs.send('service_ehbvz1o', 'template_nm74ryb', {
                message: `
                    <h2>${escapeHtml(form.dataset.emailSubject)}</h2>
                    <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;">
                        <tbody>${rows}</tbody>
                    </table>
                `
            });
            form.reset();
            window.location.href = 'thank-you.html';
        } catch (error) {
            console.error('EmailJS error:', error);
            alert('There was a problem sending your form. Please try again.');
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
});