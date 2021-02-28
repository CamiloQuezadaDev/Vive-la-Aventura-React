import gql from 'graphql-tag';

export const SERVICES = gql`
  query services {
    services {
      id
      name
    }
  }
`;

export const ME = gql`
  query me {
    me {
      id
      firstName
      lastName
      fullName
    }
  }
`;

export const SUBSIDIARIES_OF_CURRENT_COMPANY = gql`
  query subsidiariesOfCurrentCompany {
    subsidiariesOfCurrentCompany {
      id
      name
      address {
        id
        city
        locality
        line1
        lng
        lat
      }
      company {
        name
      }
    }
  }
`;
