import { expect } from 'chai';
import * as api from './api';
import * as error from '../error-messages';
import { testUsername, testPassword } from '../config';

// display current test username and password
console.log("Test data:");
console.log(`- testUsername=${testUsername}`);
console.log(`- testPassword=${testPassword}`);

describe('type Auth:', () => {

  // signup
  describe('signup() =>', () => {
    it('invalid username and password', async () => {
      const result = await api.signup({ username: '', password: '' });
      const { data, errors } = result.data;

      expect(data.signup).to.be.a("null");
      expect(errors[0].message).to.include(error.signup.invalidUsernamePassword);
    });

    it('invalid password', async () => {
      const result = await api.signup({ username: testUsername, password: '' });
      const { data, errors } = result.data;

      expect(data.signup).to.be.a("null");
      expect(errors[0].message).to.include(error.signup.invalidUsernamePassword);
    });

    it('signup success', async () => {
      const result = await api.signup({ username: testUsername, password: testPassword });
      const { data } = result.data;
      
      expect(data.signup.username).to.eql(testUsername);
      expect(data.signup.token).to.be.a("string");
    });

    it('duplicated username', async () => {
      const result = await api.signup({ username: testUsername, password: testPassword });
      const { data, errors } = result.data;

      expect(data.signup).to.be.a("null");
      expect(errors[0].message).to.include(error.signup.invalidUsername);
    });
  });


  // login
  describe('login() =>', () => {
    it('username and passwod are empty', async () => {
      const result = await api.login({ username: '', password: '' });
      const { data, errors } = result.data;

      expect(data.login).to.be.a('null');
      expect(errors[0].message).to.include(error.login.noUserFound);
    });

    it('no user exists', async () => {
      const result = await api.login({ username: 'no.user', password: testPassword });
      const { data, errors } = result.data;

      expect(data.login).to.be.a('null');
      expect(errors[0].message).to.include(error.login.noUserFound);
    });

    it('password does not match', async () => {
      const result = await api.login({ username: testUsername, password: '12345678' });
      const { data, errors } = result.data;

      expect(data.login).to.be.a('null');
      expect(errors[0].message).to.include(error.login.noPasswordMatched);
    });

    it('login success', async () => {
      const result = await api.login({ username: testUsername, password: testPassword });
      const { data } = result.data;

      expect(data.login.username).to.eql(testUsername);
      expect(data.login.token).to.be.a("string");
    });

  });

});