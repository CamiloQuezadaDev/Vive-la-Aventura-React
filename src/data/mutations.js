import gql from 'graphql-tag';

export const USER_SIGN_UP = gql`
    mutation userSignUp($input: UserSignUpInput!){
        userSignUp(input: $input){
            errors 
            success
        }
    }
`;

export const USER_SIGN_IN = gql`
    mutation userSignIn($input: UserSignInInput!){
        userSignIn(input: $input){
            token
            errors 
            exists
        }
    }
`;