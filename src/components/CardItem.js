import { useState } from "react";
import PokemonModal from "./PokemonModal";
import "../styles/cardItem.scss";

export default function CardItem({ data }) {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
    document.body.classList.toggle("stop-scrolling");
  };

  const closeModal = () => {
    setModal(false);
    document.body.classList.toggle("stop-scrolling");
  };

  return (
    <div>
      <div className="pokemon" onClick={showModal}>
        <div className={`pokemonCard ${data.types[0].type.name}`}>
          <div className="">
            <div className="index">
              <p>{data.id}</p>
            </div>
            <p className="name">{data.name}</p>
            <div className="type">
              {data.types?.map((item, index) => (
                <p key={index}>{item.type.name}</p>
              ))}
            </div>
          </div>
          <img src={data?.sprites?.front_shiny} alt={data.name} />
        </div>
      </div>

      {modal ? <PokemonModal closeModal={closeModal} data={data} /> : <></>}
    </div>
  );
}
