import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { Desktop1 } from "./Desktop1";
import { Charities } from "./Charities";
import { Aboutus } from "./Aboutus";
import { Transparent } from "./Transparent";
import { Desktop2 } from "./Desktop2";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/charities":
        title = "";
        metaDescription = "";
        break;
      case "/aboutus":
        title = "";
        metaDescription = "";
        break;
      case "/transparent":
        title = "";
        metaDescription = "";
        break;
      case "/desktop-2":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Desktop1 />} />

      <Route path="/charities" element={<Charities />} />

      <Route path="/aboutus" element={<Aboutus />} />

      <Route path="/transparent" element={<Transparent />} />

      <Route path="/desktop-2" element={<Desktop2 />} />
    </Routes>
  );
}
export default App;
