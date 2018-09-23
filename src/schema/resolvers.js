import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import User from '../models/User';
import Article from '../models/Article';
import * as error from '../error-messages';

const resolvers = {
  User: {
    articles: (parent, args) => Article.find({ user: parent.id })
  },
  Article: {
    user: (parent, args) => User.findById(parent.user)
  },
  Query: {
    readUsers: (parent, args, context) => {
      if ( !context.loggedInUser ) throw new ForbiddenError(error.auth.failed);
      return User.find({});
    },
    readUser: (parent, args, context) => {
      if ( !context.loggedInUser ) throw new ForbiddenError(error.auth.failed);
      return User.findById(args.id);
    },
    readArticles: (parent, args, context) => {
      if ( !context.loggedInUser ) throw new ForbiddenError(error.auth.failed);
      return Article.find({});
    }
  },
  Mutation: {
    signup: async (parent, args) => {
      try {
        if ( !args.username || !args.password ) throw new AuthenticationError(error.signup.invalidUsernamePassword);

        const checkUniqueUser = await User.findOne({ username: args.username });
        if (checkUniqueUser) throw new AuthenticationError(error.signup.invalidUsername);

        const newUser = new User(args);
        newUser.password = newUser.hashPassword(args.password);

        const user = await User.create(newUser);
        return {
          id: user.id,
          username: user.username,
          token: user.getJWT()
        };

      } catch(error) {
        throw new Error(error);
      }
    },
    login: async (parent, args) => {
      try {
        const user = await User.findOne({ username: args.username });

        if ( !user ) throw new Error(error.login.noUserFound);
        if ( !user.verifyPassword(args.password) ) throw new Error(error.login.noPasswordMatched);
        
        return {
          id: user.id,
          username: user.username,
          token: user.getJWT()
        }

      } catch(error) {
        throw new Error(error);
      }
    },
    createArticle: (parent, args, context) => {
      if ( !context.loggedInUser ) throw new ForbiddenError(error.auth.failed);
      return Article.create(args);
    }
  }
};


export default resolvers;