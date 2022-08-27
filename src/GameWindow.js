import { React, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { GameDataContext } from './context/GameDataContext';
import ActionWindow from './components/ActionWindow';
import Inventory from './components/Inventory';

const GameWindow = () => {
  const [params, setParams] = useState({
    cells: 0,
    dps: 2,
    currentEnemyHp: 1,
    enemyLevel: 3,
    enemyHp: 1,
    enemyDamage: 1,
    enemyActionBar: 0,
    enemyBarBase: 1,
    playerActionBar: 0,
    playerBarBase: 2,
    playerLevel: 1,
    playerHp: 10,
    playerCurrentHp: 10,
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
