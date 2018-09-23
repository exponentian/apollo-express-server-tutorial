import { expect } from 'chai';
import * as api from './api';
import { testUsername, testPassword } from '../config';

let testToken = "";
let firstUser = {};

describe('type User:', () => {

  // login to get a token before operating test cases
  before(async () => {
    const loginResult = await api.login({ username: testUsername, password: testPassword });
    const loggedInUser = loginResult.data.data;

    testToken = loggedInUser.login.token;

    const usersResult = await api.readUsers(testToken);
    const users = usersResult.data.data.readUsers;
    firstUser = users[0];
  });


  // read all users
  describe('readUsers() =>', () => {
    it('get all users', async () => {
      const result = await api.readUsers(testToken);
      const { data } = result.data;
      
      expect(data.readUsers).to.be.an('array');
      expect(data.readUsers.length).to.be.above(0);
    });
  });

  // read a user
  describe('readUser() =>', () => {
    it('get the 1st user', async () => {
      const result = await api.readUser({ id: firstUser.id }, testToken);
      const { data } = result.data;

      expect(data.readUser).to.eql(firstUser);
    });

    it('invalid user id', async () => {
      const result = await api.readUser({ id: 'abcde123' }, testToken);
      const { data } = result.data;
      
      expect(data.readUser).to.be.a("null");
    });

  });

});

