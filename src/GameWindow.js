import { React, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { GameDataContext } from './context/GameDataContext';
import ActionWindow from './components/ActionWindow';
import Inventory from './components/Inventory';

const GameWindow = () => {
  const [health, setHealth] = useState(10);
  const [dps, setDps] = useState(2);
  const [cells, setCells] = useState(0);
  const [maxHealth, setMaxHealth] = useState(health);
  const [level, setLevel] = useState(1);
  return (
    <Flex bg="whiteAlpha.700" h="95%" w="100%" flexWrap="wrap">
      <GameDataContext.Provider
        value={{
          health,
          setHealth,
          dps,
          setDps,
          cells,
          setCells,
          maxHealth,
          setMaxHealth,
          level,
          setLevel,
        }}
      >
        <ActionWindow />
        <Inventory />
      </GameDataContext.Provider>
    </Flex>
  );
};

export default GameWindow;
