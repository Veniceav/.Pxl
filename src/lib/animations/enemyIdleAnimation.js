import images from '../images';
import styled, { keyframes } from 'styled-components';

const enemyAnimation = keyframes` 
from {
    background-position: -30px; }
to { background-position: -9030px 
}`;

const enemyIdleAnimation = styled.div`
  position: relative;
  top: 40px;
  left: 0px;
  image-rendering: pixelated;
  background-image: url(${images.targets.enemyIdle});
  background-size: cover;
  transform: scaleX(-1);
  height: 300px;
  animation: ${enemyAnimation} 1s steps(18) infinite;
`;

export default enemyIdleAnimation;
