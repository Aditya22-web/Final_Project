import React from 'react';
import { Box, List, ListItem } from '@chakra-ui/react';

const PlayerList = ({ players }) => {
  return (
    <Box>
      <List spacing={2}>
        {players.map((player, index) => (
          <ListItem key={index}>
            {player.name} {player.isCaptain ? '(Captain)' : player.isViceCaptain ? '(Vice-Captain)' : ''}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PlayerList;
