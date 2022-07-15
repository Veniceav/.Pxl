import { React, useState, useContext } from 'react';
import {
  Flex,
  Box,
  VStack,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import upgradeData from '../lib/upgrades';
import { GameDataContext } from '../context/GameDataContext';
import upgrades from '../lib/upgrades';

const transition = '0.3s ease-out all';
const retroRed = '#EC183F';
const retroPurple = '#7A18EC';

const BuyBtn = props => {
  const { cells, setCells } = useContext(GameDataContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(clicked => !clicked);
  };
  /*const purchaseItem = item => {
    const cellsBanked = cells;
    upgrades[item].purchased = true;
    cellsBanked = cellsBanked - upgrades[item].cost;
    setCells(cellsBanked);
  };*/

  return (
    <Button
      disabled={isClicked ? true : false}
      variant="outline"
      colorScheme="white"
      position="relative"
      top={isClicked ? '2px' : '0px'}
      right={isClicked ? '1px' : '0px'}
      w={isClicked ? '100px' : '140px'}
      borderLeft={isClicked ? '1px solid' : '2px Solid'}
      borderBottom={isClicked ? '2px solid' : '3px Solid'}
      backgroundColor={isClicked ? 'gray.100' : ''}
      color={isClicked ? 'blackAlpha.500' : ''}
      transition={isClicked ? `${transition}` : ''}
      _hover={{
        background: isClicked ? '' : '#111',
        filter: isClicked ? '' : 'brightness(105%)',
        top: '2px',
        right: '1px',
        borderLeft: '1px solid',
        borderBottom: '2px solid',
      }}
      onClick={handleClick}
    >
      {isClicked ? 'Sold' : `${props.cost} cells`}
    </Button>
  );
};

const Card = props => {
  return (
    <AccordionItem
      border="none"
      borderBottom={`1px solid ${retroPurple}`}
      fontFamily="Poppins"
      w="100%"
      transition={transition}
      opacity={0.8}
      _hover={{ opacity: 1, paddingBottom: '5px' }}
    >
      <AccordionButton
        _hover={{ color: 'white' }}
        _expanded={{
          bg: `${retroPurple}`,
          color: 'white',
        }}
      >
        <Box
          flex={1}
          textAlign="left"
          fontSize="l"
          letterSpacing="2px"
          textTransform="uppercase"
        >
          {props.name}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel
        w="100%"
        flexDirection="row"
        display="flex"
        pt="20px"
        _hover={{ bg: 'none' }}
      >
        <Flex
          classname="item-img"
          justify="center"
          align="center"
          w="30%"
          h="100%"
        >
          <img
            src={props.bg}
            style={{
              imageRendering: 'pixelated',
              width: '100%',
              height: '100%',
            }}
          />
        </Flex>
        <Flex
          direction="column"
          align="center"
          className="item-details"
          w="100%"
          h="100%"
        >
          <Box
            className="item-description"
            textAlign="center"
            fontSize="l"
            mb="10px"
          >
            {props.description}
          </Box>
          <BuyBtn cost={props.cost} />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

const Stats = props => {
  return (
    <VStack w="100%" maxH="100%">
      <Text fontSize="4xl" color={retroRed}>
        Stats
      </Text>
      <VStack textAlign="left">DPS Bank</VStack>
      <Bank cells={props.cells} />
    </VStack>
  );
};

const Bank = props => {
  return (
    <Flex w="100%" h="100px" direction="column" align="center" justify="center">
      <Box
        w="50%"
        border={`1px solid ${retroRed}`}
        fontFamily="Poppins"
        letterSpacing="2px"
        lineHeight="5"
        p="5px"
      >
        <Text
          color="whiteAlpha.800"
          fontSize="xl"
          textAlign="center"
          textTransform="uppercase"
        >
          Bank
        </Text>
        <Text textAlign="center" fontSize="xl">
          Cells: {props.cells}
        </Text>
      </Box>
    </Flex>
  );
};

const Inventory = () => {
  const { cells, setCells } = useContext(GameDataContext);
  const { dps, setDps } = useContext(GameDataContext);
  return (
    <Flex
      className="inventory"
      direction="column"
      flex="1 1 25%"
      minW="300px"
      bgColor="#111"
    >
      <Flex direction="column" className="upgrades" minH="300px" h="100%">
        <Flex
          justify="center"
          align="center"
          className="banner"
          h="15%"
          borderBottom={`1px solid ${retroRed}`}
          color={retroRed}
        >
          <Text fontSize="6xl" textTransform="uppercase" pointerEvents="none">
            Upgrades
          </Text>
        </Flex>
        <Accordion allowToggle className="item-cards">
          {Object.keys(upgradeData).map(u => {
            const { image, name, description, cost } = upgradeData[u];
            return (
              <Card
                key={name}
                bg={image}
                name={name}
                description={description}
                cost={cost}
              />
            );
          })}
        </Accordion>
      </Flex>
      <Stats cells={cells}></Stats>
    </Flex>
  );
};

export default Inventory;
