const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models/Persons');
const Story = require('./models/Stories');
const ejs = require('ejs')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res, next)=>{
    res.send('Home');
})

app.get('/addAuthor', (req,res,next)=>{
    const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ambika',
        age: 50
    });
    author.save().then(person =>{        
            const book = new Story({
               title:'Book-1',
                author:person._id
            }) 
            book.save().then(book =>{
                author.stories.push({storyId:book._id, cost:100});
                author.save()
                res.json({
                    conform:'success',
                    Author:author,
                    Book:book
                })
            })   
    })    
})

app.get('/addStories', (req,res,next)=>{
    Person.findOne({name:'Ambika'}).then(author => {
        const book = new Story({
            title:'Book-2',
            author:author._id
        }) 
        book.save().then(book=>{
            author.stories.push({storyId:book._id, cost:200});
            author.save();
            res.json({
                                conform:'success',
                                Author:author,
                                Book:book
                            })
        })
    })
    
})

app.get('/find', (req,res,next)=>{
    Person.findOne({name:'Ambika'}).populate('stories.storyId').then(name => {
        res.json({
            confirm:'success',
            People:name
        })
  });
})

app.get('/update', (req,res,next)=>{
    Person.updateOne({'stories.storyId':'5c8ddab5554a5435e852fec2'}, {$set:{'stories.$.cost': 300}}, {new:true}).then(name => {
        res.json({
            confirm:'success',
            People:name
        })
  });
})

mongoose.connect(encodeURI('mongodb+srv://Ambika:Dec%401986@cluster0-btzl5.mongodb.net/Information?retryWrites=true')).then(result => {    
    app.listen(3000, ()=>{
        console.log('server start at 3000')
    })
})