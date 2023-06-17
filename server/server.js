//Express
const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;

//Apollo
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { type } = require('os');

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

//Send every other request to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//Apollo Server 
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    })
}

startApolloServer(typeDefs, resolvers);