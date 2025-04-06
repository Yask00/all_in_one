import { render, screen } from "../../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { jest } from "@jest/globals";

afterEach(() => {
  jest.restoreAllMocks();
});

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

  it("should toggle remember me state", async () => {
    render(<Login />, {});
    const checkbox = screen.getByLabelText("Remember me");
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("should NOT be able to login with incorrect credentials", async () => {
    render(<Login />, {});

    const mockData = { ok: false, data: "test" };
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(mockData),
    } as Response);

    // await act(async () => {
    const usernameInput = screen.getByLabelText("Username");
    expect(usernameInput).toBeInTheDocument();
    await userEvent.type(usernameInput, "user111@email.com");

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
    await userEvent.type(passwordInput, "1234333");

    // Simulate form submission
    const submitBtn = screen.getByText("Login");
    expect(submitBtn).toBeInTheDocument();
    await userEvent.click(submitBtn);
    // });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/signin",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "user111@email.com",
          password: "1234333",
        }),
      })
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveReturnedTimes(1);

    const response = await global.fetch("http://localhost:3000/signin", {
      method: "POST",
      body: JSON.stringify({
        email: "user111@email.com",
        password: "1234333",
      }),
    });

    const isItOK = await response.ok;
    expect(isItOK).toEqual(false);
  });

  it("should be able to login with correct credentials", async () => {
    render(<Login />, {});

    const mockData = { ok: true, data: "test" };
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    // await act(async () => {
    const usernameInput = screen.getByLabelText("Username");
    expect(usernameInput).toBeInTheDocument();
    await userEvent.type(usernameInput, "user1@email.com");

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
    await userEvent.type(passwordInput, "1234");

    // Simulate form submission
    const submitBtn = screen.getByText("Login");
    expect(submitBtn).toBeInTheDocument();
    await userEvent.click(submitBtn);
    // });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/signin",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "user1@email.com",
          password: "1234",
        }),
      })
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveReturnedTimes(1);

    const response = await global.fetch("http://localhost:3000/signin", {
      method: "POST",
      body: JSON.stringify({
        email: "user1@email.com",
        password: "1234",
      }),
    });

    const isItOK = await response.ok;
    expect(isItOK).toEqual(true);
  });
});
