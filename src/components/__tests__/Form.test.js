import React from 'react'

import { render } from "@testing-library/react";

import Form from "components/Appointment"


const { getByPlaceholderText } = render(
  <Form interviewers={interviewers} />
);

const { getByTestId } = render(
  <Form interviewers={interviewers} name="Lydia Miller-Jones" />
);

describe("Form", () => {
  it("renders without student name if not provided", () => {
    render(<Form />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  it("renders without student name if not provided", () => {
    render(<Form />)
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

});