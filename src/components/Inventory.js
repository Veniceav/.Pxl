import { React, useState, useContext, useEffect } from 'react';
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

const transition = '0.3s ease-out all';
const retroRed = '#EC183F';
const retroPurple = '#7A18EC';

const BuyBtn = props => {
  const [isClicked, setIsClicked] = useState(false);

  const [params, setParam, setParams] = useContext(GameDataContext);
  const { cost } = props;
  const { dmg } = props;
  const { name } = props;
  const { purchased } = props;

  const purchaseItem = () => {
    if (params.cells >= cost) {
      setParam('cells', params.cells - cost);
      setIsClicked(clicked => !clicked);
      setParam('dps', Math.round(params.dps * dmg));
    } else {
      const difference = cost - params.cells;
      alert('You need ' + difference + ' more cells!');
    }
  };

  const giveCells = () => {
    let cellsGiven = Math.round(params.maxHealth / 2);
    console.log(cellsGiven + 'Cells Recieved');
    setParam('cells', params.cells + cellsGiven);
  };

  //Hp math
  const getHealth = () => {
    let newMaxHp = Math.round(
      4 * (params.level - 1 + 1.55 ** (params.level - 1.55))
    );
    setParam('health', newMaxHp);
    setParam('maxHealth', newMaxHp);
    console.log('Enemy Health: ' + newMaxHp);
  };

  //respawn Enemy
  const respawn = () => {
    getHealth();
  };

  useEffect(() => {
    if (params.health <= 0) {
      console.log('Enemy Taken Down!');
      giveCells();
      setParam('level', params.level + 1);
      respawn();
    }
  }, []);

  const handleClick = () => {
    purchaseItem();
  };

  return (
    <Button
      disabled={params.cells < cost || isClicked}
      variant="outline"
      size="sm"
      colorScheme="white"
      position="relative"
      mt="10px"
      top={isClicked ? '2px' : '0px'}
      right={isClicked ? '1px' : '0px'}
      w={isClicked ? '40px' : '80px'}
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
      onClick={() => handleClick()}
    >
      {/*Text inside of btn */}
      {isClicked ? 'Sold' : `${cost}c`}
    </Button>
  );
};

const Card = props => {
  const { name } = props;
  const { bg } = props;
  const { description } = props;
  const { baseDPS } = props;
  const { cost } = props;
  const { stat } = props;

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
          {name}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel w="100%" flexDirection="row" display="flex" pt="10px">
        <Flex
          className="img-cost"
          justify="center"
          align="center"
          direction="column"
          w="30%"
          h="100%"
        >
          <Flex position="relative" top="-90" left="-10" h="80px">
            {bg}
          </Flex>
          <BuyBtn cost={cost} name={name} dmg={baseDPS} />
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          w="100%"
          className="item-details"
        >
          <Box
            className="item-description"
            textAlign="center"
            fontSize="l"
            pb="10px"
          >
            {description}
          </Box>
          <Box
            className="stat-boost"
            textAlign="center"
            fontSize="sm"
            pt="10px"
          >
            {stat}
          </Box>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

const Bank = props => {
  const [params] = useContext(GameDataContext);
  return (
    <Flex direction="column" align="center" justify="center">
      <Box
        w="100%"
        borderBottom={`1px solid ${retroPurple}`}
        letterSpacing="2px"
        lineHeight="5"
        p="px"
        mb="10px"
      >
        <Text
          color="whiteAlpha.800"
          fontSize="l"
          textAlign="center"
          fontFamily="Poppins"
          textTransform="uppercase"
        >
          Exp
        </Text>
        <Text textAlign="center" fontSize="2xl">
          {params.currentExp}/{params.expNeeded}
        </Text>
      </Box>
      <Box
        w="100%"
        borderBottom={`1px solid ${retroRed}`}
        letterSpacing="2px"
        lineHeight="5"
        p="5px"
      >
        <Text
          color="whiteAlpha.800"
          fontSize="l"
          textAlign="center"
          fontFamily="Poppins"
          textTransform="uppercase"
        >
          Bank
        </Text>
        <Text textAlign="center" fontSize="2xl" textTransform="uppercase">
          Cells: {props.cells}
        </Text>
      </Box>
    </Flex>
  );
};

const Inventory = () => {
  const [params, setParam, setParams] = useContext(GameDataContext);

  return (
    <Flex
      className="inventory"
      direction="column"
      flex="1 1 25%"
      minW="218px"
      bgColor="#111"
    >
      <Flex direction="column" className="upgrades" minH="300px" h="100%">
        <Flex
          className="banner"
          justify="center"
          align="center"
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
            const { image, name, description, cost, stat, baseDPS, purchased } =
              upgradeData[u];
            return (
              <Card
                key={name}
                bg={image}
                name={name}
                description={description}
                stat={stat}
                cost={cost}
                baseDPS={baseDPS}
                purchased={purchased}
              />
            );
          })}
        </Accordion>
      </Flex>
      <Bank cells={params.cells}></Bank>
    </Flex>
  );
};

export default Inventory;
