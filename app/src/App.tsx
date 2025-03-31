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
// import Todos from "./features/Todos/Todos/Todos";
import TodosRedux from "./features/Todos/TodosRedux/TodosRedux";
import Todo from "./features/Todos/Todo/Todo";
import AddTodo from "./features/Todos/AddTodo/AddTodo";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./components/Home/Home";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Layout>
          <Router>
            <Navigation></Navigation>
            <Aside></Aside>
            <Main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/todos">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        {/* <Todos /> */}
                        <TodosRedux />
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
          </Router>{" "}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </Layout>{" "}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
