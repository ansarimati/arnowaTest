const mongoose = require('mongoose');
const url = 'mongodb+srv://arnowa:arnowa@cluster0.tldixdf.mongodb.net/arnowaDB?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose.connect(url).then( ()=> console.log('connection successfull') ).catch( (err)=> console.log(err) );