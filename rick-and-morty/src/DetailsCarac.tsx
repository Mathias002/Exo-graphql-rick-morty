import { useQuery } from '@apollo/client';
import { graphql } from './gql';
import { useParams } from "react-router-dom";

export default function DetailsCarac() {
  const { id } = useParams();
  return (
    <div>
      <h1>Détails du personnage ID: {id}</h1>
      <br/>
      <DisplayDetails />
    </div>
  );
}

const GET_DETAILS_CARAC = graphql(`
query GetDetails($id: ID!) {
  character(id: $id){
    __typename
    id
    name
    status
    species
    gender
    origin {
      __typename
      id
      name
    }
    location {
      __typename
      id
      name
    }
    image
  }
}
`);

function DisplayDetails() {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const { loading, error, data } = useQuery(GET_DETAILS_CARAC, {
    variables: { id }, // Passer l'ID en tant que variable
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;


  return (
    <div>
      <h1>{data.character.name}</h1>
      <img src={data.character.image} alt={data.character.name} />
      <p>Status: {data.character.status}</p>
      <p>Espèce: {data.character.species}</p>
      <p>Genre: {data.character.gender}</p>
      <p>Origine: {data.character.origin.name}</p>
      <p>Localisation: {data.character.location.name}</p>
    </div>
  );
}