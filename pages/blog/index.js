import { Component } from "react";
import dynamic from "next/dynamic";
import { Header } from "./header";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { isDarkMode: true };
    this.DarkModeToggle = dynamic(
      () =>
        import("../../components/darkModeToggle").then(
          (mod) => mod.DarkModeToggle
        ),
      { ssr: false }
    );
  }

  changeDarkMode = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  };

  render() {
    return (
      <>
        <div
          className={`
              ${this.state.isDarkMode ? "" : ""}
              ${true ? "flex flex-col justify-between h-screen" : ""}
              `}
        >
          <div className="absolute top-[-2px] right-0">
            <this.DarkModeToggle
              onChangeDarkMode={this.changeDarkMode}
              state={this.state}
              textSize="text-xl"
            />
          </div>
          <header
            className={`
              ${this.state.isDarkMode ? "bg-black text-green-500" : ""}
              ${true ? "h-12" : ""}
              `}
          >
            <Header isDarkMode={this.state.isDarkMode} />
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
