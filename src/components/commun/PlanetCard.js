import styled from 'styled-components';

function PlanetCard(props) {
    const Container = styled.div`
        border-radius: 15px;
        background: #FFFFFF;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        cursor: pointer;
        border: ${props => props.selected ? "1px solid rgba(0, 0, 0, 0.84)" : "unset"};
        width: 240px;
        text-align: center;
        display: flex;
        flex-grow: 1;
    `;
    const Name = styled.h3`
        margin: 0 1em;
        text-align: left;
    `;
    const Description = styled.p`
        margin: 1em;
        text-align: left;
    `;

    return (
        <Container onClick={props.onSelectPlanet} selected={props.selected}>
            <img alt={props.name} src={props.image} />
            <Name>{props.name}</Name>
            <Description>Number of flight: {props.flightsNum}</Description>
        </Container>
    );
}

export default PlanetCard;