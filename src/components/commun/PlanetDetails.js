import styled from 'styled-components';
import { useQuery, gql } from "@apollo/client";
import loader from '../../resources/assets/planet-loader.svg';

const Container = styled.div`
    padding: 1em;
    border-radius: 25px;
    background: #FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    min-width: 320px;
    max-width: 320px;
`;
const Title = styled.h1`
    font-size: 1.5em;
`;
const Description = styled.p`
`;
const List = styled.ul`
    list-style: none;
    padding: 0;
`;
const ListItem = styled.li`
    display: flex;
    margin-bottom: 1em;
`;
const Image = styled.img`
    width: 50px
`;

function PlanetDetails(props) {
    const GET_FLIGHTS = gql`
        query getFlight($from: ID) {
            flights(from: $from) {
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
        const { loading, error, data } = useQuery(GET_FLIGHTS, { variables: { from: props.selectedSpaceCenter.id } });

        if (loading) return;
        if (error) return;
        return data.flights.nodes.map((node) => (
            <ListItem key={node.id}>
                <Image src={loader} alt="loader" />
                <div>
                    <div>To: Planet {node.landingSite.planet.name}</div>
                    <div>{node.departureAt}</div>
                </div>
            </ListItem>
        ));
    }

    return (
        <Container>
            <Title>{props.selectedSpaceCenter.name}</Title>
            <Description>{props.selectedSpaceCenter.description}</Description>
            <Description>Number of flights: {props.flightsNum}</Description>
            <Description>DEPARTURES </Description>
            <List>{_renderFlights()}</List>
        </Container>
    );
}

export default PlanetDetails;