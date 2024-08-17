import React, { useState } from 'react';
import { Input, Box, List, ListItem } from '@chakra-ui/react';
import { getAutocompleteSuggestions } from '../services/api';

const PlayerInput = ({ index, setPlayerName }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchSuggestions = async (value) => {
    if (value.length > 2) {
      try {
        const playerSuggestions = await getAutocompleteSuggestions(value);
        setSuggestions(playerSuggestions);
      } catch (error) {
        console.error('Error fetching player suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setPlayerName(index, suggestion);
    setSuggestions([]);
  };

  return (
    <Box>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Player ${index + 1}`}
      />
      {suggestions.length > 0 && (
        <List spacing={1}>
          {suggestions.map((suggestion, idx) => (
            <ListItem
              key={idx}
              onClick={() => handleSuggestionClick(suggestion)}
              cursor="pointer"
              _hover={{ backgroundColor: 'gray.200' }}
            >
              {suggestion}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default PlayerInput;
