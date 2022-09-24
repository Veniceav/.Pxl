import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const Banner = () => {
  const [checkWindow, setCheckWindow] = useState(null);

  useEffect(() => {
    const windowWidthValue = window.innerWidth;
    setCheckWindow(windowWidthValue);
  });

  return (
    <Box h="5%" display={checkWindow === 425 ? 'none' : ''}>
      <Text textAlign="center" fontSize="3xl" textTransform="Uppercase">
        .Pxl
      </Text>
    </Box>
  );
};

export default Banner;
