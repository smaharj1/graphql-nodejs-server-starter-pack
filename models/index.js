import mongoose from 'mongoose';

import Users from './Users';
import UserAuth from './UserAuth';

mongoose.connect('mongodb://localhost/food');

const db = {
    users: Users.getModel(mongoose),
    userAuth: UserAuth.getModel(mongoose)
};

db.mongoose = mongoose;

export default db;