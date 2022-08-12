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

  const [params, setParams] = useState({
    cells: 0,
    dps: 2,
    health: 10,
    level: 1,
    maxHealth: 10,
  });

  const setProp = (prop, value) => {
    setParams(p => ({
      ...p,
      [prop]: value,
    }));
  };

  return (
    <Flex bgColor="#111" h="95%" w="100%" flexWrap="wrap">
      <GameDataContext.Provider
        value={[params, setProp, setParams]}
        // value={{
        //   health,
        //   setHealth,
        //   dps,
        //   setDps,
        //   cells,
        //   setCells,
        //   maxHealth,
        //   setMaxHealth,
        //   level,
        //   setLevel,
        // }}
      >
        <ActionWindow />
        <Inventory />
      </GameDataContext.Provider>
    </Flex>
  );
};

export default GameWindow;
