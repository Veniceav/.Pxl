import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Banner = () => {
  return (
    <Box h="5%" bgColor="blackAlpha.900" borderBottom="1px solid gray">
      <Text
        textAlign="center"
        fontSize="3xl"
        textTransform="Uppercase"
        textUnderlineOffset={5}
      >
        Pxl-Clkr
      </Text>
    </Box>
  );
};

export default Banner;
