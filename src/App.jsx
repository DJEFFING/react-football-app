import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Container } from "./components/container";
import { ItemDetail } from "./components/ItemDetail/ItemDetail";
import { token } from "./environements/environement";

function App() {
  const getMatchList = async () => {
    try {
      const response = await fetch(
        `https://www.scorebat.com/video-api/v3/feed/?token=${token.VIDEO_API_ACCESS_TOKEN}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (err) {
      console.log("Une erreur c'est produite ", err.message);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/match/:id" element={<ItemDetail getMatchList={getMatchList} />} />
      </Routes>
    </>
  );
}

export default App;
