import * as React from 'react';
import Tile from './tile';
import "./sprite.css"
import Indicators from "./Indicators"

interface Props {
  srcDir: string;
  framesAmount: number;
  sizeCoeff: number;
  framesPerStep: number;
  scaleX:number;
  tile: {
    width: number;
    height: number;
  };
}

interface State {
  frameId: number;
}

export default class Sprite extends React.Component<Props, State> {
  tick = 0;
  frame: number = 0;
  state = {
    frameId: 0
  };

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
  }

  animate = () => {
    const { frameId } = this.state;
    const { framesPerStep, framesAmount } = this.props;

    if (this.tick === framesPerStep) {
      this.tick = 0;
      this.setState({
        frameId: (frameId + 1) % framesAmount
      });
    }
    this.tick += 1;

    this.frame = requestAnimationFrame(this.animate);
  }

  render() {
    const { srcDir, tile, sizeCoeff, scaleX } = this.props;
    const { frameId } = this.state;
    const src = `${srcDir}/${frameId}.png`;

    return (
        <div className="sprite_box">
          <Tile scaleX={scaleX} src={src} tile={tile} sizeCoeff={sizeCoeff} />;
        </div>
        )



  }
}
