const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

const API_CONFIG = {
  BASE_URL: cleanUrl,
  API_BASE: `${cleanUrl}/api`
};

console.log('API Configuration:', API_CONFIG);
console.log('Base URL:', API_CONFIG.BASE_URL);
console.log('API Base:', API_CONFIG.API_BASE);

export default API_CONFIG;