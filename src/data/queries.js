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

export const SUBSIDIARIES_OF_CURRENT_COMPANY = gql`
    query subsidiaries {
        subsidiaries {
            id
            name
            address {
                id
                city
                lat
                lng
                line1
                locality
            }
        }
    }
`;

