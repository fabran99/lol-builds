import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchChamps } from "../actions/champsActions";
import { connect } from "react-redux";
import GoTop from "./GoTop";

export class Menu extends Component {
  state = {
    visible: false,
    select: "",
    search: ""
  };

  // alternar menu
  toggleMenu(limpiar) {
    this.setState({
      visible: !this.state.visible
    });
    if (limpiar) {
      this.props.searchChamps({ select: "", search: "" });
    }
  }
  // manejar inputs
  inputChange(e) {
    var value = e.target.value;
    var name = e.target.name;
    this.setState({
      [name]: value
    });
  }
  // enviar busqueda
  sendSearch() {
    const { search, select } = this.state;
    this.toggleMenu(false);
    this.props.searchChamps({ search, select });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render() {
    const { visible, select, search } = this.state;
    return (
      <div className="menu">
        <div
          className="overlay"
          style={{ display: visible ? "block" : "" }}
          onClick={this.toggleMenu.bind(this)}
        />
        <GoTop />
        <div className="toggle" onClick={this.toggleMenu.bind(this, false)}>
          <i className="fas fa-bars" />
        </div>
        <div className={`menu-container ${visible ? "visible" : ""}`}>
          <Link
            to="/"
            className="menuLink"
            onClick={this.toggleMenu.bind(this, true)}
          >
            Inicio
          </Link>
          <Link
            to="/objects/"
            className="menuLink"
            onClick={this.toggleMenu.bind(this)}
          >
            Añadir objetos
          </Link>
          <label className="menuLink" htmlFor="selectType">
            Tipo de campeón
          </label>
          <select
            id="selectType"
            value={select}
            onChange={this.inputChange.bind(this)}
            name="select"
          >
            <option value="">Campeones de cualquier clase</option>
            <option value="Fighter">Luchador</option>
            <option value="Tank">Tanque</option>
            <option value="Mage">Mago</option>
            <option value="Support">Soporte</option>
            <option value="Assassin">Asesino</option>
            <option value="Marksman">Adc (Tirador)</option>
          </select>
          <label className="menuLink" htmlFor="selectName">
            Buscar por nombre
          </label>
          <input
            type="text"
            value={search}
            onChange={this.inputChange.bind(this)}
            name="search"
            id="selectName"
            placeholder="Nombre del campeón"
          />
          <Link to="/" className="enviar" onClick={this.sendSearch.bind(this)}>
            Buscar
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { searchChamps }
)(Menu);
