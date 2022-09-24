import React, { useContext } from 'react';
import {
  Flex,
  Box,
  Button,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { GameDataContext } from '../../../context/GameDataContext';
import special from '../../../lib/specialAttacks';

const SpAtkContainer = props => {
  const [params, setParam, setParams] = useContext(GameDataContext);
  const { enabled } = props;

  //for Damage based specials
  const specialAtkDmg = value => {
    const attackDmg = value * params.dps * 6;
    return attackDmg;
  };

  const specialAtkAction = (value, timeout) => {
    const { setProgress } = props;
    const { setSpecialReady } = props;
    const currentHp = params.currentEnemyHp - specialAtkDmg(value);
    setParam('currentEnemyHp', currentHp);
    setParam('playerActionBar', 0);
    setSpecialReady(false);
    setProgress(true);
  };

  //for healing based specials
  const specialHlgValue = value => {
    const hlgValue = value * params.playerLevel;
    return hlgValue;
  };

  const specialHlgAction = value => {
    const { setProgress } = props;
    const { setSpecialReady } = props;
    const currentPlayerHp = () => {
      const updatedCurrentHp = params.playerCurrentHp + specialHlgValue(value);
      if (updatedCurrentHp >= params.playerHp) {
        const amountRestoredOP = updatedCurrentHp - params.playerHp;
        console.log(amountRestoredOP + 'hp restored');
        setParam('playerCurrentHp', params.playerHp);
      } else {
        const amountRestored = updatedCurrentHp;
        console.log(amountRestored + 'hp restored');
        setParam('playerCurrentHp', updatedCurrentHp);
      }
    };
    currentPlayerHp();
    setProgress(true);
    setSpecialReady(false);
    setParam('playerActionBar', 0);
  };
  //for buffing based specials

  //function to target which special was used
  const specialSelect = (value, type) => {
    if (type === 'HLG') {
      specialHlgAction(value);
      console.log('hlg selected');
    }
    if (type === 'ATK') {
      specialAtkAction(value);
      console.log('atk selected');
    }
  };

  return (
    <Flex
      direction="column"
      maxW="100%"
      minW="55%"
      minH="250px"
      maxH="100%"
      bg="rgba(15, 15, 15, 0.8)"
      borderBottom="1px"
      borderColor="rgba(80, 80, 80, 0.7)"
      position="absolute"
      transition="0.2s linear"
      zIndex={1}
      top={0}
      left={enabled === true ? '0' : '-100%'}
    >
      <Flex align="center" justify="center" w="100%">
        <Text color="game.retroRed" fontSize="4xl" textTransform="uppercase">
          Special Ready
        </Text>
      </Flex>
      <Tabs display="flex" flexDirection="column" isFitted>
        <TabList flexShrink={1} w="100%">
          {Object.keys(special).map(u => {
            const { name, variant } = special[u];
            let color =
              variant.type === 'ATK'
                ? 'game.retroRed'
                : variant.type === 'HLG'
                ? 'game.retroGreen'
                : variant.type === 'BUF'
                ? 'game.retroPurple'
                : '';
            return (
              <Tab
                minW="25%"
                isFitted
                key={name}
                name={name}
                color={color}
                filter="brightness(75%)"
                _hover={{ filter: 'brightness(110%)' }}
                _selected={{
                  filter: 'brightness(110%)',
                  borderTop: '1px solid rgba(100, 100, 100, 0.7)',
                  borderRight: '1px solid rgba(100, 100, 100, 0.7)',
                }}
              >
                {name}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels flexShrink={1} h="100%" w="100%" minH="0px">
          {Object.keys(special).map(u => {
            const { name, description, variant } = special[u];

            const VariantBox = props => {
              const { element } = props;
              const { value } = props;
              const { type } = props;
              let color =
                type === 'ATK'
                  ? 'game.retroRed'
                  : type === 'HLG'
                  ? 'game.retroGreen'
                  : type === 'BUF'
                  ? 'game.retroPurple'
                  : element === 'Cooldown'
                  ? 'game.retroBlue'
                  : element === 'Duration'
                  ? 'game.retroBlue'
                  : element === 'DMG'
                  ? 'game.retroRed'
                  : element === 'HLG'
                  ? 'game.retroGreen'
                  : element === 'BUF'
                  ? 'game.retroPurple'
                  : '';

              return (
                <Flex
                  className="variant"
                  direction="column"
                  justify="center"
                  align="center"
                  pr="15px"
                >
                  <Text borderBottom="1px solid gray">{element}</Text>{' '}
                  <Text color={color}>{value}</Text>
                </Flex>
              );
            };

            return (
              <TabPanel
                p="0px 10px"
                key={name}
                name={name}
                description={description}
                variant={variant}
                type={variant.type}
                cooldown={variant.cooldown}
                duration={variant.duration}
                value={variant.modifier.value}
              >
                <Box
                  flex={1}
                  textAlign="left"
                  fontSize="l"
                  letterSpacing="2px"
                  textTransform="uppercase"
                  maxH="20px"
                >
                  {name}
                </Box>
                <Flex
                  align="center"
                  justify="space-between"
                  className="special-details"
                  w="100%"
                  pt="10px"
                >
                  <Box
                    className="descriptionBox"
                    textAlign="center"
                    fontSize="l"
                    width="60%"
                    p="10px 0"
                    border="1px"
                    borderColor="rgb(80, 80, 80)"
                  >
                    {description}
                  </Box>
                  {/*Stats */}
                  <Flex
                    className="special-stats"
                    textAlign="center"
                    fontSize="l"
                  >
                    {/* Type of Special */}
                    <VariantBox
                      type={variant.type}
                      element="Variant"
                      value={variant.type}
                    />

                    {/* Duration/Cooldown time */}
                    {variant.type === 'BUF' ? (
                      <VariantBox element="Duration" value={variant.duration} />
                    ) : (
                      <VariantBox element="Cooldown" value={variant.cooldown} />
                    )}

                    {/* Values for specials */}
                    {variant.type === 'ATK' && (
                      <VariantBox
                        element="DMG"
                        value={specialAtkDmg(variant.modifier.value)}
                      />
                    )}
                    {variant.type === 'HLG' && (
                      <VariantBox
                        element="HLG"
                        value={
                          '+' + specialHlgValue(variant.modifier.value) + 'Hp'
                        }
                      />
                    )}
                    {variant.type === 'BUF' && (
                      <VariantBox
                        element="BUF"
                        value={variant.modifier.value + '%'}
                      />
                    )}
                  </Flex>
                </Flex>
                <Button
                  variant="ghost"
                  w="100%"
                  borderBottom="1px solid grey"
                  borderRadius="0"
                  mt="10px"
                  _hover={{ bg: 'rgba(30, 30, 30, 0.7)' }}
                  onClick={() =>
                    specialSelect(variant.modifier.value, variant.type)
                  }
                >
                  Use
                </Button>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default SpAtkContainer;
