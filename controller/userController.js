function register(req, res){
    res.send("Register")    
}

function login(req, res){
    res.send("Login")    
}

function check(req, res){
    res.send("Check")    
}

module.exports = {register, login, check}