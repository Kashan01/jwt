const express = require('express');
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
const JWT_SECRET='texttest'
const users=[]


app.post("/signup",(req,res)=>{
const username = req.body.username
const password = req.body.password
users.push({
    username,
    password
})
res.json({
    message:"you are signed in..."
})
})

app.post("/signin",(req,res)=>{
const username=req.body.username
const password=req.body.password
    const user = users.find(user => user.username === username && user.password === password);
if(user){
    const token = jwt.sign({
        username:username
    },JWT_SECRET)
    res.json({
        token
    })
}else{
    res.status(403).send({
        message:"Invalid username or password!!"
    })
}

})


app.get("/me", (req, res) => {
    const token = req.headers.token;
    const userDetails = jwt.verify(token, JWT_SECRET);

    const username =  userDetails.username;
    const user = users.find(user => user.username === username);

    if (user) {
        res.send({
            username: user.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})


app.listen(4000)