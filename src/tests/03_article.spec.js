import { expect } from 'chai';
import * as api from './api';
import { testUsername, testPassword } from '../config';
import faker from 'faker';

let testId = "";
let testToken = "";

describe('type Article', () => {

  // login to get a token before operating test cases
  before(async () => {
    const loginResult = await api.login({ username: testUsername, password: testPassword });
    const loggedInUser = loginResult.data.data;

    testId = loggedInUser.login.id;
    testToken = loggedInUser.login.token;
  });

  describe('createArticle() =>', () => {

    it('create an article', async () => {
      const text = faker.lorem.text();
      const expected = {
        "data": {
          "createArticle": {
            "text": text,
            "user": {
              "id": testId,
              "username": testUsername
            }
          }
        }
      };
      
      const result = await api.createArticle({ text: text, user: testId }, testToken);
      expect(result.data).to.eql(expected);
    });
  });

  describe('readArticles() =>', () => {

    it('read all articles', async () => {
      const result = await api.readArticles(testToken);
      const { data } = result.data;

      expect(data.readArticles).to.be.an('array');
      expect(data.readArticles.length).to.be.above(0);
    });
  });

});