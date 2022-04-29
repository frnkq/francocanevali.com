import React from "react";
import HomePage from "../../pages/home";
import { render } from "@testing-library/dom";
import "@testing-library/jest-dom";

test("renders", async () => {
  render(<HomePage />);
});
