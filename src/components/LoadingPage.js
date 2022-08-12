import React, { useState, useEffect } from 'react';
import { Flex, Button, Text, Box } from '@chakra-ui/react';
import { FlagSpinner } from 'react-spinners-kit';

const LoadingPage = ({ setPlay }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [overflow, setOverflow] = useState(false);
  const [bootUp, setBootUp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev + 1);
    }, 50);
    if (!loading) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (progress >= 100) {
      setLoading(false);
    }
  }, [progress]);
  return (
    <Flex
      bg="#222"
      h="100vh"
      w="100vw"
      justify="center"
      align="center"
      fontFamily="'VT323', monospace;"
    >
      <Flex
        w="50%"
        h="30%"
        direction="column"
        align="center"
        justify="center"
        border="1px solid white"
      >
        {loading === false ? (
          <Text
            letterSpacing="5px"
            textAlign="center"
            fontSize="6xl"
            textTransform="Uppercase"
            textUnderlineOffset={5}
            color="game.base"
            zIndex={1}
            transition="0.2s linear"
            textShadow={overflow === true ? '0px 20px 8px grey' : ''}
            mb="30px"
          >
            Pxl-Clkr
          </Text>
        ) : (
          ''
        )}
        <Box
          position="absolute"
          zIndex={0}
          bg="white"
          h={overflow === true ? '30%' : '0%'}
          transition="0.2s linear all"
          //   border={overflow === true ? '1px solid white' : ''}
          w="50%"
        ></Box>
        <FlagSpinner size={90} color="#fff" loading={loading} />

        {loading === false && (
          <Button
            size={'sm'}
            variant="outline"
            borderRadius="7px"
            border="2px"
            borderColor="white"
            w={overflow === true ? '80px' : '180px'}
            _hover={{
              borderColor: 'game.retroPurple',
              boxShadow: '0 0.2em 1px gray',
            }}
            boxShadow="none"
            transition="0.5s ease-in border-color, 0.1s ease-in width"
            onClick={() => {
              setPlay(true);
            }}
            onMouseEnter={() => setOverflow(true)}
            onMouseLeave={() => setOverflow(false)}
          >
            <Text
              fontFamily="'VT323', monospace;"
              letterSpacing="2px"
              fontSize={22}
              fontWeight="semibold"
              color={overflow === true ? 'game.base' : ''}
              transition="0.2s ease-in all"
            >
              {overflow === true ? 'PLAY' : 'PRESS START'}
            </Text>
          </Button>
        )}

        {loading === true && (
          <Text
            mt="25px"
            fontFamily="poppins"
            fontWeight="medium"
            color="white"
          >
            {progress} %
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default LoadingPage;
