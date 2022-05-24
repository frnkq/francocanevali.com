import { Component } from "react";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const vim = (
      <a href="https://vim.org" target="_blank" rel="noreferrer" className="underline">
        Vim
      </a>
    );
    const arch = (
      <a href="https://archlinux.org" target="_blank" rel="noreferrer"  className="underline">
        Arch
      </a>
    );
    return (
      <>
        <div className="mx-auto md:w-auto md:mt-0">
          Made with &lt;3 in {vim} under {arch}
          <br />
          ~frnkq
        </div>
      </>
    );
  }
}
