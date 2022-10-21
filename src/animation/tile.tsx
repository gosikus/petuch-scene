import * as React from 'react';
import styled from 'styled-components';
import "./tile.css"
interface Props {
    src: string;
    tile: {
        width: number;
        height: number;
    };
    sizeCoeff: number;
    scaleX:number;

}

interface ContainerProps {
    // width: number;
    // height: number;
    sizeCoeff: number;
    scaleX:number;
}

const Container = styled.div<ContainerProps>`
  transform: scale(${({ sizeCoeff, scaleX }) => `${sizeCoeff*scaleX}, ${sizeCoeff}`});
  transform-origin: center center;
`;


export default class Tile extends React.Component<Props> {
    static defaultProps = {
        scale: 1
    };

    render() {
        const { src, tile, sizeCoeff,scaleX } = this.props;

        return (

                <Container  sizeCoeff={sizeCoeff} scaleX={scaleX}>
                    <div className="tile_box">
                <img src={src} alt={"cock"}/>
                    </div>
              </Container>

        );
    }
}
