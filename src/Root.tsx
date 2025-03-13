import { Link } from "react-router";
import { useEffect, useState } from "react";
import { PokeAPI } from "./pokeapiClient";
import { getTypeColor } from "./getTypeColor";

const DEFAULT_LIMIT = 20;
interface PokemonCard {
  id: number;
  image: string;
  name: string;
  types: string[];
}

async function fetchData(payload: { offset: number }): Promise<PokemonCard[]> {
  const list = await PokeAPI.getPokemonsList({
    limit: DEFAULT_LIMIT,
    ...payload,
  });
  const pokemons = await Promise.all(
    list.results.map(async (item: { name: string; url: string }) => {
      const pokemon = await PokeAPI.getPokemonByName(item.name);
      return pokemon;
    }),
  );

  return pokemons.map((item) => ({
    id: item.id,
    image: item.sprites.other["official-artwork"].front_default ?? "",
    name: item.name,
    types: item.types.map((type: any) => type.type.name),
  }));
}

interface Props {
  id: number;
  image: string;
  name: string;
  types: string[];
}

export const Card: React.FC<Props> = (props) => (
  <div className="bg-white border border-gray-300 rounded-lg shadow-md relative w-2xs flex items-center justify-center h-80">
    <h4 className="text-xl text-gray-900 tracking-wide font-bold absolute left-4 top-2">
      {props.name} -{" "}
      <span className="text-gray-700 font-medium">{props.id}</span>
    </h4>

    <img
      src={props.image}
      alt={props.name}
      className="w-36 h-36 object-contain"
    />

    <div className="text-sm text-gray-700 absolute right-2 bottom-2">
      <div className="flex justify-center space-x-2">
        {props.types.map((type) => (
          <span
            key={type}
            className={`font-bold text-white px-3 py-1 rounded-md text-xs ${getTypeColor(type)}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const App = () => {
  // TODO: Implement a pagination to substitute the load more button
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<PokemonCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData({ offset })
      .then((result) => {
        setData(result);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (offset === 0) return;
    setIsLoading(true);
    fetchData({ offset }).then((result) => {
      setData((state) => [...state, ...result]);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [offset]);

  const onLoadMore = () => {
    setOffset((state) => state + DEFAULT_LIMIT);
  };

  return (
    <>
      <header className="py-2 px-4 bg-white shadow-md border-b-4 border-yellow-400 sticky top-0 z-10">
        <img src="/frontend-rocks/logo.png" className="w-60 h-auto" />
      </header>

      <main>
        <div className="flex flex-wrap items-center justify-center gap-4 p-8">
          {data.map((item) => (
            <Link to={`/frontend-rocks/detail/${item.id}`} key={item.id}>
              <Card key={item.id} {...item} />
            </Link>
          ))}
        </div>

        <div className="flex justify-center pb-10">
          <button
            className="bg-yellow-400 text-white py-2 px-4 rounded-md shadow-md font-bold"
            onClick={onLoadMore}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        </div>
      </main>
    </>
  );
};

