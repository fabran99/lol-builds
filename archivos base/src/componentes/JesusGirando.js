import React, { Component } from "react";
import jesusGirando from "../jesusGirando/jesusGirando.gif";

export class JesusGirando extends Component {
  render() {
    return (
      <div className="girando">
        <img src={jesusGirando} alt={jesusGirando} />
      </div>
    );
  }
}

export default JesusGirando;
