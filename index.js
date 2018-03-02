import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
// import mongoose from 'mongoose';

import typeDefs from './schema';
import resolvers from './resolvers';

const SECRET = "randomSecretKey";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

import models from './models';

const PORT = 3000;

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { models, SECRET } }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT);
