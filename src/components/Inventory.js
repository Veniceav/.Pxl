import React from 'react';
import { Flex, Box, HStack, Text } from '@chakra-ui/react';
import upgradeData from '../lib/upgrades';

const Card = props => {
  return (
    <HStack
      w="100%"
      h="25%"
      margin="10px 0"
      border="1px solid grey"
      cursor="pointer"
    >
      <Box
        classname="item-img"
        w="30%"
        h="100%"
        bgImage={`url(${props.bg})`}
        bgSize="contain"
        bgRepeat="no-repeat"
        bgPosition="center"
      ></Box>
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="item-details"
        w="70%"
        h="100%"
      >
        <Box fontSize="2xl" className="item-name">
          {props.name}
        </Box>
        <Box textAlign="center" className="item-description">
          {props.description}
        </Box>
      </Flex>
    </HStack>
  );
};

const Inventory = () => {
  return (
    <Flex
      className="inventory"
      direction="column"
      flex="1 1 25%"
      minW="300px"
      color="whiteAlpha.900"
      bgColor="blackAlpha.900"
    >
      <Flex direction="column" className="upgrades" minH="300px" h="100%">
        <Flex
          justify="center"
          align="center"
          className="banner"
          h="15%"
          borderBottom="1px solid grey"
        >
          <Text fontSize="6xl" textTransform="uppercase" pointerEvents="none">
            Upgrades
          </Text>
        </Flex>
        <Box className="item-cards" h="75%" m="5% 0">
          <Card
            bg={upgradeData.auto.image}
            name={upgradeData.auto.name}
            description={upgradeData.auto.description}
          />
          <Card
            bg={upgradeData.boxingGloves.image}
            name={upgradeData.boxingGloves.name}
            description={upgradeData.boxingGloves.description}
          />
          <Card
            bg={upgradeData.orbCompanion.image}
            name={upgradeData.orbCompanion.name}
            description={upgradeData.orbCompanion.description}
          />
          <Card
            bg={upgradeData.busterSword.image}
            name={upgradeData.busterSword.name}
            description={upgradeData.busterSword.description}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Inventory;
