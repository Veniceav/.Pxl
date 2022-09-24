import React, { useContext, useState } from 'react';
import Inventory from '../Inventory';
import { Flex, Box, text, VStack } from '@chakra-ui/react';
import { GameDataContext } from '../../context/GameDataContext';
import SpAtkContainer from './components/SpAtkContainer';
import PlayerHitBox from './components/PlayerHitBox';
import TargetHitBox from './components/TargetHitBox';

const MobileView = () => {
  const [params, setParam, setParams] = useContext(GameDataContext);
  return (
    <VStack className="main">
      <SpAtkContainer />
      <Flex className="character-space" w="100%" h="50%" p="10px 10px">
        <PlayerHitBox />
        <TargetHitBox />
      </Flex>
      <Inventory />
    </VStack>
  );
};

export default MobileView;
