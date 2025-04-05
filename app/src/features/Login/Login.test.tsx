import { render, screen, fireEvent } from "../../../tests/test-utils";
import Login from "./Login";

describe("App", () => {
  it("renders the Login component", () => {
    const { container } = render(<Login />, {});
    expect(container).toBeInTheDocument();
  });

  it("Renders form inputs", () => {
    render(<Login />, {});
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("Renders form actions", () => {
    render(<Login />, {});
    expect(screen.getByLabelText("Remember me")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should toggle remember me state", () => {
    render(<Login />, {});
    const checkbox = screen.getByLabelText("Remember me");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  // TODO: finish this test
  // check useful stuff in both rtl and jest to put here and in another test
  // check article for best practices in rtl and use them inexample tests

  // it("should call submitHandler when the form is submitted", () => {
  //   // const submitHandler = jest.fn();
  //   const submitHandler = jest.fn((e) => {
  //     e.preventDefault(); // Prevent default form submission
  //   });
  //   render(<Login />, {});

  //   fireEvent.change(screen.getByLabelText("Username"), {
  //     target: { value: "user1@email.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Password"), {
  //     target: { value: "1234" },
  //   });

  //   // Simulate form submission
  //   fireEvent.click(screen.getByText("Login"));
  //   expect(submitHandler).toHaveBeenCalledTimes(1);
  // });
});
