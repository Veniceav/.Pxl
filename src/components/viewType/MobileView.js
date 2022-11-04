import React, { useContext, useState } from 'react';
import Inventory from '../Inventory';
import images from '../../lib/images';
import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  Button,
} from '@chakra-ui/react';
import { GameDataContext } from '../../context/GameDataContext';
import SpContainer from './components/SpContainer';
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

const MobileView = props => {
  const [params] = useContext(GameDataContext);
  const {
    specialReady,
    setSpecialReady,
    setPlayerBarProgress,
    click,
    isMobile,
  } = props;
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
      <SpContainer
        isMobile={isMobile}
        enabled={specialReady}
        setProgress={setPlayerBarProgress}
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
