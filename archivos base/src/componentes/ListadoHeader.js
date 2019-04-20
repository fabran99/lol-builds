import React, { Component } from "react";
import { searchChamps } from "../actions/champsActions";
import { connect } from "react-redux";

export class ListadoHeader extends Component {
  cleanSearch() {
    this.props.searchChamps({ select: "", search: "" });
  }

  render() {
    const { search, select, cantidad } = this.props.filtro;
    var clase;
    switch (select) {
      case "Fighter":
        clase = "Luchador";
        break;
      case "Tank":
        clase = "Tanque";
        break;
      case "Mage":
        clase = "Mago";
        break;
      case "Assassin":
        clase = "Asesino";
        break;
      case "Support":
        clase = "Soporte";
        break;
      case "Marksman":
        clase = "Adc (Tirador)";
        break;

      default:
        clase = "Todas las clases";
        break;
    }

    return (
      <div className="header">
        <h2>
          Clase: <small>{clase}</small>
        </h2>
        {search == "" ? null : (
          <h2>
            Has buscado: <small>{search}</small>
          </h2>
        )}
        <h3>
          {cantidad} resultado{cantidad != 1 ? "s" : null}
        </h3>
        <div className="clear" onClick={this.cleanSearch.bind(this)}>
          Limpiar búsqueda
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { searchChamps }
)(ListadoHeader);
