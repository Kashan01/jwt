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

function auth(req,res,next){
    const token=req.header.token
    const decodedData = jwt.verify(token,JWT_SECRET)
    if(decodedData.username){
        req.username=decodedData.username
        next()
    }else{
        res.json({
            message:"You are not logged in..."
        })
    }

}

app.get("/me", (req, res) => {

    const user = users.find(user => user.username === req.username);

    res.json({
        message:"You are authorised to this..."
    })
})


app.listen(4000)