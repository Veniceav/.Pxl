import images from './images';
import OrbChargedAnimation from '../lib/animations/orbChargedAnimation';

let upgrades = {
  spark: {
    name: 'Spark of Genius',
    description: 'Channel and Generate more energy.',
    stat: '10% Atk Dmg',
    baseDPS: 1.1,
    cost: 50,
    currentLevel: 0,
    purchased: false,
    image: <OrbChargedAnimation />,
  },

  innerFocus: {
    name: 'InnerFocus',
    purchased: false,
    description: 'Permanent +5 Crit.',
    baseDPS: 20,
    cost: 100,
    currentLevel: 0,
    image: `${images.upgrades.boxingGloves}`,
  },

  orbPlus: {
    name: 'Orb+',
    description: 'More Juice!',
    stat: '10% Sp.Atk DMG',
    baseDPS: 75,
    cost: 1000,
    currentLevel: 0,
    purchased: false,
    image: <OrbChargedAnimation />,
  },

  autoAtk: {
    name: 'Auto Atk',
    description: 'Auto Attacks Enemy every 2.5s',
    baseDPS: 200,
    cost: 5000,
    currentLevel: 0,
    purchased: false,
    image: `${images.upgrades.sword}`,
  },
};

export default upgrades;
