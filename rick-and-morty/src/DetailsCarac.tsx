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

  if(!id) throw new Error('id is not defined in DetailsPage');

  const { loading, error, data } = useQuery(GET_DETAILS_CARAC, {
    variables: { id }, // Passer l'ID en tant que variable
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (error || !data?.character){
    return <div>character not found</div>
  }

  const {name, image, status, species, gender} = data.character
  const originName = data.character.origin?.name
  const locationName = data.character.location?.name

  return (
    <div>
      <h1>{name}</h1>
      <img src={image ?? ''} alt={name ?? ''} />
      <p>Status: {status}</p>
      <p>Espèce: {species}</p>
      <p>Genre: {gender}</p>
      <p>Origine: {originName}</p>
      <p>Localisation: {locationName}</p>
    </div>
  );
}