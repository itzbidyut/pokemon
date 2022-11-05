export default function CardItem({ data, index }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="pokemon">
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

            <div className="pokemonStats">
              {data.stats.map((item) => (
                <p>
                  {item.stat.name} - {item.base_stat}
                </p>
              ))}
            </div>
          </div>

          <img src={data.sprites.front_shiny} alt={data.name} />
        </div>
      </div>
    </div>
  );
}
