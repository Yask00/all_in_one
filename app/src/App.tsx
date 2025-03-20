import Layout from "./components/Layout/Layout";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import Login from "./features/Login/Login";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <Layout>
      <Navigation></Navigation>
      <Aside></Aside>
      <AuthProvider>
        <Main>
          {/* TODO: move login from <Main> here with routing and protected routes */}
          {/* TODO: TODO LIST */}
          <Login />
        </Main>
      </AuthProvider>
      <Footer></Footer>
    </Layout>
  );
}

export default App;
