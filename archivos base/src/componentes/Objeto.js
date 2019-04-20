import React, { Component } from "react";

export class Objeto extends Component {
  render() {
    const { icon, name, type, price } = this.props.data;
    return (
      <div className="items col-12 col-sm-6  col-xl-4">
        <div className="item" onClick={this.props.click.bind(this, name)}>
          <div className="visible">
            <div className="imagen">
              <img src={icon} alt={name} />
            </div>
            <div className="name">{name}</div>
          </div>
          <div className="data">
            <p>{name}</p>
            <p>Tipo: {type}</p>
            <p>Precio: {price}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Objeto;
