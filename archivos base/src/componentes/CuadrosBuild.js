import React, { Component } from "react";
import { connect } from "react-redux";

export class CuadrosBuild extends Component {
  render() {
    const { valor, objetos } = this.props;
    var imagen = "";

    objetos.forEach(objeto => {
      if (objeto.name == valor) {
        imagen = objeto.icon;
      }
    });

    return (
      <div className="cuadroBuild" onClick={this.props.click.bind(this)}>
        {valor != undefined ? <img src={imagen} /> : null}
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
)(CuadrosBuild);
