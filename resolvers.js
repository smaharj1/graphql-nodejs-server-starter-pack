export default {
  Query: {
    allUsers: async (parent, args, { Users }) => {
      // { _id: 123123, name: "whatever"}
      const usersFound = await Users.find();
      return usersFound.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },

    
  },
  Mutation: {
    createUser: async (parent, args, { Users }) => {
      // { _id: 123123, name: "whatever"}
      console.log("Creating a user", args)
      const createdUser = await new Users(args).save();
      createdUser._id = createdUser._id.toString();
      return createdUser;
    },
  },
};
