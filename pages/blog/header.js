import { Component } from "react";
import Menu from "./menu";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="h-full grid grid-cols-3">
        <div className="col-span-1">
          <Menu isDarkMode={this.props.isDarkMode} />
        </div>
        <h1 className="text-3xl text-center align-middle"> frnkq </h1>
      </div>
    );
  }
}
