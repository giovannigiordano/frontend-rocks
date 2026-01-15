import { useEffect, useState } from "react";
import { PokeAPI } from "../../app/clients/pokeapi";
import { useParams } from "react-router";
import { getTypeColor } from "../utils/getTypeColor";

interface DetailData {
  abilities: string[];
  id: number;
  image: string;
  name: string;
  height: number;
  types: string[];
  weight: number;
  attack: number;
  hp: number;
}

const fetchData = async (id: number): Promise<DetailData> => {
  const data = await PokeAPI.getPokemonByName(String(id));

  return {
    abilities: data.abilities.map((ability) => ability.ability.name),
    attack: data.stats[1].base_stat,
    height: data.height,
    hp: data.stats[0].base_stat,
    id: data.id,
    image: data.sprites.other?.["official-artwork"].front_default ?? "",
    name: data.name,
    types: data.types.map((type) => type.type.name),
    weight: data.weight,
  };
};

export const DetailRoute: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<DetailData>();

  useEffect(() => {
    const id = Number(params.id);
    if (Number.isNaN(id)) return;
    fetchData(id).then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <header className="py-2 px-4 bg-white shadow-md border-b-4 border-yellow-400 sticky top-0 z-10">
        <img src="/frontend-rocks/logo.png" className="w-60 h-auto" />
      </header>

      <div className="bg-white p-12">
        <div className="flex justify-between">
          {/* TODO: Implement logic to handle previous and next pokemon */}
          <div>Prev</div>
          <div>Next</div>
        </div>

        <h1 className="text-4xl text-center text-gray-900 mb-8 tracking-wide font-bold">
          {data.name} - {data.id}
        </h1>

        <div className="grid grid-cols-2">
          <div>
            <div className="bg-gray-100 p-3 rounded-lg flex justify-center">
              <img
                src={data.image}
                alt={data.name}
                className="w-36 h-36 object-contain"
              />
            </div>
          </div>

          <div className="px-4 grid grid-cols-2 grid-rows-auto text-lg text-gray-700 mt-3 space-y-2">
            <div>
              <div className="font-bold">Height</div> {data.height}
            </div>

            <div>
              <div className="font-bold">Weight</div> {data.weight}
            </div>

            <div>
              <div className="font-bold">HP</div> {data.hp}
            </div>

            <div>
              <div className="font-bold">Attack</div> {data.attack}
            </div>

            <div>
              <div className="font-bold">Types:</div>
              <div className="justify-center space-x-2">
                {data.types.map((type) => (
                  <span
                    key={type}
                    className={`font-bold text-white px-3 py-1 rounded-full text-xs ${getTypeColor(type)}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="font-bold">Abilities</div>
              {data.abilities.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
