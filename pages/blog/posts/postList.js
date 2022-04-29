import { Component } from "react";

export class PostList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      items: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/blog/posts/")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          items: res,
        });
      });
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <h1>Post list</h1>
        {items}
      </div>
    );
  }
}
