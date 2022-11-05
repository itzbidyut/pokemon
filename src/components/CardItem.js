export default function CardItem({ name, height, index }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="pokemonCard">
        {index + 1 < 10 ? <p>#0{index + 1}</p> : <p>#{index + 1}</p>}
        <p>{name}</p>
        <p>height-{height}</p>
      </div>
    </div>
  );
}
