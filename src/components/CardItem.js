import { useState } from "react";
import PokemonModal from "./PokemonModal";

export default function CardItem({ data, index }) {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    console.log("showModal==============");
    setModal(true);
    document.body.classList.toggle("stop-scrolling");
  };
  const closeModal = () => {
    console.log("closeModal==============");
    setModal(false);
    document.body.classList.toggle("stop-scrolling");
  };
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="pokemon" onClick={showModal}>
        <div className={`pokemonCard ${data.types[0].type.name}`}>
          <div className="">
            <div className="index">
              {index + 1 < 10 ? <p>#0{index + 1}</p> : <p>#{index + 1}</p>}
            </div>
            <p className="name">{data.name}</p>
            <div className="type">
              {data.types.map((item, index) => (
                <p key={index}>{item.type.name}</p>
              ))}
            </div>
          </div>

          <img src={data.sprites.front_shiny} alt={data.name} />
        </div>
      </div>
      {modal ? <PokemonModal closeModal={closeModal} data={data} /> : <></>}
    </div>
  );
}
