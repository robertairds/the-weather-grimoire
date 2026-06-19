// Função para buscar as coordenadas de uma cidade pelo nome
async function getCoordinates(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=pt&format=json`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
        throw new Error("Localidade não encontrada nos mapas antigos.");
    }
    
    return data.results[0]; 
}

// Função corrigida para buscar os dados meteorológicos unificados
async function getWeather(lat, lon) {
    // Usamos apenas o formato "current" moderno para evitar qualquer conflito de dados
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.current) {
        throw new Error("Os céus não responderam com os dados completos.");
    }
    
    return data.current;
}

export { getCoordinates, getWeather };