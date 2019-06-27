"use strict";

import * as express from "express";
import * as error from "../server/error";
import { onlyLoggedIn } from "../token/passport";
import { ISessionRequest } from "../user/service";
import * as service from "./service";

/**
 * Modulo de mascotas de usuario
 */
export function initModule(app: express.Express) {
  // Rutas de acceso a mascotas
  app
    .route("/v1/album")
    .post(onlyLoggedIn, create);

  app
    .route("/v1/album/:petId")
    .get(onlyLoggedIn, findByPet);

  app
    .route("/v1/album/:albumId")
    .delete(onlyLoggedIn, removeById);
}


/**
 * @api {get} /v1/album/:petId Buscar Album de mascota
 * @apiName Listar Album
 * @apiGroup Album
 *
 * @apiDescription Obtiene el album de la mascota.
 *
 * @apiSuccessExample {json} Album
 *  [
 *    {
 *      "id": "Id del album"
 *      "name": "Nombre del album",
 *      "description": "Descripción dl album",
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
async function findByPet(req: ISessionRequest, res: express.Response) {
  const result = await service.findByPet(req.user.user_id, req.params.petId);
  res.json(result.map(u => {
    return {
      id: u.id,
      name: u.name,
      description: u.description,
      updateDate: u.updateDate
    };
  }));
}


/**
 * @api {post} /v1/pet Crear Mascota
 * @apiName Crear Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Crea una mascota.
 *
 * @apiExample {json} Mascota
 *    {
 *      "id": "Id mascota"
 *    }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function create(req: ISessionRequest, res: express.Response) {
    const result = await service.update(undefined, req.body);
    res.json({
      id: result.id
    });
  }

/**
 * @api {delete} /v1/album/:albumId Eliminar album
 * @apiName Eliminar album
 * @apiGroup album
 *
 * @apiDescription Eliminar un album.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */

async function removeById(req: ISessionRequest, res: express.Response) {
  await service.remove(req.params.albumId);
  res.send();
}

