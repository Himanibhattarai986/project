document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Theme Switching based on Local Time
    const checkAndSetTheme = () => {
        const now = new Date();
        const hour = now.getHours(); 
        const isLightMode = hour >= 6 && hour < 18;

        if (isLightMode) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    };

    checkAndSetTheme();

    setInterval(checkAndSetTheme, 60000);

    document.getElementById('current-year').textContent = new Date().getFullYear();
    const setRotation = (element, rotationRatio) => {
        
        element.style.transform = `translateX(-50%) rotate(${rotationRatio * 360}deg)`;
    };

    const updateClocks = () => {

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

        const localAmPm = localHours >= 12 ? 'PM' : 'AM';
        const localHour12 = localHours % 12 || 12;
        const localMinStr = localMins.toString().padStart(2, '0');
        document.getElementById('local-time-label').textContent = `${localHour12}:${localMinStr} ${localAmPm}`;

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

        const nepalAmPm = nepalHours >= 12 ? 'PM' : 'AM';
        const nepalHour12 = nepalHours % 12 || 12;
        const nepalMinStr = nepalMins.toString().padStart(2, '0');
        document.getElementById('nepal-time-label').textContent = `${nepalHour12}:${nepalMinStr} ${nepalAmPm}`;
    };
  updateClocks();
    setInterval(updateClocks, 1000);
});
