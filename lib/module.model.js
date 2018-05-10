'use strict';

/**
 * @module Module
 * @name Module
 * @description Describe module here
 *
 * @author <Author name><Author@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 *
 *  const { Module } = require('majifix-module');
 */

/* dependencies */
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const Schema = mongoose.Schema;

/* local constants */
const MODEL_NAME = 'Module';

const ModuleSchema = new Schema({

  /**
   * @name name
   * @description module name
   *
   * @type {object}
   * @property {object} type - Schema data type
   * @property {boolean} trim - force trimming
   * @property {object} fake - fake data generator options
   */
  name: {
    type: String,
    trim: true,
    fake: {
      generator: 'name',
      type: 'findName'
    }
  }
});


/* Statics */
ModuleSchema.statics.MODEL_NAME = MODEL_NAME;

/* Plugins */

/* use mongoose rest actions */
ModuleSchema.plugin(actions);

/* export Module model */
module.exports = mongoose.model(MODEL_NAME, ModuleSchema);

