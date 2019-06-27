import React from "react";
import { newAlbumImagen } from "../../api/albumApi";
import "../../styles.css";
import CommonComponent, { ICommonProps } from "../../tools/CommonComponent";
import ErrorLabel from "../../tools/ErrorLabel";

interface IState {
    id: string;
    name: string;
    updateDate: string;
    description: string;
    petId: string;
}

export default class NewAlbum extends CommonComponent<ICommonProps, IState> {
    constructor(props: ICommonProps) {
        super(props);

        this.state = {
            description: "",
            id: "",
            name: "",
            petId: this.props.match.params.petId,
            updateDate: "",
        };

        this.loadAlbum();
    }
    public loadAlbum = async () => {
        try {
            const petId = this.props.match.params.petId;
            this.setState({
                petId,
            });
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public saveClick = async () => {
        this.cleanRestValidations();
        if (!this.state.name) {
            this.addError("name", "No puede estar vacío");
        }

        if (this.hasErrors()) {
            this.forceUpdate();
            return;
        }

        try {
            // if (this.state.id) {
            //     await savePet(this.state);
            // } else {
            await newAlbumImagen(this.state);
            // }
            this.props.history.push("/album/" + this.props.match.params.petId);
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public render() {
        return (
            <div className="global_content">
                <h2 className="global_title">Nuevo Album</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input id="name" type="text"
                            value={this.state.name}
                            onChange={this.updateState}
                            className={this.getErrorClass("name", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("name")} />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <input id="description" type="text"
                            value={this.state.description}
                            onChange={this.updateState}
                            className={this.getErrorClass("description", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("description")} />
                    </div>
                    <div hidden={!this.errorMessage}
                        className="alert alert-danger"
                        role="alert">
                        {this.errorMessage}
                    </div>

                    <div className="btn-group ">
                        <button className="btn btn-primary" onClick={this.saveClick}>Guardar</button>

                        <button className="btn btn-light" onClick={this.goHome} >Cancelar</button >
                    </div >
                </form >
            </div>
        );
    }
}
