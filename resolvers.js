export default {
  Query: {
    allUsers: async (parent, args, { models }) => {
      const usersFound = await models.users.find();
      return usersFound.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },

    
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      console.log("Creating a user", args.username);

      var tempUser = {
        username: args.username,
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email
      }

      var tempUserAuth = {
        username: args.username,
        password: args.password
      }
      const createdUser = await new models.users(tempUser).save();
      createdUser._id = createdUser._id.toString();

      const createdUserAuth = await new models.userAuth(tempUserAuth).save();
      return createdUser;
    },
  },
};
