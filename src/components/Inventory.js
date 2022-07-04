import React from 'react';
import { Flex, Box, HStack, Text } from '@chakra-ui/react';

const Card = props => {
  return (
    <HStack w="100%" h="25%" margin="10px 0" border="1px solid grey">
      <Box classname="item-img" w="30%" h="100%" bg="red">
        blah
      </Box>
      <Flex className="item-details" w="70%" h="100%" bg="orange">
        <Box className="item-name">{props.name}</Box>
        <Box className="item-description">{props.description}</Box>
      </Flex>
    </HStack>
  );
};

const Inventory = () => {
  return (
    <Flex
      className="inventory"
      bg="whiteAlpha.900"
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
          <Text
            fontSize="6xl"
            textTransform="uppercase"
            pointerEvents="none"
            onMouseEnter={'paddingBottom: 10px'}
          >
            Upgrades
          </Text>
        </Flex>
        <Box className="item-cards" h="75%" m="5% 0">
          <Card name="thing1" description="thing2" />
          <Card name="thing1" description="thing2" />
          <Card name="thing1" description="thing2" />
          <Card name="thing1" description="thing2" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Inventory;
