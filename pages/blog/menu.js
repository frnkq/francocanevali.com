import { Component, useState } from "react";

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      showMenu: false,
    };
  }

  leftMenu() {
    return (
      <div className="absolute top-0 left-0 flex flex-col w-2/3 h-screen bg-red-800">
        <div
          className="text-2xl"
          onClick={() => {
            this.setState({ showMenu: !this.state.showMenu });
          }}
        >
          ❌
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1
          className={`
              ${true ? "pt-1 pl-2 text-2xl" : ""}
              ${!this.state.showMenu ? "block" : "hidden"}
              `}
          onClick={() => {
            this.setState({ showMenu: !this.state.showMenu });
          }}
        >
          🍔
        </h1>
        <div className={`${this.state.showMenu ? "block" : "hidden"}`}>
          {this.leftMenu()}
        </div>
      </div>
    );
  }
}
