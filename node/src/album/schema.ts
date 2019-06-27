"use strict";

import * as mongoose from "mongoose";

export interface IAlbum extends mongoose.Document {
    id: string;
    name: string;
    updateDate: Date;
    description: string;
    enabled: Boolean;
    petId: string;
}

/**
 * Esquema de Albums
 */
export let AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  updateDate: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  },
  petId: {
    type: String,
    ref: "Pet",
    required: "Mascota es requerido"
  },
}, { collection: "albums" });

/**
 * Antes de guardar
 */
AlbumSchema.pre("save", function (this: IAlbum, next) {
  this.updateDate = new Date();

  next();
});

export let Album = mongoose.model<IAlbum>("Album", AlbumSchema);