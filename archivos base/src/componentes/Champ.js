import React, { Component } from "react";
import { searchChamps, getChamp } from "../actions/champsActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CuadrosBuild from "./CuadrosBuild";

export class Champ extends Component {
  state = {
    visible: false,
    objeto: {}
  };
  componentDidMount() {
    var champId = this.props.match.params.id;
    this.props.getChamp(champId);
    window.scrollTo({ top: 0 });
  }

  selectClass(select) {
    this.props.searchChamps({ select, search: "" });
  }

  click(name) {
    var { objetos } = this.props;
    var objeto = {};

    objetos.forEach(item => {
      if (item.name == name) {
        objeto = item;
      }
    });

    this.setState({
      objeto,
      visible: true
    });
  }

  toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    var champId = this.props.match.params.id;
    var { name, tags, title, icon } = this.props.champActual;
    var { objetos, builds } = this.props;
    var datosBuild = {};
    var existe = false;
    builds.forEach(build => {
      if (build.champ == champId) {
        datosBuild = build;
        existe = true;
      }
    });

    var build = {};

    var keys = Object.keys(datosBuild);

    keys.forEach((key, index) => {
      if (key != "champ") {
        build[key] = [];
        datosBuild[key].forEach(nombreObjeto => {
          objetos.forEach(objeto => {
            if (objeto.name == nombreObjeto) {
              build[key].push(objeto);
            }
          });
        });
      }
    });

    var keys = Object.keys(build);
    var titulos = [
      "Objetos iniciales",
      "Objetos iniciales (Support)",
      "Build",
      "Build (Support)"
    ];

    var cuadros = keys.map((key, index) => {
      return (
        <div key={index} className="col-md-6 cuadros">
          <h4>{titulos[index]}</h4>
          <div className="cuadrosBuild">
            {build[key].map((objeto, i) => {
              return (
                <CuadrosBuild
                  valor={objeto.name}
                  key={i}
                  click={this.click.bind(this, objeto.name)}
                />
              );
            })}
          </div>
        </div>
      );
    });

    var champId = this.props.match.params.id;
    var newTags = [];
    if (icon && tags) {
      icon = `https${icon.split("http")[1]}`;
      tags.forEach(tag => {
        switch (tag) {
          case "Fighter":
            newTags.push("Luchador");
            break;
          case "Tank":
            newTags.push("Tanque");
            break;
          case "Mage":
            newTags.push("Mago");
            break;
          case "Assassin":
            newTags.push("Asesino");
            break;
          case "Support":
            newTags.push("Soporte");
            break;
          case "Marksman":
            newTags.push("Adc (Tirador)");
            break;

          default:
            break;
        }
      });

      // popup
      var nombre = this.state.objeto.name;
      var icono = this.state.objeto.icon;
      var type = this.state.objeto.type;
      var price = this.state.objeto.price;

      const { visible } = this.state;

      return (
        <div className="champContainer">
          {visible ? (
            <div className="popUp">
              <div className="popData">
                <i className="fas fa-times" onClick={this.toggle.bind(this)} />
                <div className="imagen">
                  <img src={icono} alt={nombre} />
                </div>
                <p>{nombre}</p>
                <p>Tipo: {type}</p>
                <p>Precio: {price}</p>
              </div>
            </div>
          ) : null}
          <div className="container-fluid">
            <div className="champ">
              <div className="header">
                <div className="imagen">
                  <img src={icon} alt={name} />
                </div>
                <div className="name ">
                  <h1>{name}</h1>
                  <h4>{title}</h4>
                  <div className="tags">
                    {tags.map((tag, index) => {
                      return (
                        <Link
                          to="/"
                          key={index}
                          onClick={this.selectClass.bind(this, tag)}
                        >
                          {newTags[index]}{" "}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="buildsContainer">
                {existe ? (
                  <div className="build">
                    <div className="row">{cuadros}</div>
                  </div>
                ) : (
                  <h2>No hay builds disponibles para este campeón.</h2>
                )}
                <div className="add">
                  <Link to={"/builds/" + champId}>Crear build</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="loading">Cargando...</div>;
    }
  }
}

const mapStateToProps = state => ({
  champActual: state.champs.champActual,
  objetos: state.champs.objetos,
  builds: state.champs.builds
});

export default connect(
  mapStateToProps,
  { searchChamps, getChamp }
)(Champ);
