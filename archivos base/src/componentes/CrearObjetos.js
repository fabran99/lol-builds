import React, { Component } from "react";

export class CrearObjetos extends Component {
  state = {
    name: "",
    price: "",
    type: "",
    icon: "",
    lista: ""
  };

  handleInput(e) {
    var value = e.target.value;
    var name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  addList() {
    const { lista, name, price, type, icon } = this.state;
    var item = `\{
        "name": "${name}",
        "price": "${price}",
        "type": "${type}",
        "icon": "${icon}"
    },`;

    this.setState({
      lista: lista + item,
      name: "",
      price: "",
      type: "",
      icon: ""
    });
  }

  render() {
    const { name, price, type, icon, lista } = this.state;
    return (
      <div className="creador">
        <div className="container-fluid">
          <div className="container-creador">
            <div className="header">
              <h2>Crear objetos</h2>
            </div>
            <div className="campos row">
              <div className="campo col-md-6">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={this.handleInput.bind(this)}
                  placeholder="Nombre"
                  autoComplete="off"
                />
              </div>
              <div className="campo col-md-6">
                <label htmlFor="price">Precio</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  onChange={this.handleInput.bind(this)}
                  placeholder="Precio"
                  autoComplete="off"
                />
              </div>
              <div className="campo col-md-6">
                <label htmlFor="type">Tipo</label>
                <select
                  type="text"
                  name="type"
                  id="type"
                  value={type}
                  onChange={this.handleInput.bind(this)}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="Daño">Daño</option>
                  <option value="Magia">Magia</option>
                  <option value="Defensa">Defensa</option>
                  <option value="Inicio">Inicio</option>
                  <option value="Botas">Botas</option>
                </select>
              </div>
              <div className="campo col-md-6">
                <label htmlFor="icon">Icono</label>
                <input
                  type="text"
                  name="icon"
                  id="icon"
                  value={icon}
                  onChange={this.handleInput.bind(this)}
                  placeholder="Url del ícono"
                  autoComplete="off"
                />
              </div>
              <div className="add" onClick={this.addList.bind(this)}>
                Añadir
              </div>
            </div>
            <div className="resultado">
              <pre>{lista}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CrearObjetos;
