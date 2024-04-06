const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const modelUser = require('./models/Users');
    
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(cookieParser())


mongoose.connect("mongodb://127.0.0.1:27017/secureuser");

const verify = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json("Token is Missing");
    }else{
        jwt.verify(token, "jwt-secret-key",(err, decoded)=>{
            if(err){
                res.json("Error with token");
            }
            else{
                if(decoded.role === "admin"){
                    next()
                }
                else{
                    return res.json("not admin");
                }
            }
        })
    }
}
app.get('/dashboard',verify,(req, res, next)=>{
    res.json("Success")
})

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    modelUser.findOne({ email: email })
    .then(userexist=>{
        if(!userexist){
            bcrypt.hash(password, 10)
            .then(hash => {    
                    modelUser.create({ name, email, password: hash })
                        .then(user => res.json("Success"))
                        .catch(err => res.json(err))
            })
            .catch(err => res.json(err))
        }
        else{
            res.json("User Already Exist");
        }
    })
  
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    modelUser.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role },"jwt-secret-key", { expiresIn: '1d' })
                        res.cookie('token', token)
                        return res.json("Success");
                        
                    }
                    else {
                       res.json("Incorrect Password")
                    }
                })
            }
            else {
                return res.json("Record Not Found");
            }
        })
})

app.listen(3001, () => {
    console.log("Server is Running");
})


