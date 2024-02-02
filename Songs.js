
const mongoose =require('mongoose')

const SongSchema = new mongoose.Schema({


    title : String,
    artist : String ,
    album : String,
    year : Number,
    genre: String

})
const Asong = mongoose.model("songs",SongSchema)
module.exports = Asong;
