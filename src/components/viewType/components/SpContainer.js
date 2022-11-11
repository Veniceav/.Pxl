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

const DestopButton = props => {
  const { type, value, specialSelect } = props;
  return (
    <Button
      variant="ghost"
      w="100%"
      borderBottom="1px solid grey"
      borderRadius="0"
      mt="10px"
      _hover={{ bg: 'rgba(30, 30, 30, 0.7)' }}
      onClick={() => specialSelect(value, type)}
    >
      Use
    </Button>
  );
};

const MobileButton = props => {
  const { type, value, specialSelect } = props;
  return (
    <Button
      ml="30px"
      w="50%"
      bg="transparent"
      color="white"
      borderBottom="1px solid grey"
      borderRadius={0}
      onClick={() => specialSelect(value, type)}
    >
      Use
    </Button>
  );
};

const TabContainer = props => {
  const { isMobile, setSpecialReady, setProgress } = props;
  const [params, setParam, setParams] = useContext(GameDataContext);

  //Calcs
  //For Damaged based specials
  const specialAtkDmg = value => {
    const attackDmg = value * params.dps * 6;
    return attackDmg;
  };

  const specialAtkAction = (value, timeout) => {
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
    const currentPlayerHp = () => {
      const updatedCurrentHp = params.playerCurrentHp + specialHlgValue(value);
      if (updatedCurrentHp >= params.playerHp) {
        const amountRestoredOP = updatedCurrentHp - params.playerHp;
        // console.log(amountRestoredOP + 'hp restored');
        setParam('playerCurrentHp', params.playerHp);
      } else {
        const amountRestored = updatedCurrentHp;
        // console.log(amountRestored + 'hp restored');
        setParam('playerCurrentHp', updatedCurrentHp);
      }
    };
    currentPlayerHp();
    setProgress(true);
    setSpecialReady(false);
    setParam('playerActionBar', 0);
  };

  //Buffed Based specials(WIP)

  //function to target which special was used
  const specialSelect = (value, type) => {
    if (type === 'HLG') {
      specialHlgAction(value);
      // console.log('hlg selected');
    }
    if (type === 'ATK') {
      specialAtkAction(value);
      // console.log('atk selected');
    }
  };

  return (
    <Tabs display="flex" flexDirection="column">
      <TabList flexShrink={1} flexDirection={isMobile ? 'column' : ''} w="100%">
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
              minW={isMobile ? '' : '25%'}
              key={name}
              name={name}
              color={color}
              filter="brightness(75%)"
              _hover={isMobile ? '' : { filter: 'brightness(110%)' }}
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
      <TabPanels flexShrink={1} h="100%" w="100%" minH="0px">
        {Object.keys(special).map(u => {
          const { name, description, variant } = special[u];

          const VariantBox = props => {
            const { element, value, type } = props;
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
                flexDirection={isMobile ? 'column' : ''}
                justify="space-between"
                className="spec-details"
                w="100%"
                pt={isMobile ? '' : '10px'}
              >
                <Box
                  className="description-box"
                  textAlign="center"
                  fontSize={isMobile ? 'md' : 'l'}
                  width={isMobile ? '100%' : '60%'}
                  p={isMobile ? '' : '10px 0'}
                  border="1px"
                  borderColor="rgb(80, 80, 80)"
                >
                  {description}
                </Box>
                {/*Stats*/}
                <Flex
                  className="spStats"
                  textAlign="center"
                  fontSize={isMobile ? 'md' : 'l'}
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
                  {isMobile ? (
                    <MobileButton
                      value={variant.modifier.value}
                      type={variant.type}
                      specialSelect={specialSelect}
                    />
                  ) : (
                    ''
                  )}
                </Flex>
              </Flex>
              {isMobile ? (
                ''
              ) : (
                <DestopButton
                  value={variant.modifier.value}
                  type={variant.type}
                  specialSelect={specialSelect}
                />
              )}
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

const MobileWrapper = props => {
  const { setSpecialReady, setProgress, isMobile } = props;
  const [params] = useContext(GameDataContext);
  return (
    <Flex
      pt="20px"
      direction="column"
      w="100%"
      h="45%"
      bg="rgba(15, 15, 15, 0.8)"
      borderBottom="1px"
      borderColor="rgba(80, 80, 80, 0.7)"
      position="absolute"
      transition="0.2s linear"
      top={0}
      zIndex={1}
      left={params.playerActionBar === 100 ? '0' : '-100%'}
    >
      <TabContainer
        setProgress={setProgress}
        setSpecialReady={setSpecialReady}
        isMobile={isMobile}
      />
    </Flex>
  );
};

const DesktopWrapper = props => {
  const [params] = useContext(GameDataContext);
  const { setSpecialReady, setProgress, isMobile } = props;

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
      left={params.playerActionBar === 100 ? '0' : '-100%'}
    >
      <Flex className="special-banner" align="center" justify="center" w="100%">
        {/*Special Banner*/}
        <Text color="game.retroRed" fontSize="4xl" textTransform="uppercase">
          Special Ready
        </Text>
      </Flex>
      <TabContainer
        setProgress={setProgress}
        setSpecialReady={setSpecialReady}
        isMobile={isMobile}
      />
    </Flex>
  );
};

const ConditionalWrapper = props => {
  const { isMobile, setSpecialReady, setProgress } = props;
  const Wrapper = isMobile ? MobileWrapper : DesktopWrapper;

  return (
    <Wrapper
      setSpecialReady={setSpecialReady}
      setProgress={setProgress}
      isMobile={isMobile}
    />
  );
};

const SpContainer = props => {
  const { setSpecialReady, setProgress, isMobile } = props;
  return (
    <ConditionalWrapper
      setProgress={setProgress}
      setSpecialReady={setSpecialReady}
      isMobile={isMobile}
    />
  );
};

export default SpContainer;
