import { Component } from "react";
import { menuItems } from "./menu";
import Image from "next/image";
import profilePicture from "../../public/assets/profilePicture.jpg";
import AsciiArt from "./asciiart";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.name = "Franco Canevali";
    this.career = "Software Developer +10yrs";
    this.imageDescription = "Flexing w/ my setup. Oct. 2020.";
  }

  contactInfo() {
    return (
      <>
        {menuItems.map((contact, index) => {
          return (
            <a
              href={contact.link}
              target={contact.newTab ? "_blank" : ""}
              rel="noreferrer"
              key={"link_" + index}
            >
              <span key={"span_" + index} className="pr-3 text-xl underline">
                {contact.name == "Home" ? "" : contact.name}
              </span>
            </a>
          );
        })}
      </>
    );
  }

  skills() {
    const skills = [
      {
        text: "Full stack development",
      },
      {
        text: "REST API development and integration",
      },
      {
        text: "Common libraries and frameworks",
        subText: "Angular, Laravel, NodeJs, Express, .Net, React, Vue, Spring",
      },
      {
        text: "Server configuration and maintenance",
        subText: "Linux and Windows Server, Scripting, cronjobs, CLI",
      },
      {
        text: "SAAS & PAAS",
        subText: "Amazon Web Services, Google Cloud",
      },
      {
        text: "Content Management Systems",
        subText: "E-Commerce engines, Wordpress and Wordpress-like systems",
      },
    ];

    return (
      <ul>
        {skills.map((skill, index) => {
          return (
            <li key={"skill_" + index} className="mb-1.5 p-2">
              <span key={"skillspan_" + index} className="font-bold">
                {" "}
                <u>&gt; {skill.text}</u>
              </span>
              {skill.subText ? " (" + skill.subText + ")" : ""}
            </li>
          );
        })}
      </ul>
    );
  }

  emojis() {
    const emojis = "💖😈🤝😎🥰🥴👀💪😳👍😂😂😂🥵🤭😱🌚🍻💸🇦🇷🧉"
      .split("")
      .map((emoji, index) => {
        return (
          <span className="text-xl tracking-[.60em]" key={"emoji_" + index}>
            {emoji}
          </span>
        );
      });

    return (
      <p className="py-3">
        Fav emojis <span className="text-sm">-apr 2022-</span>:
        <br />
        {emojis}
        <br />
      </p>
    );
  }

  render() {
    return (
      <>
        <div className="w-full overflow-visible text-center whitespace-pre"></div>
        <div className="p-2 p-4 grid sm:grid-cols-1 md:grid-cols-7">
          <div className="p-2 sm:col-span-7 md:col-span-5 md:col-start-2">
            <h1 className="mb-2 text-4xl">{this.name}</h1>
            <h2 className="text-xl mb-">{this.career}</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-6">
              <div className="w-full md:col-span-2">
                <Image src={profilePicture} alt={this.imageDescription}/>
                {this.imageDescription}
                <span className="hidden md:block">{this.emojis()}</span>
              </div>
              <div className="md:col-span-3 md:ml-10">
                <h1 className="pb-3 pr-3 mt-3 mb-1 text-2xl underline md:mt-0">
                  Skills
                </h1>
                {this.skills()}
                <div className="block text-md md:hidden">
                  <AsciiArt />
                </div>
                <span className="block md:hidden">{this.emojis()}</span>
                <span className="text-center md:text-left">
                  {this.contactInfo()}
                </span>
              </div>
            </div>
            <div className="hidden text-md md:block">
              <AsciiArt />
            </div>
          </div>
        </div>
      </>
    );
  }
}
