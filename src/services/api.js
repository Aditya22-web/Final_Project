import axios from 'axios';

const API_KEY = 'a3ba538f-05f9-47d0-aa66-8d37c11cd6f3';
const BASE_URL = 'https://api.cricapi.com/v1/players';

export const getAutocompleteSuggestions = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        search: query,
        offset: 0
      }
    });
    if (response.data && response.data.data) {
      return response.data.data.map(player => player.name);
    }
    return [];
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return [];
  }
};
