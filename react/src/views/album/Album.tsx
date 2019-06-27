import React from "react";
import { deleteAlbum, IAlbum, loadAlbum } from "../../api/albumApi";
import "../../styles.css";
import CommonComponent, { ICommonProps } from "../../tools/CommonComponent";
import Imagenes from "./Imagenes";

interface IState {
   album: IAlbum[];
}

export default class Album extends CommonComponent<ICommonProps, IState> {
    constructor(props: ICommonProps) {
        super(props);

        this.state = {
           album: [],
        };

        this.loadAlbum();
    }

    public loadAlbum = async () => {
        try {
            const petId = this.props.match.params.id;
            const result = await loadAlbum(petId);
            this.setState({
                album: result,
            });
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public albumClick = (albumId: string) => {
        this.props.history.push("/imagenes/" + albumId);
    }

    public newAlbumClick = () => {
        const petId = this.props.match.params.id;
        this.props.history.push("/newAlbum/" + petId);
    }

    public deleteClick = async (albumId: string) => {
        if (albumId) {
            try {
                await deleteAlbum(albumId);
                this.loadAlbum();
                this.props.history.push("/album/" + this.props.match.params.id);
            } catch (error) {
                this.processRestValidations(error);
            }
        }
    }

    public render() {
        return (
            <div className="global_content">
                <h2 className="global_title">Album de Fotografias</h2>

                <table id="album" className="table">
                    <head>
                        <tr>
                            <th> Nombre </th>
                            <th> Descripción </th>
                            <th> </th>
                        </tr>
                    </head>
                    <tbody>
                        {this.state.album.map((album, i) => {
                            return (
                                <tr key={i}>
                                    <td>{album.name}</td>
                                    <td>{album.description}</td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => this.deleteClick(album.id)}>Eliminar</button>
                                    <td className="text">
                                        <img
                                            src="/assets/album.png"
                                            alt=""
                                            title="Album"
                                            onClick={() => this.albumClick(album.id)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="btn-group ">
                    <button className="btn btn-success" onClick={this.newAlbumClick}>Nuevo Album</button >
                    <button className="btn btn-light" onClick={this.goHome} >Cancelar</button >
                </div >
            </div>
        );
    }
}

   /* <div className="row">
                    <div className="col-12 p-5 row">
                        {this.state.imagesIDs.map((imagen) => (
                            <Imagenes imagenes={getPictureUrl(imagen)}/>
                        ))}

                    </div>
                </div> */
