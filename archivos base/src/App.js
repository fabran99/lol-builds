import React, { Component } from "react";
import Menu from "./componentes/Menu";
import Listado from "./componentes/Listado";
import CrearObjetos from "./componentes/CrearObjetos";
import CrearBuilds from "./componentes/CrearBuilds";
import Champ from "./componentes/Champ";
import "./css/main.css";
import "./css/bootstrap-grid.min.css";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import JesusGirando from "./componentes/JesusGirando";

class App extends Component {
  state = {
    girando: false
  };
  componentDidMount() {
    var numero = Math.ceil(Math.random() * 100);
    if (numero == 69) {
      this.setState({
        girando: true
      });

      setTimeout(() => {
        this.setState({
          girando: false
        });
      }, 3000);
    }
  }

  render() {
    const { girando } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {girando ? <JesusGirando /> : null}
            <div className="menuContainer">
              <Menu />
            </div>
            <Switch>
              <Route exact path="/" component={Listado} />
              <Route exact path="/objects/" component={CrearObjetos} />
              <Route exact path="/builds/:champ" component={CrearBuilds} />
              <Route exact path="/champs/:id" component={Champ} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
