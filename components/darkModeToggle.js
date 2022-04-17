import { Component } from "react";

export class DarkModeToggle extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.changeDarkMode = this.changeDarkMode.bind(this);
    this.state = props.state;
  }

  changeDarkMode() {
    this.setState({ isDarkMode: !this.state.isDarkMode });
    this.props.onChangeDarkMode();
  }

  render() {
    return (
      <button
        onClick={this.changeDarkMode}
        className={`
                    ${this.state.isDarkMode ? "rotate-180" : "rotate-0"}
                    ${true ? "p-3 text-4xl" : ""}
                `}
      >
        🌗
      </button>
    );
  }
}
