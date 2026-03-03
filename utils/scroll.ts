export const smoothScrollTo = (targetId: string, offset: number = 80) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // 1. Initial trigger to get things started (wakes up lazy loaders)
    let elementPosition = targetElement.getBoundingClientRect().top;
    let offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    // 2. The Polling "Chaser" Mechanism
    // React.lazy(), images loading, and Framer Motion cause severe layout shifts 
    // during the initial scroll down a long page.
    // We check the element's position relative to viewport repeatedly while scrolling 
    // and correct the trajectory if the layout shifted.

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const maxAttempts = 15; // Cap at 15 attempts (~1.5 seconds) to avoid infinite loops
    let attempts = 0;

    const checkAndAdjustScroll = () => {
        attempts++;

        // Get the *current* distance of the target from the top of the viewport
        const currentRectTop = targetElement.getBoundingClientRect().top;

        // If the element is not within our acceptable offset range (+/- 5px tolerance)
        // AND we haven't hit the bottom of the page
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

        if (Math.abs(currentRectTop - offset) > 5 && !isAtBottom && attempts < maxAttempts) {
            // The layout shifted! Recalculate target and scroll again
            const newOffsetPosition = currentRectTop + window.scrollY - offset;

            // Auto behavior makes it instantly correct course without stuttering the smooth animation
            window.scrollTo({
                top: newOffsetPosition,
                behavior: 'auto'
            });

            scrollTimeout = setTimeout(checkAndAdjustScroll, 100);
        }
    };

    // Start polling shortly after the initial smooth scroll begins
    scrollTimeout = setTimeout(checkAndAdjustScroll, 200);

    // Optional Cleanup if the user manually interrupts the scroll 
    const handleWheel = () => {
        clearTimeout(scrollTimeout);
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleWheel);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleWheel, { passive: true });
};
