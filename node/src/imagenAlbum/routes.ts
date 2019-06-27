"use strict";

import * as express from "express";
import * as imageService from "../image/service";
import * as ImagenAlbumService from "./service";
import * as service from "./service";
import { onlyLoggedIn } from "../token/passport";
import { ISessionRequest } from "../user/service";
import { ImagenAlbum } from "./schema";

/**
 * Modulo de imágenes de album
 */
export function initModule(app: express.Express) {
  // Rutas del controlador
  app
    .route("/v1/album/pictures/:albumId")
    .get(onlyLoggedIn, findByAlbum);
  app
    .route("/v1/album/pictures")
    .post(onlyLoggedIn, updateAlbumPicture);
}

/**
 * @api {post} /v1/album/picture Guardar Imagen de Album
 * @apiName Guardar Imagen de Album
 * @apiGroup Album
 *
 * @apiDescription Guarda una imagen de un album  en la db y actualiza el la entidad ImagenAlbum
 *
 * @apiExample {json} Body
 *    {
 *      "image" : "Base 64 Image Text"
 *    }
 *
 * @apiSuccessExample {json} Response
 *    {
 *      "id": "id de imagen"
 *    }
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function updateAlbumPicture(req: ISessionRequest, res: express.Response) {
  const imageResult = await imageService.create(req.body);
  const imagenAlbumResult = await ImagenAlbumService.createImagenAlbum(req.body.albumId, imageResult.id);

  res.json({
    id: imagenAlbumResult.picture
  });
}

/**
 * @api {get} /v1/pet Obtiene todos los ids imagenes de un album
 * @apiName Listar imagenes
 * @apiGroup Album
 *
 * @apiDescription Obtiene un listado de los ids de las imagenes de un album.
 *
 * @apiSuccessExample {json} Mascota
 *  [
 *    {
 *      "id": "Id de imagenAlbum"
 *      "album": "id del album",
 *      "picture": "id de la imagen"
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
async function findByAlbum(req: ISessionRequest, res: express.Response) {
  const result = await service.findByAlbum(req.params.albumId);
  res.json(result.map(u => {
    return {
      id: u.id,
      album: u.album,
      picture: u.picture
    };
  }));
}