import React from "react";
import { deletePet, loadPet, newPet, savePet } from "../../api/petsApi";
import "../../styles.css";
import CommonComponent, { ICommonProps } from "../../tools/CommonComponent";
import ErrorLabel from "../../tools/ErrorLabel";

interface IState {
    birthDate: string;
    description: string;
    id: string;
    name: string;
}

export default class NewPet extends CommonComponent<ICommonProps, IState> {
    constructor(props: ICommonProps) {
        super(props);

        this.state = {
            birthDate: "",
            description: "",
            id: "",
            name: "",
        };
    }

    public async componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            try {
                const result = await loadPet(id);
                this.setState(result);
            } catch (error) {
                this.processRestValidations(error);
            }
        }
    }

    public deleteClick = async () => {
        if (this.state.id) {
            try {
                await deletePet(this.state.id);
                this.props.history.push("/pets");
            } catch (error) {
                this.processRestValidations(error);
            }
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
            if (this.state.id) {
                await savePet(this.state);
            } else {
                await newPet(this.state);
            }
            this.props.history.push("/pets");
        } catch (error) {
            this.processRestValidations(error);
        }
    }

    public render() {
        return (
            <div className="global_content">
                <h2 className="global_title">Nueva Mascota</h2>

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

                    <div className="form-group">
                        <label>Fecha de Nacimiento</label>
                        <input id="birthDate" type="text"
                            value={this.state.birthDate}
                            onChange={this.updateState}
                            className={this.getErrorClass("birthDate", "form-control")}>
                        </input>
                        <ErrorLabel error={this.getErrorText("birthDate")} />
                    </div>

                    <div hidden={!this.errorMessage}
                        className="alert alert-danger"
                        role="alert">
                        {this.errorMessage}
                    </div>

                    <div className="btn-group ">
                        <button className="btn btn-primary" onClick={this.saveClick}>Guardar</button>

                        <button hidden={!this.state.id}
                            className="btn btn-warning"
                            onClick={this.deleteClick}>Eliminar</button>

                        <button className="btn btn-light" onClick={this.goHome} >Cancelar</button >
                    </div >
                </form >
            </div>
        );
    }
}
