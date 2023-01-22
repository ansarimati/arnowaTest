const express = require('express');
require('./db/conn');
const User = require('./models/userSchema');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

let jwtSecretKey = "This is secret JWT key";

//middleware
const middleware = (req,res,next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.json({message:'No token, authorization denied'});
    }
    try {
        const decodedToken = jwt.verify(token, jwtSecretKey);
        console.log(decodedToken);
        req.id = decodedToken.id;
        next();  
    }
    catch (e) {
        return res.json({message:'invalid token, authorization denied'});
    }
}



app.get('/', (req, res)=>{
    res.send('Helo world');
});

app.post('/login',async (req, res)=>{
    console.log( req.body );
    const {name, email, mobile} = req.body;
    const user = new User({name, email, mobile});
    await user.save();

    let data = {
        id: user.id,        
    }
    const token = jwt.sign(data, jwtSecretKey, {expiresIn:'300000'});
    res.json({ user, token });
    
});

app.post('/logout',middleware,async (req,res)=>{
    await User.findByIdAndUpdate(req.id, {
        logoutTime : new Date()
    } );
    res.send('logout worked');
});

app.put('/message',middleware,async (req,res)=>{
    const {msg} = req.body;
    const user = await User.findById(req.id);
    // console.log('message is ', msg)
    user.message = [...user.message, msg];
    await user.save();
    // console.log(msgs)
    res.json(user);
})

app.listen(5000, ()=>console.log('server is running on 5000 port'));
