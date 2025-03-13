interface PokemonCard {
  id: number;
  image: string;
  name: string;
  types: string[];
}

const data = [
  {
    id: 1,
    name: "Bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    types: ["fire", "water"],
  },
  {
    id: 4,
    name: "Charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    types: ["fire", "water"],
  },
  {
    id: 7,
    name: "Squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    types: ["fire", "water"],
  },
  {
    id: 7,
    name: "Squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    types: ["fire", "water"],
  },
  {
    id: 7,
    name: "Squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    types: ["fire", "water"],
  },
  {
    id: 7,
    name: "Squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    types: ["fire", "water"],
  },
];

export const App = () => {
  return (
    <div>
      <div className="flex flex-wrap bg-white">
        {data.map((item, idx) => {
          return (
            <div>
              {item.id} - {item.name}
              <img src={item.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Detail = () => {
  return null;
};
