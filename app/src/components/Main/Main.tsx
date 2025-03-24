import { ReactElement, ReactNode } from "react";
import "./Main.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const Main = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main">{children}</div>
    </QueryClientProvider>
  );
};

export default Main;
