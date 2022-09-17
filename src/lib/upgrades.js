import images from './images';
import OrbChargedAnimation from '../lib/animations/orbChargedAnimation';

let upgrades = {
  auto: {
    name: 'Spark of Genius',
    description: 'Channel and Generate more energy.',
    stat: '5% Atk Dmg',
    baseDPS: 1.05,
    cost: 50,
    currentLevel: 0,
    purchased: false,
    image: <OrbChargedAnimation />,
    boosters: [
      {
        label: 'Extra hand',
        modifier: {
          type: 'multiplier',
          value: 2,
        },
      },
    ],
  },

  boxingGloves: {
    name: 'InnerFocus',
    purchased: false,
    description: 'Permanent +5 Crit.',
    baseDPS: 20,
    cost: 100,
    currentLevel: 0,
    image: `${images.upgrades.boxingGloves}`,
    boosters: [
      {
        label: 'Brawler Technique',
        modifier: {
          type: 'DPS Boost',
          value: 50,
        },
        cost: 50,
        purchased: false,
      },
      {
        label: 'Chain Strings',
        modifier: {
          type: 'multiplier',
          value: 2,
        },
        cost: 150,
        purchased: false,
      },
      {
        label: 'No punches Held',
        modifier: {
          type: 'multiplier',
          value: 2.5,
        },
        cost: 250,
        purchased: false,
      },
    ],
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
    boosters: [
      {
        label: 'Channel Energy',
        modifier: {
          type: 'DPS Boost',
          value: 150,
        },
        cost: 300,
        purchased: false,
      },
      {
        label: 'Spark of Genius',
        modifier: {
          type: 'multiplier',
          value: 2,
        },
        cost: 850,
        purchased: false,
      },
      {
        label: 'Fully Charged',
        modifier: {
          type: 'multiplier',
          value: 2.5,
        },
        cost: 1500,
        purchased: false,
      },
    ],
  },

  busterSword: {
    name: 'Auto Atk',
    description: 'Auto Attacks Enemy every 2.5s',
    baseDPS: 200,
    cost: 5000,
    currentLevel: 0,
    purchased: false,
    image: `${images.upgrades.sword}`,
    boosters: [
      {
        label: 'Sharpended Edge',
        modifier: {
          type: 'DPS Boost',
          value: 550,
        },
        cost: 650,
        purchased: false,
      },

      {
        label: 'Aluminum Coating',
        modifier: {
          type: 'Multiplier',
          value: 2,
        },
        cost: 2200,
        purchased: false,
      },
      {
        label: 'Perfect Stance',
        modifier: {
          type: 'Multiplier',
          value: 2,
        },
        cost: 3500,
        purchased: false,
      },
    ],
  },
};

export default upgrades;
