import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchChamps } from "../actions/champsActions";
import { connect } from "react-redux";

export class ItemListado extends Component {
  filtrarClase(clase) {
    this.props.searchChamps({ select: clase, search: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  render() {
    var { name, icon, tags, id } = this.props.data;
    icon = `https${icon.split("http")[1]}`;

    return (
      <div className="col-sm-12 col-md-6 col-xl-4">
        <div className="itemListado">
          <div className="championName">
            <Link to={`/champs/${id}`}>
              <h3>{name}</h3>
            </Link>
          </div>
          <div className="champion-data">
            <div className="image">
              <Link to={`/champs/${id}`}>
                <img src={icon} alt={name} />
              </Link>
            </div>
            <div className="tags">
              <h5>Clases</h5>
              <ul>
                {tags.map((tag, index) => {
                  var newtag;
                  switch (tag) {
                    case "Fighter":
                      newtag = "Luchador";
                      break;
                    case "Tank":
                      newtag = "Tanque";
                      break;
                    case "Mage":
                      newtag = "Mago";
                      break;
                    case "Assassin":
                      newtag = "Asesino";
                      break;
                    case "Support":
                      newtag = "Soporte";
                      break;
                    case "Marksman":
                      newtag = "Adc (Tirador)";
                      break;

                    default:
                      break;
                  }

                  return (
                    <li key={index} onClick={this.filtrarClase.bind(this, tag)}>
                      {newtag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="boton">
              <Link to={`/champs/${id}`}>Ver builds</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { searchChamps }
)(ItemListado);
