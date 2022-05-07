import { Component } from "react";
import Card from "./card";
import Footer from "./footer";
import DarkModeToggle from "../../components/darkModeToggle";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.changeDarkMode = this.changeDarkMode.bind(this);
    this.state = { isDarkMode: true };
  }

  changeDarkMode = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  };

  render() {
    return (
      <>
        <div
          id="container"
          className={`
                    ${this.state.isDarkMode ? " bg-black" : "bg-white"}
                    ${this.state.isDarkMode ? " text-green-500" : " text-dark"}
                    ${
                      true
                        ? "w-full h-full md:h-screen flex flex-col content-around justify-between p-1"
                        : ""
                    }
                    `}
        >
          <div className="absolute top-0 right-0">
            <DarkModeToggle
              onChangeDarkMode={this.changeDarkMode}
              state={this.state}
            />
          </div>
          <main className="">
            <Card isDarkMode={this.state.isDarkMode} />
          </main>
          <footer className="text-center">
            <Footer />
          </footer>
        </div>
      </>
    );
  }
}
