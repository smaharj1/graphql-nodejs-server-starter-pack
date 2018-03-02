import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'jsonwebtoken';

import typeDefs from './schema';
import resolvers from './resolvers';

const SECRET = "randomSecretKey";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

import models from './models';

const middleware = async req=>{
  let token = req.headers.authorization;

  console.log("Token: ", token)
  try {
    let { user } = await jwt.verify(token, SECRET);

    req.user = user;
  }
  catch (e){
    console.log("Error in middleware")
    console.log(e.message)
  }

  req.next();
}

const PORT = 3000;

const app = express();

app.use(middleware);

app.use('/graphql', bodyParser.json(), graphqlExpress( req => ({ 
  schema, 
  context: { 
    models, 
    SECRET, 
    user: req.user 
  } })));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT);
