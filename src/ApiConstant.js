import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const API_URL = 'https://hacknarok-backend.herokuapp.com/graphql';
// export const API_URL = 'http://localhost:8080/graphql';

// const httpLink = createHttpLink({
//     uri: API_URL
// });
//
// export const GRAPHQL_CLIENT = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache()
// });