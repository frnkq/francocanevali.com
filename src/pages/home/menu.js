import { Component } from "react";

export const menuItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
    link: "http://blog.frnkquito.com/",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/frnkquito",
    newTab: true,
  },
  {
    name: "Github",
    link: "https://github.com/frnkq/",
    newTab: true,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/francocanevali/",
    newTab: true,
  },
];

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getMenu() {
    const menu = menuItems.map((item) => {
      return (
        <>
          <a
            href={item.link}
            target={item.newTab ? "_blank" : ""}
            rel="noreferrer"
            key={"link_" + item.name}
          >
            <span
              className={`
                          ${
                            this.props.isDarkMode
                              ? " bg-stone-400"
                              : " bg-stone-100"
                          }
                          ${
                            this.props.isDarkMode ? " text-dark" : " text-black"
                          }
                          ${true ? "px-3 py-2 font-bold" : ""}
                         `}
              key={"span_" + item.name}
            >
              {item.name}
            </span>
          </a>
        </>
      );
    });

    return menu;
  }

  render() {
    const menu = this.getMenu();
    return (
      <>
        <div className="">
          <span className="flex justify-around">{menu}</span>
        </div>
      </>
    );
  }
}
