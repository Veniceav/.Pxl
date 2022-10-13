import React, { useContext, useState } from 'react';
import Inventory from '../Inventory';
import images from '../../lib/images';
import {
  Flex,
  Box,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Button,
} from '@chakra-ui/react';
import { GameDataContext } from '../../context/GameDataContext';

import specials from '../../lib/specialAttacks';
import PlayerHitBox from './components/PlayerHitBox';
import TargetHitBox from './components/TargetHitBox';

const InventoryWrapper = () => {
  return (
    <Flex w="100%" position="absolute" left={0} top={0}>
      <Popover closeOnSelect={false}>
        <PopoverTrigger>
          <Button borderRadius={0} bg="white" color="black" fontSize="xl">
            .INV
          </Button>
        </PopoverTrigger>
        <PopoverContent
          minW="380px"
          maxW="425px"
          border="none"
          background="#111"
        >
          <PopoverCloseButton />
          <PopoverBody>
            <Inventory />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

const SpecialWrapper = props => {
  const [params, setParam, setParams] = useContext(GameDataContext);
  const { enabled } = props;
  const { setSpecialReady } = props;

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
      pt="20px"
      direction="column"
      w="100%"
      h="40%"
      bg="rgba(15, 15, 15, 0.8)"
      borderBottom="1px"
      borderColor="rgba(80, 80, 80, 0.7)"
      position="absolute"
      transition="0.2s linear"
      top={0}
      display={enabled === true ? '' : 'none'}
      left={enabled === true ? '0' : '-100%'}
    >
      <Tabs display="flex" flexDirection="column" isFitted>
        <TabList display="flex" flexDirection="column" flexShrink={1} w="100%">
          {Object.keys(specials).map(u => {
            const { name, variant } = specials[u];
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
                  borderBottom: '1px solid rgba(100, 100, 100, 0.7)',
                  borderTop: '1px solid rgba(100, 100, 100, 0.7)',
                }}
              >
                {name}
              </Tab>
            );
          })}
        </TabList>

        <TabPanels flexShrink={1} h="100%" w="100%">
          {Object.keys(specials).map(u => {
            const { name, description, variant } = specials[u];

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
                key={name}
                name={name}
                description={description}
                variant={variant}
                type={variant.type}
                cooldown={variant.cooldown}
                duraction={variant.duration}
                value={variant.modifier.value}
              >
                <Box
                  flex={1}
                  textAlign="left"
                  fontSize="l"
                  letterSpacing="1px"
                  textTransform="uppercase"
                  maxH="10px"
                  w="100%"
                >
                  {name}
                </Box>
                <Flex
                  align="center"
                  flexDirection="column"
                  justify="space-between"
                  className="special-details"
                  w="100%"
                >
                  <Box
                    className="description-Box"
                    textAlign="center"
                    fontsize="md"
                    width="100%"
                    border="1px"
                    m="20px 0"
                    borderColor="rgb(80, 80, 80)"
                  >
                    {description}
                  </Box>
                  {/*Stats*/}
                  <Flex
                    className="special-stats"
                    textAlign="center"
                    fontSize="md"
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
                    <Button
                      ml="30px"
                      w="50%"
                      bg="transparent"
                      color="white"
                      borderBottom="1px solid grey"
                      borderRadius={0}
                      onClick={() =>
                        specialSelect(variant.modifier.value, variant.type)
                      }
                    >
                      Use
                    </Button>
                  </Flex>
                </Flex>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

const MobileView = props => {
  const [params, setParam, setParams] = useContext(GameDataContext);
  const { specialReady } = props;
  const { setSpecialReady } = props;
  const { click } = props;
  return (
    <Flex
      bgImage={`url(${images.backgrounds.levelbg})`}
      bgPosition="-350px 0px"
      direction="column"
      className="main"
      w="100%"
      h="100%"
      justify="end"
    >
      <SpecialWrapper
        enabled={specialReady}
        setSpecialReady={setSpecialReady}
      />
      <InventoryWrapper />
      <Flex className="character-space" w="100%" h="50%" p="10px 10px">
        <Flex>
          <PlayerHitBox
            playerLevel={params.playerLevel}
            playerHealth={params.playerCurrentHp}
            playerMaxHealth={params.playerHp}
            dps={params.dps}
          />
        </Flex>
        <Flex>
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

export default MobileView;
