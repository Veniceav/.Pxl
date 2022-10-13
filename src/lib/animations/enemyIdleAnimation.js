import images from '../images';
import styled, { keyframes } from 'styled-components';

const enemyAnimation = keyframes` 
from {
    background-position: -100px; }
to { background-position: -9099px 
}`;

const enemyIdleAnimation = styled.div`
  position: relative;
  top: 0px;
  left: 40px;
  image-rendering: pixelated;
  background-image: url(${images.targets.enemyIdle});
  background-size: cover;
  transform: scaleX(-1);
  height: 300px;
  animation: ${enemyAnimation} 1s steps(18) infinite;
`;

export default enemyIdleAnimation;
