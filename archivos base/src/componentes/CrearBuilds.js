import React, { Component } from "react";
import { connect } from "react-redux";
import ListadoObjetos from "./ListadoObjetos";
import { searchChamps } from "../actions/champsActions";
import { Link } from "react-router-dom";
import CuadrosBuild from "./CuadrosBuild";

export class CrearBuilds extends Component {
  state = {
    inicial: [],
    inicialSupport: [],
    build: [],
    buildSupport: [],
    actual: "build"
  };

  selectClass(select) {
    this.props.searchChamps({ select, search: "" });
  }

  resetear() {
    this.setState({
      inicial: [],
      inicialSupport: [],
      build: [],
      buildSupport: [],
      actual: "inicial"
    });
  }

  generar() {
    const { inicial, inicialSupport, build, buildSupport } = this.state;
    console.log(`${(inicial[0], inicial[1], inicial[2])}`);
    var generado = `{
      "champ": "${this.props.match.params.champ}",
      "inicial": ["${inicial[0]}" , "${inicial[1]}", "${inicial[2]}"],
      "inicialSupport": ["${inicialSupport[0]}",
      "${inicialSupport[1]}",
      "${inicialSupport[2]}"],
      "build": ["${build[0]}", "${build[1]}", "${build[2]}","${build[3]}",
    "${build[4]}",
    "${build[5]}"],
      "buildSupport": ["${buildSupport[0]}",
      "${buildSupport[1]}",
      "${buildSupport[2]}","${buildSupport[3]}", "${buildSupport[4]}", "${
      buildSupport[5]
    }"]
    },`;

    this.setState({
      generado
    });
  }

  addItem(objectName) {
    const { actual } = this.state;
    var variables = ["inicial", "inicialSupport", "build", "buildSupport"];
    var cantidad = [3, 3, 6, 6];

    if (actual != "") {
      variables.forEach((variable, index) => {
        if (
          actual == variable &&
          this.state[variable].length < cantidad[index]
        ) {
          this.setState({
            [variable]: [...this.state[variable], objectName]
          });
        }
      });

      // si quiero pasar al siguiente automaticamente activo esto
      // variables.forEach((variable, index) => {
      //   if (
      //     actual == variable &&
      //     this.state[variable].length == cantidad[index]
      //   ) {
      //     if (index < 3) {
      //       this.setState({
      //         actual: variables[index + 1],
      //         [variables[index + 1]]: [
      //           ...this.state[variables[index + 1]],
      //           icono
      //         ]
      //       });
      //     } else {
      //       this.setState({
      //         actual: ""
      //       });
      //     }
      //   }
      // });
    }
  }

  changeActual(e) {
    var actual = e.target.value;
    this.setState({
      actual
    });
  }

  deleteItem(tipo, posicion) {
    this.setState({
      [tipo]: this.state[tipo].filter((valor, i) => {
        return i != posicion;
      })
    });
  }

