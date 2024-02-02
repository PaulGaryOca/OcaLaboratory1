const express = require('express')
const mongoose = require('mongoose')
const Asong = require('./Songs')

const app = express()
const port = 3000

//build connection
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1/musicity',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(db=>console.log('DB is Connected'))
.catch(err=>console.log(err))

//
app.get('/', (req, res) => {
Asong.find()
.then(songs=>res.json(songs))
.catch(err=>res.json(err))
})


//search for a song using a title
app.get('/search_song/:title', (req, res) => {
    const title = req.params.title;
    Asong.findOne({ title: title })
        .then(post => res.json(post))
        .catch(err => console.log("No Song Found"));
});

//search for an artist
app.get('/search_artist/:artist', (req, res) => {
    const artist = req.params.artist;
    Asong.find({ artist: artist })
        .then(post => res.json(post))
        .catch(err => console.log("No Artist Found"));
});


//search for an ablum
app.get('/search_album/:album', (req, res) => {
    const album = req.params.album;
    Asong.find({ album: album })
        .then(post => res.json(post))
        .catch(err => console.log("No Album Found"));
});


//create a new song
app.post('/upload_song',(req,res)=>{

    Asong.create(req.body)
    .then(songs=>res.json(songs))
    .catch(err=>res.json(err))
})

//update a song
app.put('/update_song/:id',(req,res)=>{
    const id = req.params.id;
    Asong.findByIdAndUpdate({_id:id},{
        title : req.body.title,
        artist : req.body.artist ,
        album : req.body.album,
        year : req.body.year,
        genre: req.body.genre
    })
    .then(songs=>res.json(songs))
    .catch(err=>res.json(err))

})

//delete a song
app.delete('/delete_song/:title',(req,res)=>{
    const title = req.params.title
    Asong.findOneAndDelete({title:title})
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})