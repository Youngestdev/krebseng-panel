const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
    title: {
      type: String,
      trim: true,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now()
    },
    address: {
      type: String,
      trim: true,
      required: true
    },
    neighborhood: {
      type: String,
      trim: true,
      required: true
    },
    user: {
      type: String,
      trim: true,
      required: true
    }
  },
  {collection: 'building'}
);

BuildingSchema.index({title: 1}, {unique: true});

let BuildingModel = mongoose.model('Building', BuildingSchema);

module.exports = BuildingModel;
