import React, { Component } from "react";
import Objeto from "./Objeto";
import { connect } from "react-redux";

export class ListadoObjetos extends Component {
  state = {
    dmg: false,
    ini: false,
    mag: false,
    def: false,
    bot: false
  };

  toggle(e) {
    var seccion = e.target.id;
    this.setState({
      [seccion]: !this.state[seccion]
    });
  }

  render() {
    const { objetos } = this.props;

    var secciones = ["ini", "dmg", "mag", "def", "bot"];
    var titulos = ["Inicio", "Daño", "Magia", "Defensa", "Botas"];

    var listado = secciones.map((seccion, index) => {
      return (
        <div className="seccion" key={index}>
          <h2 id={seccion} onClick={this.toggle.bind(this)}>
            {titulos[index]}
          </h2>
          <div className={`row ${this.state[seccion] ? "" : "d-none"}`}>
            {objetos.map(objeto => {
              if (objeto.type == titulos[index]) {
                return (
                  <Objeto
                    click={this.props.click.bind(this)}
                    key={objeto.name}
                    data={objeto}
                  />
                );
              }
            })}
          </div>
        </div>
      );
    });

    return (
      <div className="objetos">
        <h3>Listado de objetos</h3>
        {listado}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  objetos: state.champs.objetos
});

export default connect(
  mapStateToProps,
  null
)(ListadoObjetos);
