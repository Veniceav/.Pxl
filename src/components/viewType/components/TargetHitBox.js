import React, { useEffect, useState, useContext } from 'react';
import { GameDataContext } from '../../../context/GameDataContext';
import { Flex, CircularProgress, Box } from '@chakra-ui/react';
import EnemyIdleAnimation from '../../../lib/animations/enemyIdleAnimation';

const TargetHitBox = props => {
  const [params, setParam, setParams] = useContext(GameDataContext);

  return (
    <Flex
      fontSize="xl"
      direction="column"
      h="100%"
      minW="100px"
      color="whiteAlpha.900"
      align="center"
    >
      <Flex className="charInfo" direction="column" align="center">
        <Flex align="center">
          <CircularProgress
            thickness="5px"
            size="55px"
            value={params.enemyActionBar}
            color="game.retroRed"
          />
          <Flex direction="column">
            <Box className="enemyLevel" margin="0 5px">
              Lvl. {props.level}
            </Box>
            <Box className="enemyDamage" margin="0 5px">
              Atk: {props.enemyDamage}
            </Box>
          </Flex>
        </Flex>

        <Box className="hpNum">
          {props.health}/{props.maxHealth}
        </Box>
      </Flex>

      <Flex className="target" h="100%" w="100%">
        <Flex
          display="block"
          w="150px"
          onClick={props.click}
          cursor="crosshair"
        >
          <EnemyIdleAnimation />
        </Flex>
      </Flex>
    </Flex>
  );
};
export default TargetHitBox;
