const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Artist = new Schema({
  name: String,
  dob: String,
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  stadium: { type: Schema.Types.ObjectId, ref: "Stadium" },
});

exports.artist = mongoose.model("Artist", Artist);

const Stadium = new Schema({
  name: String,
  about: String,
  img: String,
  artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
});
exports.stadium = mongoose.model("Stadium", Stadium);

const Song = new Schema({
  name: String,
  length: String,
  artist: { type: Schema.Types.ObjectId, ref: "Artist" },
});

exports.song = mongoose.model("Song", Song);
