const Cards = ({ characters, onCharacterClick}) => {
  return (
    <div className="cards">
      {characters.map((c, index) => (
        <div
          key={index}
          className="card"
          onClick={() => onCharacterClick(c.url)}
        >
          {c.name}
        </div>
      ))}
    </div>
  );
};
export default Cards;