  componentDidMount() {
    const id = this.props.match.params.champ;
    const { champs } = this.props;
    var data = {};
    var newTags = [];
    // busco el dato
    champs.forEach(champ => {
      if (champ.id == id) {
        data = champ;
      }
    });
    const { tags } = data;
    var clases = ["Fighter", "Tank", "Support", "Marksman", "Mage", "Assassin"];
    var predefinidos = {
      Fighter: {
        inicial: ["Espada larga", "Poción de vida", "Tótem guardián"],
        inicialSupport: ["Escudo reliquia", "Poción de vida", "Tótem guardián"],
        build: [
          "Espada Fantasma de Youmuu",
          "La Cuchilla Oscura",
          "Botas de mercurio"
        ],
        buildSupport: [
          "Restos del aspecto",
          "Botas de mercurio",
          "Promesa del caballero"
        ]
      },
      Tank: {
        inicial: ["Escudo de Doran", "Poción de vida", "Tótem guardián"],
        inicialSupport: ["Escudo reliquia", "Poción de vida", "Tótem guardián"],
        build: [
          "Tabi de ninja",
          "Capa de fuego solar",
          "Apariencia espiritual"
        ],
        buildSupport: [
          "Restos del aspecto",
          "Tabi de ninja",
          "Promesa del caballero"
        ]
      },
      Support: {
        inicial: ["Sortija de doran", "Poción de vida", "Tótem guardián"],
        inicialSupport: [
          "Filo del robahechizos",
          "Poción de vida",
          "Tótem guardián"
        ],
        build: [
          "Pebetero ardiente",
          "Botas jonias de lucidez",
          "Cetro de cristal de Rylai"
        ],
        buildSupport: [
          "Restos de los vigilantes",
          "Botas jonias de lucidez",
          "Redención"
        ]
      },
      Marksman: {
        inicial: ["Espada de Doran", "Poción de vida", "Tótem guardián"],
        inicialSupport: ["Escudo reliquia", "Poción de vida", "Tótem guardián"],
        build: ["Filo del infinito", "Daga de statikk", "Grebas de berserker"],
        buildSupport: ["Restos del aspecto", "Solari", "Grebas de berserker"]
      },
      Mage: {
        inicial: ["Sortija de doran", "Poción de vida", "Tótem guardián"],
        inicialSupport: [
          "Filo del robahechizos",
          "Poción de vida",
          "Tótem guardián"
        ],
        build: [
          "Eco de Luden",
          "Botas del hechicero",
          "Reloj de arena de Zhonya"
        ],
        buildSupport: [
          "Restos de los vigilantes",
          "Botas del hechicero",
          "Eco de Luden"
        ]
      },
      Assassin: {
        inicial: ["Espada de Doran", "Poción de vida", "Tótem guardián"],
        inicialSupport: ["Escudo reliquia", "Poción de vida", "Tótem guardián"],
        build: [
          "Espada Fantasma de Youmuu",
          "La Cuchilla Oscura",
          "Botas de mercurio"
        ],
        buildSupport: ["Restos del aspecto", "Solari", "Promesa del caballero"]
      }
    };

    if (tags[0] != undefined) {
      const { inicial, inicialSupport, build, buildSupport } = predefinidos[
        tags[0]
      ];
      this.setState({
        inicial,
        inicialSupport,
        build,
        buildSupport
      });
    }
  }
  render() {
    const id = this.props.match.params.champ;
    const { champs } = this.props;
    var data = {};
    var newTags = [];
    // busco el dato
    champs.forEach(champ => {
      if (champ.id == id) {
        data = champ;
      }
    });
    const { name, icon, tags } = data;
    const { generado, actual } = this.state;

    // cambio las tags
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

    ///////////////////////////////////////
    // organizo los cuadros de las builds
    ///////////////////////////////////////
    var titulos = [
      "Objetos iniciales",
      "Objetos iniciales (Support)",
      "Build",
      "Build (Support)"
    ];
    var variables = ["inicial", "inicialSupport", "build", "buildSupport"];
    var cantidades = [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6]
    ];

    const cuadros = titulos.map((titulo, index) => {
      return (
        <div key={index}>
          <h4>{titulo}:</h4>
          <div
            className="cuadrosBuild"
            style={{ borderColor: actual == variables[index] ? "grey" : "" }}
          >
            {cantidades[index].map((cantidad, i) => {
              return (
                <CuadrosBuild
                  key={i}
                  valor={this.state[variables[index]][i]}
                  click={this.deleteItem.bind(this, variables[index], i)}
                />
              );
            })}
          </div>
        </div>
      );
    });

    // return

    return (
      <div className="creador">
        <div className="container-fluid">
          <div className="container-creador">
            <div className="header">
              <h2>Crear Builds</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="champData">
                  <div className="image">
                    <img src={icon} alt={name} />
                  </div>
                  <div className="datos">
                    <Link to={"/champs/" + id}>
                      <h2>{name}</h2>
                    </Link>
                    <div className="tags">
                      {tags.map((tag, index) => {
                        return (
                          <Link
                            key={index}
                            to="/"
                            onClick={this.selectClass.bind(this, tag)}
                          >
                            {newTags[index]}{" "}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="build">
                  <div className="select">
                    <p>Modificando:</p>{" "}
                    <select
                      value={actual}
                      onChange={this.changeActual.bind(this)}
                    >
                      {titulos.map((titulo, index) => {
                        return (
                          <option key={index} value={variables[index]}>
                            {titulo}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* {cuadros de las builds} */}
                  {cuadros}
                  <button onClick={this.generar.bind(this)}>
                    Generar código
                  </button>
                  <button onClick={this.resetear.bind(this)}>Resetear</button>
                </div>
              </div>
              <div className="col-md-6">
                <ListadoObjetos click={this.addItem.bind(this)} />
              </div>
            </div>
            <div className="resultado">{generado}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  champs: state.champs.champs,
  objetos: state.champs.objetos
});

export default connect(
  mapStateToProps,
  { searchChamps }
)(CrearBuilds);
