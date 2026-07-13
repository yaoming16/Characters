import { Outlet } from "react-router-dom";

import Header from "../General/Header";
import Footer from "../General/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
