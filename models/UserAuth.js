const userAuthModel = {
    getModel: (mongoose) => {
        const user_auth = mongoose.Schema({
            username: String,
            password: String
          })
    
        const UserAuth = mongoose.model('user_auths', user_auth);
    
        return UserAuth;
    }
}

export default userAuthModel;