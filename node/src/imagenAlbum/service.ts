"use strict";

import { IImagenAlbum, ImagenAlbum } from "./schema";
const mongoose = require("mongoose");
import * as error from "../server/error";
import * as provinces from "../provinces/service";
// import { ObjectID } from 'bson';
// import { createSessionToken } from '../token/passport';
// import Album from '../../../react/src/views/album/Album';

// async function findForUser(userId: string): Promise<IProfile> {
//   return await Profile.findOne({
//     user: escape(userId),
//     enabled: true
//   });
// }

// export async function read(userId: string): Promise<IProfile> {
//   try {
//     const profile = await findForUser(userId);
//     if (!profile) {
//       return Promise.resolve(new Profile());
//     }
//     return Promise.resolve(profile);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }


interface IUpdateProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
  province: string;
}
// async function validateProfile(body: IUpdateProfile, isNew: boolean): Promise<IUpdateProfile> {
//   const result: error.ValidationErrorMessage = {
//     messages: []
//   };

//   if (isNew && (!body.email || body.email.length <= 0)) {
//     result.messages.push({ path: "email", message: "No puede quedar vacío." });
//   }
//   if (body.email && body.email.length > 256) {
//     result.messages.push({ path: "email", message: "Hasta 256 caracteres solamente." });
//   }
//   if (isNew && (!body.name || body.name.length <= 0)) {
//     result.messages.push({ path: "name", message: "No puede quedar vacío." });
//   }
//   if (body.name && body.name.length > 1024) {
//     result.messages.push({ path: "name", message: "Hasta 1024 caracteres solamente." });
//   }
//   if (body.address && body.address.length > 1024) {
//     result.messages.push({ path: "address", message: "Hasta 1024 caracteres solamente." });
//   }
//   if (body.phone && body.phone.length > 32) {
//     result.messages.push({ path: "phone", message: "Hasta 32 caracteres solamente." });
//   }

//   if (body.province) {
//     const province = await provinces.read(body.province);
//     if (!province) {
//       result.messages.push({ path: "province", message: "No se encuentra." });
//     }
//   }

//   if (result.messages.length > 0) {
//     return Promise.reject(result);
//   }

//   return Promise.resolve(body);
// }
// export async function updateBasicInfo(userId: string, body: IUpdateProfile): Promise<IProfile> {
//   try {
//     let profile = await findForUser(userId);
//     const validatedBody = await validateProfile(body, !!profile);
//     if (!profile) {
//       profile = new Profile();
//       profile.id = mongoose.Types.ObjectId.createFromHexString(userId);
//       profile.user = mongoose.Types.ObjectId.createFromHexString(userId);
//     }

//     if (validatedBody.email) {
//       profile.email = validatedBody.email;
//     }

//     if (validatedBody.name) {
//       profile.name = validatedBody.name;
//     }
//     if (validatedBody.address) {
//       profile.address = validatedBody.address;
//     }
//     if (validatedBody.phone) {
//       profile.phone = validatedBody.phone;
//     }
//     if (validatedBody.province) {
//       profile.province = (await provinces.read(body.province))._id;
//     } else {
//       profile.province = undefined;
//     }

//     await profile.save();
//     return Promise.resolve(profile);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }

export async function findByAlbum(albumId: string): Promise<Array<IImagenAlbum>> {
  try {
    const result = await ImagenAlbum.find({
      album: albumId,
      enabled: true
    }).exec();
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function validateUpdateProfilePicture(imageId: string): Promise<void> {
  const result: error.ValidationErrorMessage = {
    messages: []
  };

  if (!imageId || imageId.length <= 0) {
    result.messages.push({ path: "image", message: "Imagen inválida." });
  }

  if (result.messages.length > 0) {
    return Promise.reject(result);
  }

  return Promise.resolve();
}
export async function createImagenAlbum(albumId: string, imageId: string): Promise<IImagenAlbum> {
  try {
    // let profile = await findForUser(userId);
    let imagenAlbum: IImagenAlbum;
    imagenAlbum = new ImagenAlbum;
    await validateUpdateProfilePicture(imageId);

    if (albumId) {
        imagenAlbum.album = mongoose.Types.ObjectId.createFromHexString(albumId);
    }
    if (imageId) {
        imagenAlbum.picture = imageId;
    }
    console.log("create imagen");
    console.log(imagenAlbum.picture);
    console.log("create album");
    console.log(imagenAlbum.album);
    await imagenAlbum.save();
    return Promise.resolve(imagenAlbum);
  } catch (err) {
    return Promise.reject(err);
  }
}