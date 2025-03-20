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

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Router>
          <Navigation></Navigation>
          <Aside></Aside>
          <Main>
            <Routes>
              <Route path="/" element={<div>HOME PAGE</div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/todos">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <div>TODO LIST</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <div>TODO BY ID</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="add"
                  element={
                    <ProtectedRoute>
                      <div>TODO ADD</div>
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
