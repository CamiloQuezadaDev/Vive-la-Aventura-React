import gql from 'graphql-tag';

export const SERVICES = gql`
    query services {
        services {
            id 
            name
        }
}`;

export const ME = gql`
    query me {
        me {
            id
            firstName
            lastName
            fullName
        }
    }
`