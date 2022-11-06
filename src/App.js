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
  const [currentPage, setCurrentPage] = useState(1);
  const [offsetValue, setOffsetValue] = useState(0);

  const api = `https://pokeapi.co/api/v2/pokemon?offset=${offsetValue}&limit=20`;

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
    setLoading(true);
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
          // console.log("resData,,,,,,,,,,", resData);
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
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    setOffsetValue((prevOffsetValue) => prevOffsetValue + 20);
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
      setOffsetValue((prevOffsetValue) => prevOffsetValue - 20);
    }
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
                  <div key={data.id} className="col-12 col-md-6 col-lg-4">
                    <CardItem data={data} />
                  </div>

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
                  {data.map((item) => (
                    <div key={item.id} className="col-12 col-md-6 col-lg-4">
                      <CardItem data={item} />
                    </div>
                  ))}
                  {loading ? (
                    <></>
                  ) : (
                    <div className="  mt-5  buttons">
                      {currentPage > 1 ? (
                        <button className="load mr-3" onClick={prevPage}>
                          <span class="material-symbols-outlined">
                            chevron_left
                          </span>
                          prev page
                        </button>
                      ) : (
                        <></>
                      )}

                      <p> {currentPage} </p>
                      <button className="load" onClick={nextPage}>
                        next page
                        <span class="material-symbols-outlined">
                          navigate_next
                        </span>
                      </button>
                    </div>
                  )}
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
