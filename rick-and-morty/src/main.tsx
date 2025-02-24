import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import DetailsCarac from './DetailsCarac';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/details/:id" element={<DetailsCarac />} />
          </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
