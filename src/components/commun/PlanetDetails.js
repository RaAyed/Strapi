import { useState } from 'react';
import styled from 'styled-components';
import { useQuery, gql } from "@apollo/client";
import loader from '../../resources/assets/planet-loader.svg';
import moment from 'moment';

const Container = styled.div`
    padding: 1.5em;
    border-radius: 25px;
    background: #FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    min-width: 320px;
    max-width: 320px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h1`
    font-size: 1.5em;
`;
const Description = styled.p`
`;
const List = styled.ul`
    list-style: none;
    padding: 0;
    flex-grow: 1;
`;
const ListItem = styled.li`
    display: flex;
    margin-bottom: 1em;
    gap: 10px;
`;
const Image = styled.img`
    width: 50px;
    background-color: #e7e7e7;
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
const CloseButton = styled.button`
`;

function PlanetDetails(props) {
    const [page, setPage] = useState(1);
    let flightsNum = 1596;
    const pageSize = 12;
    let maxPage = 0;

    const GET_FLIGHTS = gql`
        query getFlight($from: ID, $page: Int, $pageSize: Int) {
            flights(from: $from, page: $page, pageSize: $pageSize) {
                    pagination {
                    total
                    page
                    pageSize
                }
                nodes {
                    id
                    code
                    launchSite {
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
                    landingSite {
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
                    departureAt
                    seatCount
                    availableSeats
                }
            }
        }
    `;

    function _renderFlights() {
        const { loading, error, data } = useQuery(GET_FLIGHTS, { variables: { from: props.selectedSpaceCenter.id, page, pageSize } });

        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        flightsNum = data.flights.pagination.total;
        maxPage = Math.floor(data.flights.pagination.total / data.flights.pagination.pageSize);
        return data.flights.nodes.map((node) => (
            <ListItem key={node.id}>
                <Image src={loader} alt="loader" />
                <div>
                    <b>To: Planet {node.landingSite.planet.name}</b>
                    <div>{moment(node.departureAt).format("DD/MM/YYYY - hh:mm A")}</div>
                </div>
            </ListItem>
        ));
    }

    return (
        <Container>
            <CloseButton onClick={props.onClose}>X</CloseButton>
            <Title>{props.selectedSpaceCenter.name}</Title>
            <Description>{props.selectedSpaceCenter.description}</Description>
            <Description><b>Number of flights: {flightsNum}</b></Description>
            <Description>DEPARTURES</Description>
            <List>{_renderFlights()}</List>
            <Pagination>
                <PaginationButton onClick={() => setPage(page - 1)} disabled={page === 1}>&lt; Previous</PaginationButton>
                <PaginationButton onClick={() => setPage(page + 1)} disabled={page === maxPage}>Next &gt;</PaginationButton>
            </Pagination>
        </Container>
    );
}

export default PlanetDetails;