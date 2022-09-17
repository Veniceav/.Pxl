import forestBg from '../assets/images/Background.png';
import ghost from '../assets/images/ghost2.png';
import autoClick from '../assets/images/upgrades/autoclick.png';
import boxingGloves from '../assets/images/upgrades/boxinggloves.png';
import orb from '../assets/images/upgrades/orbIcon.png';
import sword from '../assets/images/upgrades/sword.png';
import char from '../assets/images/avatarsheetidle.png';
import moon from '../assets/images/moon.png';
import orbSprite from '../assets/images/orbsprite.png';
import orbSpriteUncharged from '../assets/images/orbspriteuncharged.png';
import enemyIdle from '../assets/images/enemyIdle.png';
import levelbg from '../assets/images/sor4.jpeg';

const images = {
  player: { char, orbSprite, orbSpriteUncharged },
  backgrounds: {
    forestBg,
    moon,
    levelbg,
  },
  upgrades: {
    autoClick,
    boxingGloves,
    orb,
    sword,
  },
  targets: {
    ghost,
    enemyIdle,
  },
};

export default images;
