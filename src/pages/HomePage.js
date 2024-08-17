import React, { useState } from 'react';
import { Box, Button, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import PlayerInput from '../components/PlayerInput';
import PitchReport from '../components/PitchReport';
import PlayerList from '../components/PlayerList';

const HomePage = () => {
  const [players, setPlayers] = useState(Array(22).fill({ name: '', isCaptain: false, isViceCaptain: false }));
  const [pitchReport, setPitchReport] = useState('');
  const toast = useToast();

  const setPlayerName = (index, name) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], name };
    setPlayers(updatedPlayers);
  };

  const handleSubmit = () => {
    if (players.some(player => !player.name)) {
      toast({
        title: "Incomplete player list",
        description: "Please enter names for all 22 players.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!pitchReport.trim()) {
      toast({
        title: "Missing pitch report",
        description: "Please provide a pitch report.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Logic for selecting best 11 players, captain, and vice-captain
    console.log('Submitted players:', players);
    console.log('Pitch report:', pitchReport);

    toast({
      title: "Team submitted",
      description: "Your team has been successfully submitted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Cricket Team Selector
        </Heading>
        <Heading as="h2" size="md">
          Select 22 Players
        </Heading>
        <VStack spacing={4}>
          {players.map((_, index) => (
            <PlayerInput key={index} index={index} setPlayerName={setPlayerName} />
          ))}
        </VStack>
        <Heading as="h2" size="md">
          Pitch Report
        </Heading>
        <PitchReport pitchReport={pitchReport} setPitchReport={setPitchReport} />
        <Button colorScheme="teal" size="lg" onClick={handleSubmit}>
          Submit
        </Button>
        <Heading as="h2" size="md">
          Selected Players
        </Heading>
        <PlayerList players={players} />
      </VStack>
    </Box>
  );
};

export default HomePage;
