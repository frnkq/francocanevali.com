import { Component } from "react";
import { PropTypes } from "prop-types";

export default class DarkModeToggle extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.changeDarkMode = this.changeDarkMode.bind(this);
    this.state = props.state ? props.state : { isDarkMode: true };
    this.textSize = props.textSize ? props.textSize : "text-3xl";
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
                    ${true ? "p-3 " + this.textSize : ""}
                `}
      >
        🌗
      </button>
    );
  }
}

DarkModeToggle.propTypes = {
  state: PropTypes.shape({ isDarkMode: PropTypes.bool }),
  textSize: PropTypes.string,
};

DarkModeToggle.defaultProps = {
  state: { isDarkMode: true },
  textSize: "text-3xl",
};
