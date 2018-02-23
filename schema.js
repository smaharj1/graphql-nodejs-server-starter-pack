export default `

type User {
  _id: String,
  username: String!,
  first_name: String!,
  last_name: String!,
  email: String!
}

type Query {
  allUsers: [User]
}

type Mutation {
  createUser(username: String!, first_name: String!, last_name: String!, email: String!): User
}

`;
