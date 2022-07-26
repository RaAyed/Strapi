import styled from 'styled-components';

const Container = styled.div`
    border-radius: 15px;
    background: #FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
    border: ${props => props.selected ? "1px solid rgba(0, 0, 0, 0.84)" : "1px solid rgba(0, 0, 0, 0.12)"};
    max-width: 240px;
    text-align: center;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    box-sizing: border-box;
`;
const Name = styled.h3`
    margin: 0 1em;
    text-align: left;
`;
const Description = styled.p`
    margin: 1em;
    text-align: left;
`;

function PlanetCard(props) {
    return (
        <Container onClick={props.onSelect} selected={props.selected}>
            <img alt={props.name} src={props.image} />
            <Name>{props.name}</Name>
            <Description>Number of flight: {props.flightsNum}</Description>
        </Container>
    );
}

export default PlanetCard;