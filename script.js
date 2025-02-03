document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-unit');
    const temperature = document.getElementById('temperature');
    const realFeel = document.getElementById('real-feel');
    const overcast = document.getElementById('overcast');
    const forecastItems = document.querySelectorAll('.forecast-item');
    const dailyItems = document.querySelectorAll('.daily-item');

    let isFahrenheit = true;

    function convertTemperature(temp, toCelsius) {
        return toCelsius ? Math.round((temp - 32) * 5/9) : Math.round((temp * 9/5) + 32);
    }

    function toggleTemperature() {
        const toCelsius = isFahrenheit;

        let currentTemp = parseInt(temperature.textContent);
        temperature.textContent = `${convertTemperature(currentTemp, toCelsius)}°${toCelsius ? 'C' : 'F'}`;

        let realFeelTemp = parseInt(realFeel.textContent.match(/\d+/)[0]);
        realFeel.textContent = `Real Feel: ${convertTemperature(realFeelTemp, toCelsius)}°${toCelsius ? 'C' : 'F'}`;

        let overcastTemps = overcast.textContent.match(/\d+/g);
        if (overcastTemps) {
            overcast.textContent = `Overcast: ${convertTemperature(parseInt(overcastTemps[0]), toCelsius)}°${toCelsius ? 'C' : 'F'} / ${convertTemperature(parseInt(overcastTemps[1]), toCelsius)}°${toCelsius ? 'C' : 'F'}`;
        }

        forecastItems.forEach(item => {
            let tempDiv = item.children[2];
            let realFeelDiv = item.querySelector('#real_feel');

            let temp = parseInt(tempDiv.textContent);
            tempDiv.textContent = `${convertTemperature(temp, toCelsius)}°${toCelsius ? 'C' : 'F'}`;

            if (realFeelDiv) {
                let rfTemp = parseInt(realFeelDiv.textContent.match(/\d+/)[0]);
                realFeelDiv.textContent = `RF: ${convertTemperature(rfTemp, toCelsius)}°${toCelsius ? 'C' : 'F'}`;
            }
        });

        dailyItems.forEach(item => {
            let tempRange = item.children[3];
            let temps = tempRange.textContent.match(/\d+/g);
            if (temps) {
                tempRange.textContent = `${convertTemperature(parseInt(temps[0]), toCelsius)}°${toCelsius ? 'C' : 'F'}/${convertTemperature(parseInt(temps[1]), toCelsius)}°${toCelsius ? 'C' : 'F'}`;
            }
        });

        isFahrenheit = !isFahrenheit;
    }

    toggleButton.addEventListener('click', toggleTemperature);
});
