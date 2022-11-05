import { useState, useEffect } from "react";
import Header from "./components/Header";
import CardItem from "./components/CardItem";
import "./App.scss";
import axios from "axios";

const api = `https://pokeapi.co/api/v2/pokemon?offset=20&limit=20`;

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const response = await axios.get(api);
      const resData = response.data.results;
      // console.log("resData-------------------", resData);
      // console.log("resData1--- end");
      function pokemonDetails(result) {
        result.forEach(async (pokemon) => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const resData = response.data;
          setData((list) => [...list, resData]);
          // console.log(" Data==", resData);
          // console.log("resData2--- end");
        });
      }
      pokemonDetails(resData);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Header />
      <div className="app">
        <div className="container">
          <div className="row">
            {data ? (
              data.map((item, index) => (
                <CardItem key={index} data={item} index={index} />
              ))
            ) : (
              <></>
            )}
            {error ? <div>{error}</div> : <></>}
            {loading ? <div>loading.....</div> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
