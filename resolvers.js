import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash'

let saltRounds = 10;

export default {
  Query: {
    allUsers: async (parent, args, { models, user }) => {
      if (!user){
        throw new Error("Unauthorized")
      }
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

      let tempUser = {
        username: args.username,
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email
      }

      let hash = await bcrypt.hash(args.password, saltRounds);

      var tempUserAuth = {
        username: args.username,
        password: hash
      }

      const createdUserAuth = await new models.userAuth(tempUserAuth).save();

      let createdUser = null;
      createdUser = await new models.users(tempUser).save();
      createdUser._id = createdUser._id.toString();

      return createdUser;
    },

    login: async (parent, args, { models, SECRET }) => {

      let loginInfo = args;

      const dbUser = await models.userAuth.findOne({ "username": loginInfo.username })
      console.log(dbUser)
      if (!dbUser) {
        throw new Error("User not Found");
      }
      let isPasswordTrue = await bcrypt.compare(loginInfo.password, dbUser.password);

      if (!isPasswordTrue) {
        throw new Error("Password invalid")
      }

      let token = jwt.sign(
        {
          user: _.pick(dbUser, ['id', 'username'])
        },
        SECRET,
        {
          expiresIn: '1h'
        }
      );

      return token;





    }
  },
};
