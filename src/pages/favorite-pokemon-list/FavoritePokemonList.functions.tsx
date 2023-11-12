import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDetailsPokemon } from "../../services/pokemon.service";
import { Pokemon } from "../../interfaces/Pokemon";

const FavoritePokemonListFunctions = () => {
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoritePokemonIds, setFavoritePokemonIds] = useState<number[]>([]);

  const handleGetDetailsPokemon = async (url: string) => {
    try {
      const response = await getDetailsPokemon(url);
      const data = response.data;
      return {
        id: data.id,
        name: data.name,
        thumbnailImage: data.sprites.front_default,
        types: data.types?.map((t: any) => t.type.name),
        weight: data.weight,
        favorite: favoritePokemonIds.includes(data.id),
      } as Pokemon;
    } catch (error) {
      throw new Error(`Erro ao obter detalhes do Pokémon: ${error}`);
    }
  };

  const handleGetfavorites = () => {
    const storedFavorites = localStorage.getItem("favoritePokemonIds");
    const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    setFavoritePokemonIds(initialFavorites);
    setPokemonData((prevData) =>
      prevData.map((pokemon) => ({
        ...pokemon,
        favorite: initialFavorites.includes(pokemon.id),
      }))
    );
    return initialFavorites;
  };

  const handleFavorite = (id: number) => {
    const storedFavorites = localStorage.getItem("favoritePokemonIds");
    const currentFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    const isFavorite = currentFavorites.includes(id);

    const updatedFavorites = isFavorite
      ? currentFavorites.filter((favoriteId: number) => favoriteId !== id)
      : [...currentFavorites, id];

    localStorage.setItem("favoritePokemonIds", JSON.stringify(updatedFavorites));
    handleGetAllPokemons(updatedFavorites);
  };

  const handleGetAllPokemons = async (listFavorites: number[]) => {
    try {
      const pokemonDetailsList = await Promise.all(
        listFavorites.map(async (id) => await handleGetDetailsPokemon(`/pokemon/${id}`))
      );
      setPokemonData(pokemonDetailsList);
      handleGetfavorites();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleGetAllPokemons(handleGetfavorites());
  }, []);

  return {
    pokemonData,
    loading,
    handleFavorite,
    navigate,
  };
};

export default FavoritePokemonListFunctions;
