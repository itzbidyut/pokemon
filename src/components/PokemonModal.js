import { useState, useEffect } from "react";
import "../styles/pokemonModal.scss";

export default function PokemonModal({ data, closeModal }) {
  const [totalstats, setTotalstats] = useState([]);

  const findTotal = () => {
    let grandTotel = 0;
    const statList = data.stats.reduce(
      (acc, poke) => [...acc, poke.base_stat],
      []
    );
    setTotalstats(statList.reduce((prev, cur) => prev + cur, grandTotel));
  };

  useEffect(() => {
    findTotal();
  });

  return (
    <div className="PokemonModal">
      <div className="pokemonBox">
        <div onClick={closeModal} className="closeBtn">
          <span className="material-symbols-outlined">close</span>
        </div>
        <div className={`row ${data.types[0].type.name}`}>
          <div className="col-12 col-sm-6 col-md-6">
            <div className="pokemonLeft text-center">
              <p className="name ">{data.name}</p>
              <img
                src={data.sprites.front_shiny}
                alt={data.name}
                className="img"
              />
              <div className="abilitys">
                <p className="title">ability</p>
                <div className="abilityList">
                  {data.abilities.map((item, index) => (
                    <p className="ability" key={index}>
                      {item.ability.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <div className="pokemonRight">
              <p className="baseTitle text-center">Base Stats</p>
              <div className="statList">
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
              </div>

              <p className="total">Total : {totalstats}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
