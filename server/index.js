const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

//require all .env variables
require('dotenv').config()

const { MONGODB, PORT } = process.env

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect(MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB is connected ...');
    return server.listen({
      port: PORT
    });
  })
  .then(res => {
    console.log('Server running at ', res.url);
  });

