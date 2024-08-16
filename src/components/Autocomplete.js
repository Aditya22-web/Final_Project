import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import './Autocomplete.css';

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching players...');
        let allPlayers = [];
        let offset = 0;
        let hasMore = true;

        while (hasMore) {
          const response = await axios.get('https://api.cricapi.com/v1/players', {
            params: {
              apikey: 'a3ba538f-05f9-47d0-aa66-8d37c11cd6f3',
              offset: offset
            }
          });

          if (response.data && response.data.data) {
            const fetchedPlayers = response.data.data.map(player => player.name);
            allPlayers = [...allPlayers, ...fetchedPlayers];
            offset += response.data.data.length;
            hasMore = response.data.data.length === 50; // Assuming 50 is the max limit per page
          } else {
            console.log('No player data in response:', response.data);
            hasMore = false;
          }
        }

        setPlayers(allPlayers);
        console.log('Fetched players:', allPlayers);
      } catch (error) {
        console.error('Error fetching players:', error);
        setError('Failed to fetch players. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    console.log('Players state updated:', players);
  }, [players]);

  useEffect(() => {
    console.log('Suggestions state updated:', suggestions);
  }, [suggestions]);

const debouncedHandleInputChange = useCallback(
  debounce((value, currentPlayers) => {
    const filteredSuggestions = value.length > 0
      ? currentPlayers
          .filter(player => player.toLowerCase().includes(value.toLowerCase()))
          .sort((a, b) => a.localeCompare(b))
      : currentPlayers.slice(0, 50); // Show first 50 players when input is empty
    setSuggestions(filteredSuggestions);
    console.log('Filtered suggestions:', filteredSuggestions);
  }, 300),
  []
);

const handleInputChange = (event) => {
  const value = event.target.value;
  setInputValue(value);
  debouncedHandleInputChange(value, players);
};

  const handleSuggestionClick = (suggestion) => {
    console.log('Suggestion clicked:', suggestion);
    setInputValue(suggestion);
    setSuggestions([]);
  };

  if (isLoading) {
    return <div className="loading">Loading players...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const autocompleteJSX = (
    <div className="autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter player name"
      />
      {isLoading ? (
        <div className="loading">Loading suggestions...</div>
      ) : (
        <ul className={`suggestions ${(suggestions.length > 0 || inputValue !== '') ? 'suggestions-visible' : ''}`}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
          {inputValue !== '' && suggestions.length === 0 && (
            <li className="no-suggestions">No matching players found</li>
          )}
        </ul>
      )}
    </div>
  );

  return autocompleteJSX;
};

export default Autocomplete;
