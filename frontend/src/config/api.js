const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

const API_CONFIG = {
  BASE_URL: cleanUrl,
  API_BASE: `${cleanUrl}/api`
};

export default API_CONFIG;