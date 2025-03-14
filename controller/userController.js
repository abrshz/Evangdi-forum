// DB connection 
const dbConnection = require("../db/dbConfigue")

const {StatusCodes } = require("http-status-codes")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
async function register(req, res){
    const {username, firstname, lastname , email , password} = req.body
    if (!username || !firstname || !lastname || !email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide all required information"});
    }
    try {
        const [user] = await dbConnection.query("SELECT username, userid from users where username = ? or email = ?", [username, email])
        if (user.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Username or Email already exists"});
            }
        if (password.length <= 8){
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Password must be at least 8 characters" } ); 
        }
        // Encrypt the password 
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        await dbConnection.query("INSERT INTO users (username, firstname, lastname, email, password)VALUES (?,?,?,?,?)",[username, firstname, lastname, email, hashedPassword] );
        return res.status(StatusCodes.CREATED).json({msg: "User created"});

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something is error in the server."});
    }
}

async function login(req, res){
    const {email , password} = req.body;
    if (!email || !password ){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please enter all required fields"})
    }

    try {
        const [user] = await dbConnection.query("SELECT  username, password , userid from users where email = ?", [email]);
            if (user.length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "Email not found"});
                } 
// Compare password 
               const isMatch = await bcrypt.compare(password , user[0].password);
               if (!isMatch) {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "Invalid password"});
                }
                const username = user[0].username;
                const userid = user[0].userid;
                const token = jwt.sign({username, userid}, "select", {expiresIn: "30d"});

                return res.status(StatusCodes.OK).json({msg: "User login successfully", token});



               

                    


        
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something is error in the server."});
        
    }

}

async function check(req, res){
    res.send("Check")    
}

module.exports = {register, login, check}