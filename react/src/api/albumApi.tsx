import axios, { AxiosError } from "axios";
import { logout } from "../store/sessionStore";

axios.defaults.headers.common["Content-Type"] = "application/json";

export interface IAlbum {
    id: string;
    name: string;
    updateDate: string;
    description: string;
}

export interface IImagenAlbum {
    updated: Date;
    album: string;
    picture: string;
    enabled: boolean;
}

export async function loadAlbum(petId: string): Promise<IAlbum[]> {
    try {
        const res = await axios.get("http://localhost:3000/v1/album/" + petId);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function loadAlbumImagenes(albumId: string): Promise<IImagenAlbum[]> {
    try {
        const res = await axios.get("http://localhost:3000/v1/album/pictures/" + albumId);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export function getPictureUrl(id: string) {
    if (id && id.length > 0) {
        return "http://localhost:3000/v1/image/" + id;
    } else {
        return "/assets/profile.png";
    }
}
export async function newAlbumImagen(payload: IAlbum): Promise<IAlbum> {
    try {
        const res = await axios.post("http://localhost:3000/v1/album", payload);
        return Promise.resolve(res.data as IAlbum);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}
export interface ISaveImage {
    albumId: string;
    image: string;
}
export interface ISaveImageId {
    id: string;
}

export async function newImagen(payload: ISaveImage): Promise<ISaveImageId> {
    try {
        console.log("nueva imagen from");
        console.log(payload);
        const res = await axios.post("http://localhost:3000/v1/album/pictures", payload);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function deleteAlbum(id: string): Promise<void> {
    try {
        await axios.delete("http://localhost:3000/v1/album/" + id);
        return Promise.resolve();
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}
