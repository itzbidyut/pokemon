import { useState, useEffect } from "react";
import Header from "./components/Header";
import CardItem from "./components/CardItem";
import "./styles/App.scss";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const api = `https://pokeapi.co/api/v2/pokemon?offset=${currentPage}&limit=20`;

  const handleSearch = async (e) => {
    e.preventDefault();
    setData([]);
    setError("");
    setSearch(false);
    setLoading(true);
    const pokemon = searchValue.toLocaleLowerCase();

    if (searchValue.length > 0) {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        const resData = response;
        setData(resData.data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError(`No pokemon found`);
        setData(null);
      } finally {
        setSearch(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError(`Enter pokemon name in search box`);
    }
  };

  const fetchApi = async () => {
    setData([]);
    setSearch(false);
    setSearchValue("");
    try {
      const response = await axios.get(api);
      const resData = response.data.results;

      function pokemonDetails(result) {
        result.forEach(async (pokemon) => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const resData = response.data;
          setData((list) => [...list, resData]);
          console.log("resData,,,,,,,,,,", resData);
        });
      }
      pokemonDetails(resData);
    } catch (err) {
      console.log(err);
      setError("Error");
      setData(null);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 20);
  };
  const prevPage = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 20);
  };

  useEffect(() => {
    fetchApi();
  }, [api]);

  return (
    <>
      <Header
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        searchValue={searchValue}
      />
      <div className="app">
        <div className="container">
          {search ? (
            <>
              {data && (
                <>
                  <CardItem data={data} />
                  <div className="text-center">
                    <button className="load" onClick={fetchApi}>
                      Load all
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {data && (
                <div className="row">
                  {data.map((item, index) => (
                    <div key={data.id} className="col-12 col-md-6 col-lg-4">
                      <CardItem data={item} index={index} />
                    </div>
                  ))}
                  <div className="  mt-5  buttons">
                    <button className="load mr-3" onClick={prevPage}>
                      prev page
                    </button>
                    <button className="load" onClick={nextPage}>
                      next page
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {error && (
            <div className="my-5 py-5 ">
              <h1 className="mb-5">{error}...</h1>
              <div className="text-center">
                <button className="load" onClick={fetchApi}>
                  Load all
                </button>
              </div>
            </div>
          )}
          {loading && (
            <div className="my-5 py-5 ">
              <h1>Loading...</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
