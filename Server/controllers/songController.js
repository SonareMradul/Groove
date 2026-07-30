const Song = require("../models/Song");
const path = require("path");

exports.uploadSong = async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;

    const song = await Song.create({
      title,
      artist,
      album,
      genre,
      coverImage: req.files.cover[0].filename,
      audioUrl: req.files.song[0].filename,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Song Uploaded Successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.streamSong = async (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "../uploads/songs",
      req.params.filename
    );

    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();

    res.json({
      success: true,
      songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.searchSongs = async (req, res) => {
  try {
    const { q } = req.query;

    // Empty search
    if (!q || q.trim() === "") {
      return res.status(200).json([]);
    }

    const songs = await Song.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { artist: { $regex: q, $options: "i" } },
        { album: { $regex: q, $options: "i" } },
      ],
    });

    res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error searching songs",
    });
  }
};