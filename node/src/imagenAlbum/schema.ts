"use strict";

import * as mongoose from "mongoose";

export interface IImagenAlbum extends mongoose.Document {
  updated: Date;
  album: string;
  picture: string;
  enabled: Boolean;
}
/**
 * Esquema del ImagenAlbum
 */
export let ImagenAlbumSchema = new mongoose.Schema({
  album: {
    type: String,
    ref: "Image"
  },
  picture: {
    type: String,
    ref: "Image"
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "imagenAlbums" });


/**
 * Antes de guardar
 */
ImagenAlbumSchema.pre("save", function (this: IImagenAlbum, next) {
  this.updated = new Date();

  next();
});

export let ImagenAlbum = mongoose.model<IImagenAlbum>("ImagenAlbum", ImagenAlbumSchema);
