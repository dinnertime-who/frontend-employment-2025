import { Pokemon } from '@interfaces/pokemon';
import Image from 'next/image';
import React from 'react';

const fetchPokemons = async (limit: number, offset: number) => {
  const response = await fetch(`http://localhost:3000/api/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PokemonList = async () => {
  const pokemonData = await fetchPokemons(20, 0);

  return (
    <ul className="m-auto grid max-w-screen-xl grid-cols-4 gap-4 p-8 max-md:grid-cols-2">
      {pokemonData?.map((pokemon: Pokemon) => (
        <li
          key={pokemon.name}
          className="flex flex-col items-start rounded-md bg-primary-foreground p-5 shadow-lg dark:bg-primary"
        >
          <Image
            width={600}
            height={800}
            src={pokemon.image}
            className="flex aspect-[3/4] flex-col items-start rounded-md border border-zinc-600 bg-primary-foreground object-contain p-5 dark:bg-primary"
            alt={pokemon.name}
          />
          <p>{pokemon.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
