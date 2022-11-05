import { useState, useEffect } from "react";

export default function PokemonModal({ data, closeModal }) {
  const [stats, setStats] = useState([]);

  // console.log("PokemonModal=====", data);
  // console.log("data.stats.base_stat=====", data.stats[0].base_stat);

  //   useEffect(() => {
  //     setStats((list) => data.stats.base_stat);
  //     console.log("stats===============", stats);
  //   }, [data]);

  //   const totalStat = stats.reduce(
  //     (previousValue, currentValue) => previousValue + currentValue
  //   );
  //   console.log("totalStat=====", totalStat);

  return (
    <div className="PokemonModal">
      <div className="pokemonBox">
        <div onClick={closeModal} className="closeBtn">
          <span className="material-symbols-outlined">close</span>
        </div>
        <div className={`row ${data.types[0].type.name}`}>
          <div className="col-12 col-md-6">
            <div className="pokemonLeft text-center">
              <p className="name ">{data.name}</p>
              <img
                src={data.sprites.front_shiny}
                alt={data.name}
                className="img"
              />
              <div className="abilitys">
                <p className="title">ability</p>
                {data.abilities.map((item, index) => (
                  <p className="ability" key={index}>
                    {item.ability.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="pokemonRight">
              <p className="baseTitle text-center">Base Stats</p>
              {data.stats.map((item, index) => (
                <div key={index} className="statDetails">
                  <p className="statName">
                    {item.stat.name} {item.base_stat}
                  </p>
                  <div className="bar">
                    <div
                      className="percentageBar"
                      style={{ width: `${item.base_stat}px` }}
                    ></div>
                  </div>
                </div>
              ))}
              {/* <p>{totalStat}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//     style={{ width: `${item.base_stat}` }}
