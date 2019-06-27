import React from "react";
import { getPictureUrl, IImagenAlbum, loadAlbumImagenes, newImagen } from "../../api/albumApi";
import "../../styles.css";
import CommonComponent, { ICommonProps } from "../../tools/CommonComponent";
import ImageUpload from "../../tools/ImageUpload";

interface IState {
    imagenesBase64: IImagenAlbum[];
    imagenNueva: string;
}

export default class Imagenes extends CommonComponent<ICommonProps, IState> {
    constructor(props: ICommonProps) {
        super(props);

        this.state = {
            imagenNueva: "",
            imagenesBase64: [],
        };

        this.loadAlbum();
    }

    public loadAlbum = async () => {
        try {
            const albumId = this.props.match.params.albumId;
            const result = await loadAlbumImagenes(albumId);
            this.setState({
                imagenesBase64: result,
            });
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public newImagen = () => {
        const albumId = this.props.match.params.albumId;
        this.props.history.push("/newImagen/" + albumId);
    }
    public savePicture = async (image: string) => {
        const albumId = this.props.match.params.albumId;
        try {
            const result = await newImagen({
                albumId,
                image,
            });
            this.setState({
                imagenNueva: result.id,
            });
            this.loadAlbum();
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public uploadPicture = async (image: string) => {
        try {
            console.log("hola");
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public render() {
    return(
        <div>
            <h1>Imagenes del album</h1>
            <div className="col-12 p-5 row">
                {this.state.imagenesBase64.map((imagen, i) => {
                    return (
                        <tr key={i}>
                            <td><ImageUpload src={getPictureUrl(imagen.picture)}
                            title=""
                            onChange={this.uploadPicture} /></td>
                        </tr>
                    );
                })}
            </div>
                <br></br>
            <div className="btn-group ">
            <div className="form-group">
                        <ImageUpload src="/assets/descarga.png"
                        title="Agregar imagen"
                            onChange={this.savePicture} />
                    </div>
                    <button className="btn btn-light" onClick={this.goHome} >Cancelar</button >
            </div >
        </div>
    );

    }
}
