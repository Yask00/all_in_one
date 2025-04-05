import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "../src/context/ThemeContext";
import AuthProvider from "../src/context/AuthContext";
import { BrowserRouter as Router } from "react-router";
// import { ToastContainer } from "react-toastify";

// import { TranslationProvider } from "my-i18n-lib";
// import defaultStrings from "i18n/en-x-default";

import { ReactNode } from "react";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>{children}</Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: object) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
