import React, { useState } from 'react';
import styled from 'styled-components';
import PlanetCard from './commun/PlanetCard';
import PlanetDetails from './commun/PlanetDetails';
import { useQuery, gql } from "@apollo/client";
import loader from '../resources/assets/planet-loader.svg';

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../resources/additional-assets/planets', false, /\.svg$/));

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
    font-size: 2.5em;
    font-weight: 900;
`;
const List = styled.div`
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
`;
const Pagination = styled.div`
    display: flex;
    gap: 24px;
    justify-content: center;
    padding: 1em;
`;
const PaginationButton = styled.button`
    border: unset;
`;

function Planets() {
    const GET_SPACE_CENTERS = gql`
        query getSpaceCenters($page: Int, $pageSize: Int) {
            spaceCenters(page: $page, pageSize: $pageSize) {
                pagination {
                    total
                    page
                    pageSize
                }
                nodes {
                    id
                    uid
                    name
                    description
                    latitude
                    longitude
                    planet {
                        id
                        name
                        code
                    }
                }
            }
        }
    `;

    const [page, setPage] = useState(1);
    const [selectedSpaceCenter, setSelectedSpaceCenter] = useState(null);
    const [planetDetailsOpen, setPlanetDetailsOpen] = useState(false);
    const flightsNum = 1596;
    const pageSize = 12;
    let maxPage = 0;

    const onSelectPlanet = (planet) => {
        setSelectedSpaceCenter(planet);
        setPlanetDetailsOpen(true);
    };

    function _renderPlanetCards() {
        const { loading, error, data } = useQuery(GET_SPACE_CENTERS, { variables: { page, pageSize } });

        if (loading) return <img src={loader} alt="loader" />;
        if (error) return `Error! ${error.message}`;
        maxPage = Math.floor(data.spaceCenters.pagination.total / data.spaceCenters.pagination.pageSize);
        return data.spaceCenters.nodes.map((node) => (
            <PlanetCard key={node.id} name={node.name} image={images[node.id % 9]} selected={selectedSpaceCenter?.id === node.id} flightsNum={flightsNum}
                        onSelect={() => onSelectPlanet(node)} />
        ));
    }

    return (
        <Container>
            <Content>
                <Title>Spacious</Title>
                <List>{_renderPlanetCards()}</List>
                <Pagination>
                    <PaginationButton onClick={() => setPage(page - 1)} disabled={page === 1}>&lt; Previous</PaginationButton>
                    <PaginationButton onClick={() => setPage(page + 1)} disabled={page === maxPage}>Next &gt;</PaginationButton>
                </Pagination>
            </Content>
            { planetDetailsOpen &&
                <PlanetDetails selectedSpaceCenter={selectedSpaceCenter} onClose={() => setPlanetDetailsOpen(false)} />
            }
        </Container>
    );
}

export default Planets;
