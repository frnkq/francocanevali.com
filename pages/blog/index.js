import { Component } from "react";
import { Header } from "./header";
import { DarkModeToggle } from "../../components/darkModeToggle";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { isDarkMode: true };
  }

  changeDarkMode = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  };

  render() {
    return (
      <>
        <div
          className={`
              ${this.state.isDarkMode ? "bg-black" : "bg-green-100"}
              ${true ? "flex flex-col justify-between h-screen" : ""}
              `}
        >
          <div className="absolute">
            <DarkModeToggle
              onChangeDarkMode={this.changeDarkMode}
              state={this.state}
            />
          </div>
          <header className="h-24">
            <Header />
          </header>
          <main className="h-full">
            <h1> Body </h1>
          </main>
          <footer>
            <h1> Footer </h1>
          </footer>
        </div>
      </>
    );
  }
}
