export default `

type User {
  _id: String,
  username: String!,
  first_name: String!,
  last_name: String!,
  email: String!
}

type UserAuth{
  _id: String,
  username: String!,
  password: String
}

type Query {
  allUsers: [User]
}

type Mutation {
  register(username: String!, password: String!, first_name: String!, last_name: String!, email: String!): User
  login(username: String!, password: String!): String!
}

`;
