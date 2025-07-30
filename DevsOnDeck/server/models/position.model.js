const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "the Name is required "],
  },
  Description: {
    type: String,
    required: [true, "the Description is required "],
  },
  Skills: {
    type: Array, 
    
  },
}, { timestamps: true });

const Position = mongoose.model("Position", PositionSchema);

module.exports = Position;