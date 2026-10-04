function formatPhoneInput(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10);

    if (digits.length <= 3) {
        return digits;
    }

    if (digits.length <= 6) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }

    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const phoneInputs = document.querySelectorAll('input[data-phone-format="true"]');

phoneInputs.forEach((input) => {
    input.addEventListener('input', () => {
        input.value = formatPhoneInput(input.value);
    });
});

const yesNoCheckboxPairs = [
    { hidden: document.querySelector('input[type="hidden"][name="Vaccine Status"]'), checkbox: document.getElementById('vaccine-status') },
    { hidden: document.querySelector('input[type="hidden"][name="Spay/Neuter Status"]'), checkbox: document.getElementById('spay-neuter') }
];

yesNoCheckboxPairs.forEach(({ hidden, checkbox }) => {
    if (!hidden || !checkbox) {
        return;
    }

    const syncYesNoValue = () => {
        hidden.value = checkbox.checked ? 'Yes' : 'No';
    };

    syncYesNoValue();
    checkbox.addEventListener('change', syncYesNoValue);
});

const header = document.querySelector('header');
const nav = document.querySelector('special-nav');

if (header && nav && !document.body.classList.contains('home-page')) {
    document.body.classList.add('has-fixed-header');
    header.classList.add('fixed-header');
    nav.classList.add('fixed-nav');

    const updateHeaderHeights = () => {
        const headerHeight = header.offsetHeight || 240;
        const navHeight = nav.offsetHeight || 60;

        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
        nav.style.top = `${headerHeight}px`;
    };

    updateHeaderHeights();
    window.addEventListener('resize', updateHeaderHeights);

    const updateScrollVisibility = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const topThreshold = maxScroll > 0 ? maxScroll * 0.03 : 0;
        const currentScrollY = window.scrollY;
        const shouldHide = currentScrollY > topThreshold;

        header.classList.toggle('header-hidden', shouldHide);
        nav.classList.toggle('nav-hidden', shouldHide);
    };

    updateScrollVisibility();
    window.addEventListener('scroll', updateScrollVisibility, { passive: true });
} else if (header && nav) {
    document.body.classList.remove('has-fixed-header');
    header.classList.remove('fixed-header', 'header-hidden');
    nav.classList.remove('fixed-nav', 'nav-hidden');
    nav.style.top = '';
}

const canvas = document.getElementById('form-bg');

if (canvas) {
    const ctx = canvas.getContext('2d');
    const backgroundImage = new Image();
    backgroundImage.src = 'assets/images/form_bkgrd.png';

    function resizeCanvasBackground() {
        const dpr = window.devicePixelRatio || 1;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        canvas.width = Math.max(1, Math.round(viewportWidth * dpr));
        canvas.height = Math.max(1, Math.round(viewportHeight * dpr));
        canvas.style.width = `${viewportWidth}px`;
        canvas.style.height = `${viewportHeight}px`;

        if (backgroundImage.complete && backgroundImage.width > 0 && backgroundImage.height > 0) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(dpr, dpr);

            const imgRatio = backgroundImage.width / backgroundImage.height;
            const canvasRatio = viewportWidth / viewportHeight;
            let drawWidth;
            let drawHeight;
            let offsetX = 0;
            let offsetY = 0;

            if (imgRatio > canvasRatio) {
                drawHeight = viewportHeight;
                drawWidth = drawHeight * imgRatio;
                offsetX = (viewportWidth - drawWidth) / 2;
            } else {
                drawWidth = viewportWidth;
                drawHeight = drawWidth / imgRatio;
                offsetY = (viewportHeight - drawHeight) / 2;
            }

            ctx.drawImage(backgroundImage, offsetX, offsetY, drawWidth, drawHeight);
        }
    }

    backgroundImage.addEventListener('load', resizeCanvasBackground);
    window.addEventListener('resize', resizeCanvasBackground);
    resizeCanvasBackground();
}
