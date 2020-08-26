import gql from 'graphql-tag';

export const SERVICES = gql`
    query services {
        services {
            id 
            name
        }
    }`;