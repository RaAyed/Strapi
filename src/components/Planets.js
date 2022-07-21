import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlanetCard from './commun/PlanetCard';

function Planets() {
    const Container = styled.div`
        padding: 4em;
        display: flex;
        flex-direction: row;
        flex-grow: 1;
    `;
    const Content = styled.div`
        padding: 1em;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    `;
    const Title = styled.h1`
        font-size: 1.5em;
    `;
    const List = styled.div`
        display: flex;
        flex-grow: 1;
    `;
    const Pagination = styled.div`
        display: flex;
        gap: 24px;
        justify-content: center
    `;
    const PaginationButton = styled.a`
    `;
    const Details = styled.div`
    `;

    const [planets, setPlanets] = useState([]);
    const [page, setPage] = useState(1);

    function _renderPlanetCards(planets) {
        return planets.map((planet) => (
            <PlanetCard name={planet.name} image={planet.image} selected={planet.selected} flightsNum={planet.flightsNum} />
        ));
    }

    useEffect(() => {
        setPlanets([]);
    }, []);

    return (
        <Container>
            <Content>
                <Title>Spacious</Title>
                <List>{_renderPlanetCards(planets)}</List>
                <Pagination>
                    <PaginationButton onClick={() => setPage(page - 1)}>&lt; Previous</PaginationButton>
                    <PaginationButton onClick={() => setPage(page + 1)}>Next &gt;</PaginationButton>
                </Pagination>
            </Content>
            <Details></Details>
        </Container>
    );
}

export default Planets;
