//Express
const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;

//Apollo
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

//Express Init
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Apollo Init
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

