// Import everything needed to use the `useQuery` hook
import { useQuery } from '@apollo/client';
import { graphql } from './gql';
import { Link } from 'react-router-dom';


export default function App() {
  return (
    <div>
      <h2>Rick & Morty list</h2>
      <br/>
      <DisplayList />
    </div>
  );
}

const GET_LIST_CARAC = graphql(`
  query GetLists {
  characters{
    __typename
    info {
      count
      pages
      next
      prev
    }
    results {
      __typename
      id
      name
      image
    }
  }
}
`);

function DisplayList() {
  const { loading, error, data } = useQuery(GET_LIST_CARAC);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (error || !data?.characters?.results){
    return <div>error</div>
  }

  const characters = data.characters.results.filter(el => el !== null);

  return characters.map(({id, name, image}  ) =>
    <Link to={`/details/${id}`} key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt={name ?? ''} src={image ?? ''} />
    </Link>
  ).filter(el => el !== null);
}