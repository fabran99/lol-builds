import React, { Component } from "react";

export class GoTop extends Component {
  state = {
    visible: window.scrollY > 20
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  handleScroll() {
    const { visible } = this.state;
    if (visible != window.scrollY > 20) {
      this.setState({ visible: window.scrollY > 20 });
    }
  }

  goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render() {
    const { visible } = this.state;
    return (
      <div
        onClick={this.goTop.bind(this)}
        className="goTop"
        style={{ transform: visible ? "" : "translateY(120%)" }}
      >
        <i className="fas fa-angle-up" />
      </div>
    );
  }
}

export default GoTop;
