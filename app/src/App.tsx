import Layout from "./components/Layout/Layout";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import Login from "./features/Login/Login";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import Todos from "./features/Todos/Todos/Todos";
import Todo from "./features/Todos/Todo/Todo";
import AddTodo from "./features/Todos/AddTodo/AddTodo";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Router>
          <Navigation></Navigation>
          <Aside></Aside>
          <Main>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="flex items-center justify-center w-full h-full">
                    HOME PAGE
                  </div>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/todos">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Todos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <Todo />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="add"
                  element={
                    <ProtectedRoute>
                      <AddTodo />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Main>
          <Footer></Footer>
        </Router>
      </Layout>{" "}
    </AuthProvider>
  );
}

export default App;
