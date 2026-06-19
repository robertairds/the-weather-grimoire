import { getCoordinates, getWeather } from './api.js';

// Seleção de elementos do HTML
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const resCityName = document.getElementById('res-city-name');
const resTemperature = document.getElementById('res-temperature');

// Seleção dos elementos do Almanaque Expandido
const resWind = document.getElementById('res-wind');
const resHumidity = document.getElementById('res-humidity');
const resUV = document.getElementById('res-uv');

// Função principal de busca
async function handleSearch() {
    const cityName = cityInput.value.trim();
    
    if (!cityName) return;

    try {
        // Exibe a tela em estado de carregamento
        weatherResult.classList.remove('hidden');
        resCityName.textContent = "Invocando dados...";
        resTemperature.textContent = "--";
        resWind.textContent = "Consultando arquivos...";
        resHumidity.textContent = "";
        resUV.textContent = "";

        // 1. Busca as coordenadas reais da cidade
        const cityData = await getCoordinates(cityName);
        const { latitude, longitude, name, country } = cityData;

        // 2. Busca o clima unificado baseado nas coordenadas
        const weather = await getWeather(latitude, longitude);
        
        // 3. Atualiza os componentes da tela com as respostas exatas da API moderna
        resCityName.textContent = `${name}, ${country}`;
        resTemperature.textContent = Math.round(weather.temperature_2m);
        
        // Renderiza os dados direto do objeto unificado
        resWind.textContent = `Vento gélido: ${weather.wind_speed_10m} km/h`;
        resHumidity.textContent = `Humidade do Ar: ${weather.relative_humidity_2m}%`;
        resUV.textContent = `Radiação Astral (UV): ${weather.uv_index}`;

    } catch (error) {
        resCityName.textContent = "Erro no Oráculo";
        resTemperature.textContent = "??";
        resWind.textContent = error.message || "Tente novamente.";
        resHumidity.textContent = "";
        resUV.textContent = "";
    }
}

// Eventos de gatilho de busca
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});