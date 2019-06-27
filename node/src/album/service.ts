"use strict";

import { IAlbum, Album } from "./schema";
import * as error from "../server/error";
import { json } from "express";
const mongoose = require("mongoose");

export async function findByPet(userId: string, petId: string): Promise<Array<IAlbum>> {
  try {
    const result = await Album.find({
      petId: petId,
      enabled: true
    }).exec();
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function update(albumId: string, body: IAlbum): Promise<IAlbum> {
  try {
    debugger;
    let current: IAlbum;
      current = new Album();
      current.petId = body.petId;
      console.log(body.petId);

    const validBody = await validateUpdate(body);
    if (validBody.name) {
      current.name = validBody.name;
    }
    if (validBody.description) {
      current.description = validBody.description;
    }
    if (validBody.updateDate) {
      current.updateDate = validBody.updateDate;
    }
    await current.save();
    return Promise.resolve(current);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function validateUpdate(body: IAlbum): Promise<IAlbum> {
  const result: error.ValidationErrorMessage = {
    messages: []
  };

  if (body.name && body.name.length > 256) {
    result.messages.push({ path: "name", message: "Hasta 256 caracteres solamente." });
  }

  if (body.description && body.description.length > 1024) {
    result.messages.push({ path: "description", message: "Hasta 2014 caracteres solamente." });
  }

  if (result.messages.length > 0) {
    return Promise.reject(result);
  }

  return Promise.resolve(body);
}

export async function remove(albumId: string): Promise<void> {
  try {
    const album = await Album.findOne({
      _id: albumId,
      enabled: true
    }).exec();
    if (!album) {
      throw error.ERROR_NOT_FOUND;
    }
    album.enabled = false;
    await album.save();
  } catch (err) {
    return Promise.reject(err);
  }
}