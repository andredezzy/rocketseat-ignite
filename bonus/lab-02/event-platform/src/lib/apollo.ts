import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/cl8md9pwb3ony01t9ezntfazo/master',
  cache: new InMemoryCache(),
});