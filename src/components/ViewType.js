import React, { useState, useEffect, useContext } from 'react';
import { Flex } from '@chakra-ui/react';
import MobileView from './viewType/MobileView';
import DesktopView from './viewType/DesktopView';
import specials from '../lib/specialAttacks';
import { GameDataContext } from '../context/GameDataContext';

const useMobile = (width = 500) => {
  const [mobile, setMobile] = useState(
    window.matchMedia(`(max-width: ${width}px)`).matches
  );

  const updateBreakpoint = ({ matches }) => setMobile(matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
    mediaQuery.addEventListener('change', updateBreakpoint);
    return () => window.removeEventListener('change', updateBreakpoint);
    // use old backwards compatible until way to check support is found
    mediaQuery.addEventListener(updateBreakpoint);
    return () => mediaQuery.removeEventListener(updateBreakpoint);
  }, []);

  return [mobile];
};

const ViewType = () => {
  const [params, setParam, setParams] = useContext(GameDataContext);
  const [buildup, setBuildup] = useState(true);
  const [specialReady, setSpecialReady] = useState(false);
  const [playerBarProgress, setPlayerBarProgress] = useState(true);
  const [isMobile] = useMobile();

  //player action bar
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
  };

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

  const respawn = () => {
    getHealth();
    getDamage();
    setParam('enemyActionBar', 0);
    setBuildup(true);
    //add enemy image change
  };

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

  const giveCells = () => {
    let cellsGiven = Math.round(params.enemyHp / 2);
    console.log(cellsGiven + ' Cells Recieved');
    setParam('cells', cellsGiven + params.cells);
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
    if (params.currentEnemyHp <= 0) payout();
  });

  useEffect(() => {
    newGame();
  }, []);

  return (
    <Flex w="100%" h="100%">
      {isMobile ? (
        <MobileView
          click={click}
          specialReady={specialReady}
          setSpecialReady={setSpecialReady}
          setPlayerBarProgress={setPlayerBarProgress}
        />
      ) : (
        <DesktopView
          click={click}
          specialReady={specialReady}
          setSpecialReady={setSpecialReady}
          setPlayerBarProgress={setPlayerBarProgress}
        />
      )}
    </Flex>
  );
};

export default ViewType;
