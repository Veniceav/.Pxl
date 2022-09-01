import React, { useEffect, useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Box,
  Flex,
  Text,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { GameDataContext } from '../context/GameDataContext';
import special from '../lib/specialAttacks';
import images from '../lib/images';
import PlayerAnimation from '../lib/PlayerAnimation';

//Enemy hitBox
const TargetHitBox = props => {
  const [params, setParam, setParams] = useContext(GameDataContext);

  return (
    <Flex
      fontSize="xl"
      direction="column"
      h="100%"
      minW="200px"
      color="whiteAlpha.900"
      align="center"
    >
      <Flex className="charInfo" direction="column" align="center">
        <Flex align="center">
          <CircularProgress
            thickness="5px"
            size="55px"
            value={params.enemyActionBar}
            color="game.retroRed"
          />
          <Flex direction="column">
            <Box className="enemyLevel" margin="0 5px">
              Lvl. {props.level}
            </Box>
            <Box className="enemyDamage" margin="0 5px">
              Atk: {props.enemyDamage}
            </Box>
          </Flex>
        </Flex>

        <Box className="hpNum">
          {props.health}/{props.maxHealth}
        </Box>
      </Flex>

      <Flex className="target" h="60%" w="100%">
        <Flex
          display="block"
          h="300px"
          w="300px"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="bottom"
          bgImg={images.targets.ghost}
          onClick={props.click}
          cursor="crosshair"
        ></Flex>
      </Flex>
    </Flex>
  );
};

//Player Character hitbox
const PlayerHitBox = props => {
  const [params, setParam, setParams] = useContext(GameDataContext);

  return (
    <Flex
      fontSize="xl"
      direction="column"
      h="100%"
      minW="200px"
      color="whiteAlpha.900"
      align="center"
    >
      <Flex className="charInfo" direction="column" align="center">
        <Flex align="center">
          <CircularProgress
            thickness="5px"
            size="55px"
            value={params.playerActionBar}
            color="game.retroPurple"
          />
          <Flex direction="column">
            <Box className="enemyLevel" margin="0 5px">
              Lvl. {props.playerLevel}
            </Box>
            <Box className="enemyDamage" margin="0 5px">
              Atk: {props.dps}
            </Box>
          </Flex>
        </Flex>

        <Box className="hpNum">
          {props.playerHealth}/{props.playerMaxHealth}
        </Box>
      </Flex>
      <Flex align="end" className="player" h="80%" w="100%">
        <PlayerAnimation />
      </Flex>
    </Flex>
  );
};

const SpAtkContainer = props => {
  const [params, setParam, setParams] = useContext(GameDataContext);
  const { enabled } = props;

  //for Damage based specials
  const specialAtkDmg = value => {
    const attackDmg = value * params.dps * 6;
    return attackDmg;
  };

  const specialAtkAction = (value, timeout) => {
    const { payout } = props;
    const { setProgress } = props;
    const { setSpecialReady } = props;
    const currentHp = params.currentEnemyHp - specialAtkDmg(value);
    setParam('currentEnemyHp', currentHp);
    setParam('playerActionBar', 0);
    setSpecialReady(false);
    setProgress(true);
    if (currentHp <= 0) {
      payout();
    }
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
      w="55%"
      minH="250px"
      bg="rgba(15, 15, 15, 0.8)"
      borderBottom="1px"
      borderColor="rgba(80, 80, 80, 0.7)"
      position="absolute"
      transition="0.2s linear"
      top={0}
      left={enabled === true ? '0' : '-650px'}
    >
      <Flex align="center" justify="center" w="100%">
        <Text color="game.retroRed" fontSize="4xl" textTransform="uppercase">
          Special Ready
        </Text>
      </Flex>
      <Tabs isFitted>
        <TabList>
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
        <TabPanels h="100%" w="100%">
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
                p="10px 10px"
                key={name}
                name={name}
                description={description}
                variant={variant}
                type={variant.type}
                cooldown={variant.cooldown}
                duration={variant.duration}
                value={variant.modifier.value}
              >
                {' '}
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

const ActionWindow = () => {
  const [params, setParam, setParams] = useContext(GameDataContext);
  const [buildup, setBuildup] = useState(true);
  const [specialReady, setSpecialReady] = useState(false);
  const [playerBarProgress, setPlayerBarProgress] = useState(true);

  //Enemy Action Bar Build
  useEffect(() => {
    console.log(params.enemyActionBar);
    const interval = setInterval(() => {
      if (params.enemyActionBar >= 100) {
        setParams(p => {
          const newVal = 0;
          return {
            ...p,
            enemyActionBar: newVal,
          };
        });
        enemyAttack();
      } else {
        setParams(p => {
          const newVal = p.enemyActionBar + p.enemyBarBase;
          return {
            ...p,
            enemyActionBar: newVal,
          };
        });
      }
    }, 200);
    if (!buildup) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [params.enemyActionBar]);

  //Player Action Bar Build
  useEffect(() => {
    if (playerBarProgress) {
      console.log('p1: ' + params.playerActionBar);
      const interval = setInterval(() => {
        setParams(p => {
          const newVal =
            p.playerActionBar >= 100
              ? 100
              : p.playerActionBar + p.playerBarBase;
          return {
            ...p,
            playerActionBar: newVal,
          };
        });
      }, 1000);
      if (params.playerActionBar >= 100) {
        setPlayerBarProgress(false);
        setSpecialReady(true);
      }

      return () => clearInterval(interval);
    }
  }, [params.playerActionBar]);

  //onClick functionality
  const click = () => {
    const currentHp = params.currentEnemyHp - params.dps;
    setParam('currentEnemyHp', currentHp);
    if (!specialReady) {
      setParam(
        'playerActionBar',
        params.playerActionBar + params.playerBarBase
      );
    }
    console.log(currentHp + ' Hp left');
    if (params.playerActionBar >= 100) {
      setSpecialReady(true);
    }

    if (currentHp <= 0) {
      payout();
    } else {
      setParam('currentEnemyHp', currentHp);
    }
  };

  //payout cells, exp n respawn enemy
  const payout = () => {
    console.log('Enemy Taken Down!');
    giveCells();
    giveExp();
    setParam('enemyActionBar', 0);
    setBuildup(false);
    const newLevel = params.enemyLevel + 1;
    setParams(p => {
      const newVal = newLevel;
      return {
        ...p,
        enemyLevel: newVal,
      };
    });
    respawn();
  };

  //Cells(currency) given on kills
  const giveCells = () => {
    let cellsGiven = Math.round(params.enemyHp / 2);
    console.log(cellsGiven + ' Cells Recieved');
    setParam('cells', cellsGiven + params.cells);
  };

  const giveExp = () => {
    const expGiven = Math.round((params.enemyHp * 0.55) / 2);
    console.log(expGiven + ' Exp Recieved');
    setParam('currentExp', params.currentExp + expGiven);
  };

  useEffect(() => {
    if (params.currentExp >= params.expNeeded) {
      setParam('currentExp', 0);
      const expNeeded = Math.round((params.enemyHp * 1.75) / 2);
      setParams(p => {
        const newLevel = params.playerLevel + 1;
        return {
          ...p,
          playerLevel: newLevel,
          expNeeded: expNeeded,
        };
      });
      getPlayerHp();
      getPlayerDps();
    }
  });

  //player Hp math
  const getPlayerHp = () => {
    const newMaxHp = Math.round(
      // 4 * (params.enemyLevel - 1 + 1.55 ** (params.enemyLevel - 1.55)
      Math.round(params.playerLevel * 4)
    );
    setParams(p => {
      const newHp = newMaxHp;
      return {
        ...p,
        playerHp: newHp,
        playerCurrentHp: newHp,
      };
    });
  };

  //player damage Calc
  const getPlayerDps = () => {
    const newDpsVal =
      Math.round(((0.55 * params.playerLevel) / 2) * 1.17) + params.dps;
    setParams(p => {
      const newVal = newDpsVal;
      return {
        ...p,
        dps: newVal,
      };
    });
  };

  //Enemy Hp math
  const getHealth = () => {
    const newMaxHp = Math.round(
      4 * (params.enemyLevel - 1 + 1.55 ** (params.enemyLevel - 1.55))
    );
    setParams(p => {
      const newHp = newMaxHp;
      return {
        ...p,
        enemyHp: newHp,
        currentEnemyHp: newHp,
      };
    });
    console.log('Enemy Health: ' + newMaxHp);
  };

  //Enemy damage Calc
  const getDamage = () => {
    const newEnemyDamage = Math.round(3.17 * params.enemyLevel);
    setParams(p => {
      const newVal = newEnemyDamage;
      return {
        ...p,
        enemyDamage: newVal,
      };
    });
  };

  //Enemy Attack calc
  const enemyAttack = () => {
    getDamage();
    setParams(p => {
      const newVal = p.playerCurrentHp - p.enemyDamage;
      return {
        ...p,
        playerCurrentHp: newVal,
      };
    });
  };

  //respawn Enemy
  const respawn = () => {
    getHealth();
    getDamage();
    setParam('enemyActionBar', 0);
    setBuildup(true);
    //add enemy image change
  };

  const newGame = () => {
    setParam('dps', 2);
    setParam('cells', 100);
    setParam('playerLevel', 3);
    getPlayerHp();
    getPlayerDps();
    getHealth();
    getDamage();
    setParam('expNeeded', Math.round(params.enemyHp * 4));
  };

  useEffect(() => {
    newGame();
  }, []);

  return (
    <Flex
      className="Main"
      direction="column"
      h="100%"
      flex="3 2 75%"
      w="75%"
      bgImage={images.backgrounds.forestBg}
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="bottom"
      position="relative"
    >
      <SpAtkContainer
        enabled={specialReady}
        payout={payout}
        setProgress={setPlayerBarProgress}
        setSpecialReady={setSpecialReady}
      />
      <Flex
        direction="column"
        className="InteractiveWindow"
        flex="5 1 750px"
        h="90%"
        p="80px 0px"
        justify="end"
      >
        <Flex
          className="characterSpace"
          w="100%"
          justify="space-around"
          p="10px 100px"
        >
          <PlayerHitBox
            playerLevel={params.playerLevel}
            playerHealth={params.playerCurrentHp}
            playerMaxHealth={params.playerHp}
            dps={params.dps}
          />
          <TargetHitBox
            level={params.enemyLevel}
            health={params.currentEnemyHp}
            maxHealth={params.enemyHp}
            enemyDamage={params.enemyDamage}
            click={click}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ActionWindow;
