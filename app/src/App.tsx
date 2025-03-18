import Layout from "./components/Layout/Layout";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";

function App() {
  return (
    <Layout>
      <Navigation></Navigation>
      <Aside></Aside>
      <Main></Main>
      <Footer></Footer>
    </Layout>
  );
}

export default App;
