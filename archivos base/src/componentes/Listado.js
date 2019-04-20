import React, { Component } from "react";
import ItemListado from "./ItemListado";
import ListadoHeader from "./ListadoHeader";
import { connect } from "react-redux";

export class Listado extends Component {
  render() {
    const { champs, search, select } = this.props;

    const campeones = champs.map(campeon => {
      return <ItemListado key={campeon.id} data={campeon} />;
    });
    if (!champs) {
      return <h1>cargando</h1>;
    }

    return (
      <div className="listado">
        <div className="container-fluid">
          <div className="cabeceraListado">
            {search != "" || select != "" ? (
              <ListadoHeader
                filtro={{ search, select, cantidad: champs.length }}
              />
            ) : null}
          </div>
          <div className="row">{campeones}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  champs: state.champs.coincidencias,
  search: state.champs.search,
  select: state.champs.select
});

export default connect(
  mapStateToProps,
  null
)(Listado);
