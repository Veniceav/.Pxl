import React from 'react';
import { Box, Flex, Img, Text } from '@chakra-ui/react';
import images from '../lib/images';

const TargetHitBox = props => {
  return (
    <Flex
      fontSize="xl"
      direction="column"
      h="100%"
      minW="200px"
      color="whiteAlpha.900"
      align="center"
    >
      <HitBoxDetails level="2" currentHp="87" maxHp="112" />
      <Flex align="end" classname={props.name} h="80%" w="100%">
        <Box
          h="300px"
          w="300px"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="bottom"
          bgImg={images.targets.ghost}
        ></Box>
      </Flex>
    </Flex>
  );
};

const PlayerHitBox = props => {
  return (
    <Flex
      fontSize="xl"
      direction="column"
      h="100%"
      minW="200px"
      color="whiteAlpha.900"
      align="center"
    >
      <HitBoxDetails level="2" currentHp="87" maxHp="112" />
      <Flex align="end" classname={props.name} h="80%" w="100%">
        <Box
          h="300px"
          w="300px"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="bottom"
        ></Box>
      </Flex>
    </Flex>
  );
};

const HitBoxDetails = props => {
  return (
    <Box className="charInfo">
      <Box className="targetLevel" margin="0 5px">
        Lvl. {props.level}
      </Box>
      <Flex>
        <Box className="hpBar" margin="0 5px">
          HpBar
        </Box>
        <Box className="hpNum">
          {props.currentHp}/{props.maxHp}
        </Box>
      </Flex>
    </Box>
  );
};

const ActionWindow = () => {
  return (
    <Flex
      className="Main"
      direction="column"
      h="100%"
      flex="3 2 75%"
      w="75%"
      bgImage={images.backgrounds.forestBg}
      bgSize="2200px"
      bgPosition="bottom"
    >
      <Flex
        direction="column"
        className="InteractiveWindow"
        Flex="5 1 750px"
        h="90%"
        justify="flex-end"
      >
        <Flex
          direction="row"
          className="characterSpace"
          height="50%"
          w="100%"
          justify="space-around"
          p="10px 100px"
          align="end"
        >
          <PlayerHitBox />
          <TargetHitBox />
        </Flex>
      </Flex>
      <Flex
        className="StatDisplay"
        h="10%"
        bgColor="blackAlpha.900"
        color="whiteAlpha.900"
      >
        {/*Money Spent, Clicks Made, Upgrades, Purchased, dmg multiplier, targets killed */}
        <Text width="100%" textAlign="center">
          stats
        </Text>
      </Flex>
    </Flex>
  );
};
export default ActionWindow;
