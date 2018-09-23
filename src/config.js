import faker from 'faker';
export const testUsername = faker.internet.userName();
export const testPassword = "12";


export const PORT = 8080;
export const API_URL = `http://localhost:${PORT}/graphql`;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/apollo-graphql-server-auth';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY';
