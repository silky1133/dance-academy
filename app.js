const express= require ("express");
const fs= require("fs");
const path=require("path");
const app=express();
var mongoose=require('mongoose');
const bodyparser= require("body-parser")
mongoose.connect('mongodb://localhost/contactDance' , {useNewUrlParser: true});
const port=8001;
 var contactSchema= new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
 });
 var Contact = mongoose.model('Contact',contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded({ extended: true }));



app.set('view engine','pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
// ENDPOINTS
app.get('/', (req, res)=>{


    const params = {};

res.status(200). render('home.pug', params);
})
app.get('/contact', (req, res)=>{


    const params = {};

res.status(200). render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")

    })


    const params = {};

res.status(200). render('contact.pug', params);
})
// START THE SERVER
app.listen(port, ()=>{

console.log('The application started successfully on port ${port}');
});
  
