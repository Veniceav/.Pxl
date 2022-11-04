import React, { useContext } from 'react';
import { Flex, CircularProgress, Box } from '@chakra-ui/react';
import { GameDataContext } from '../../../context/GameDataContext';
import PlayerAnimation from '../../../lib/animations/PlayerAnimation';

const PlayerHitBox = props => {
  const [params, setParam, setParams] = useContext(GameDataContext);

  return (
    <Flex
      fontSize="xl"
      direction="column"
      h="100%"
      color="whiteAlpha.900"
      align="center"
    >
      <Flex className="charInfo" direction="column" align="center">
        <Flex align="center">
          <CircularProgress
            thickness="5px"
            size="55px"
            value={params.playerActionBar}
            color="game.retroPurple"
            filter={
              params.playerActionBar < 100 ? 'contrast(50%)' : 'contrast(100%)'
            }
          />
          <Flex direction="column">
            <Box className="enemyLevel" margin="0 5px">
              Lvl. {props.playerLevel}
            </Box>
            <Box className="enemyDamage" margin="0 5px">
              Atk: {props.dps}
            </Box>
          </Flex>
        </Flex>

        <Box className="hpNum">
          {props.playerHealth}/{props.playerMaxHealth}
        </Box>
      </Flex>
      <Flex align="end" className="player" h="80%">
        <PlayerAnimation />
      </Flex>
    </Flex>
  );
};

export default PlayerHitBox;
