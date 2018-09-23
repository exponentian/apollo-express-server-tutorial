import { gql } from 'apollo-server-express';
import axios from 'axios';
import { API_URL } from '../config';


export const signup = async variables => axios.post(API_URL,
  {
    query: `
      mutation ($username: String!, $password: String!) {
        signup(username: $username, password: $password) {
          id
          username
          token
        }
      }
    `,
    variables
  }
);

export const login = async variables => axios.post(API_URL,
  {
    query: `
      mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          id
          username
          token
        }
      }
    `,
    variables
  }
);


export const readUsers = async token => axios.post(API_URL, 
  {
    query: `
      {
        readUsers {
          id
          username
          articles {
            id
            text
          }
        }
      }
    `
  },
  {
    headers: {
      'authorization': 'Bearer ' + token,
    }
  }
);


export const readUser = async (variables, token) => axios.post(API_URL,
  {
    query: `
      query ($id: ID!) {
        readUser(id: $id) {
          id
          username
          articles {
            id
            text
          }
        }
      }
    `,
    variables
  },
  {
    headers: {
      'authorization': 'Bearer ' + token,
    }
  }
);


export const createArticle = async (variables, token) => axios.post(API_URL,
  {
    query: `
      mutation ($text: String!, $user: String!) {
        createArticle(text: $text, user: $user) {
          text
          user {
            id
            username
          }
        }
      }
    `,
    variables
  },
  {
    headers: {
      'authorization': 'Bearer ' + token,
    }
  }
);

export const readArticles = async token => axios.post(API_URL, 
  {
    query: `
      {
        readArticles {
          id
          text
          user {
            id
            username
          }
        }
      }
    `
  },
  {
    headers: {
      'authorization': 'Bearer ' + token,
    }
  }
);