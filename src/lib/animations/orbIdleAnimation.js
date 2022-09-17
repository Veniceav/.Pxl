import images from '../images';
import styled, { keyframes } from 'styled-components';

const orbAnimation = keyframes` 
100% {
    background-position: -1000px 0;
}`;

const OrbIdleAnimation = styled.div`
  position: relative;
  top: 80px;
  left: 40px;
  image-rendering: pixelated;
  background-image: url(${images.player.orbSpriteUncharged});
  background-size: cover;
  height: 100px;
  width: 100px;
  animation: ${orbAnimation} 0.7s steps(10) infinite;
`;

export default OrbIdleAnimation;
