import images from './images';
import styled, { keyframes } from 'styled-components';

const charAnimation = keyframes` 
100% {
    background-position: -1752px 0;
}`;

const PlayerAnimation = styled.div`
  position: relative;
  top: -10;
  left: -100.9;
  image-rendering: pixelated;
  background-image: url(${images.player.char});
  background-size: cover;
  height: 270px;
  width: 160px;
  animation: ${charAnimation} 0.7s steps(10) infinite;
`;

export default PlayerAnimation;
