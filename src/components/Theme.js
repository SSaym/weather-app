// just for clarity, this file is responsible for updating the theme of the application based on the weather icon provided by OpenWeather API.
function update(icon) {
    if (!icon) return; // check if icon is defined

    // open weather icon format: "01d" (day) or "01n" (night)
    var isDay = icon.includes("d"); // OpenWeather icon format: "01d" (day) or "01n" (night)
    // change index.css  root variables based on day or night
    if (isDay) {
        // apply day theme
        document.documentElement.style.setProperty('--primary-bg-color', '#25b3f1');
        document.documentElement.style.setProperty('--secondary-bg-color', '#76d3fc');
    } else {
        // apply night theme
        document.documentElement.style.setProperty('--primary-bg-color', '#05161d');
        document.documentElement.style.setProperty('--secondary-bg-color', '#172931');
    }
}

export { update };