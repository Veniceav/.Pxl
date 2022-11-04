import React from 'react';
import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react';

/*Component for Mobile/Tablet media query */
const Reminder = () => {
  return (
    <Box h="100vh" w="100vw">
      <Flex
        direction="column"
        className="Main-Container"
        p="20px 20px"
        justify="center"
        w="95%"
        h="50%"
        border="1px solid white"
      >
        <Box className="Header" w="100%" h="fit-content">
          <Text>PlaceHolder</Text>
        </Box>
        <Flex className="Content-Body" w="100%" align="center" justify="center">
          <Flex className="SideBar"></Flex>
          <Flex className="Main-Content"></Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Reminder;
