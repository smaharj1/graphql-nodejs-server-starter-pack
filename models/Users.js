const userModel = {
    getModel: (mongoose) => {
        const userSchema = mongoose.Schema({
            first_name: String,
            last_name: String,
            email: String,
            username: String
          })
    
        const Users = mongoose.model('users', userSchema);
    
        return Users;
    }
}


export default userModel;