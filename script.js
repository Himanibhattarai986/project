document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Theme Switching based on Local Time
    const checkAndSetTheme = () => {
        const now = new Date();
        const hour = now.getHours(); // 0 to 23

        // Light mode: 6am to 5:59pm (6 to 17)
        // Dark mode: 6pm to 5:59am (18 to 23, and 0 to 5)
        const isLightMode = hour >= 6 && hour < 18;

        if (isLightMode) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    };

    // Run theme check immediately
    checkAndSetTheme();
    // Re-check theme every minute
    setInterval(checkAndSetTheme, 60000);

    // 2. Footer Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 3. Analogue Clocks Logic
    const setRotation = (element, rotationRatio) => {
        // rotationRatio is 0 to 1. We multiply by 360 to get degrees.
        // We use translateX(-50%) to keep it centered horizontally.
        element.style.transform = `translateX(-50%) rotate(${rotationRatio * 360}deg)`;
    };

    const updateClocks = () => {
        // --- Local Time ---
        const localNow = new Date();
        const localSecs = localNow.getSeconds();
        const localMins = localNow.getMinutes();
        const localHours = localNow.getHours();

        const localSecRatio = localSecs / 60;
        const localMinRatio = (localSecRatio + localMins) / 60;
        const localHourRatio = (localMinRatio + localHours) / 12;

        setRotation(document.getElementById('local-sec'), localSecRatio);
        setRotation(document.getElementById('local-min'), localMinRatio);
        setRotation(document.getElementById('local-hour'), localHourRatio);

        // Format label
        const localAmPm = localHours >= 12 ? 'PM' : 'AM';
        const localHour12 = localHours % 12 || 12;
        const localMinStr = localMins.toString().padStart(2, '0');
        document.getElementById('local-time-label').textContent = `${localHour12}:${localMinStr} ${localAmPm}`;

        // --- Nepal Time ---
        // Get Nepal time by formatting date with correct timezone
        const nepalDateString = new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });
        const nepalNow = new Date(nepalDateString);

        const nepalSecs = nepalNow.getSeconds();
        const nepalMins = nepalNow.getMinutes();
        const nepalHours = nepalNow.getHours();

        const nepalSecRatio = nepalSecs / 60;
        const nepalMinRatio = (nepalSecRatio + nepalMins) / 60;
        const nepalHourRatio = (nepalMinRatio + nepalHours) / 12;

        setRotation(document.getElementById('nepal-sec'), nepalSecRatio);
        setRotation(document.getElementById('nepal-min'), nepalMinRatio);
        setRotation(document.getElementById('nepal-hour'), nepalHourRatio);

        // Format label
        const nepalAmPm = nepalHours >= 12 ? 'PM' : 'AM';
        const nepalHour12 = nepalHours % 12 || 12;
        const nepalMinStr = nepalMins.toString().padStart(2, '0');
        document.getElementById('nepal-time-label').textContent = `${nepalHour12}:${nepalMinStr} ${nepalAmPm}`;
    };

    // Update clocks immediately and then every second
    updateClocks();
    setInterval(updateClocks, 1000);
});
