import { gql } from '@apollo/client';

// Fragment to keep client fields consistent across queries
const CLIENT_FIELDS = gql`
  fragment ClientFields on Client {
    id
    name
    email
    phone
  }
`;

export const GET_CLIENTS = gql`
    query getClients{
        clients{
            id
            name
            email
            phone
        }
    }
`