// Just for clarity, this file is responsible for updating the theme of the application based on the weather icon provided by OpenWeather API.
function update(icon) {
    if (!icon) return; // Check if icon is defined

    // openWeather icon format: "01d" (day) or "01n" (night)
    var isDay = icon.includes("d"); // OpenWeather icon format: "01d" (day) or "01n" (night)
    // change CSS variables based on day or night
    if (isDay) {
        // apply day theme
        document.documentElement.style.setProperty('--primary-bg-color', '#25b3f1'); // Light Sky Blue (for day)
        document.documentElement.style.setProperty('--secondary-bg-color', '#76d3fc'); // Light Sky Blue (for day)
    } else {
        // apply night theme
        document.documentElement.style.setProperty('--primary-bg-color', '#05161d'); // Dark Slate Gray (for night)
        document.documentElement.style.setProperty('--secondary-bg-color', '#172931'); // Gold (for night elements)
    }
}

export { update };