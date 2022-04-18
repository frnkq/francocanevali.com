import { Component } from "react";
export class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="w-full text-center">
        <h1 className="text-2xl"> frnkq </h1>
      </div>
    );
  }
}
