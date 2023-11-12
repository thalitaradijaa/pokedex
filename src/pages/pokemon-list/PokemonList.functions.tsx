import { useEffect, useState } from "react";

import { getDetailsPokemon, getPokemonByName, getPokemonByType, getPokemons } from "../../services/pokemon.service";

import { Pokemon } from "../../interfaces/Pokemon";
import { useNavigate } from "react-router-dom";
import { pokemonTypes } from "../../utils/pokemonTypes";

const PokemonListFunctions = () => {
    const navigate = useNavigate();
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(10);
    const [offsetInternal, setOffsetInternal] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [name, setName] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [loadMore, setLoadMore] = useState<boolean>(true);
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
                favorite: favoritePokemonIds.includes(data.id)
            } as Pokemon;
        } catch (error) {
            throw new Error(`Erro ao obter detalhes do Pokémon: ${error}`);
        }
    };

    const hanldeGetfavorites = () => {
        const storedFavorites = localStorage.getItem("favoritePokemonIds");
        const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavoritePokemonIds(initialFavorites);
        setPokemonData((prevData) =>
            prevData.map((pokemon) =>
                initialFavorites.includes(pokemon.id)
                    ? { ...pokemon, favorite: true }
                    : { ...pokemon, favorite: false }
            )
        );
    }

    const handleFavorite = (id: number) => {
        const storedFavorites = localStorage.getItem('favoritePokemonIds');
        const currentFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

        const isFavorite = currentFavorites.includes(id);

        const updatedFavorites = isFavorite
            ? currentFavorites.filter((favoriteId: number) => favoriteId !== id)
            : [...currentFavorites, id];

        localStorage.setItem('favoritePokemonIds', JSON.stringify(updatedFavorites));
        hanldeGetfavorites();
    };

    const handleGetAllPokemons = async (offset: number) => {
        setLoading(true);
        try {
            const response = await getPokemons(limit, offset);
            if (response.data) {
                setTotal(response.data?.count);
                const pokemonDetailsList = await Promise.all(
                    response.data?.results.map(async (item) => {
                        const dataPokemon = await handleGetDetailsPokemon(item.url);
                        return dataPokemon;
                    }) || []
                );
                setPokemonData((prevData) => [...prevData, ...pokemonDetailsList]);
                hanldeGetfavorites();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGetAllpokemonByType = async () => {
        setName(null);
        setLoadMore(false);
        setLoading(true);
        try {
            const response = await getPokemonByType(type ?? "");
            const pokemonDetailsList = await Promise.all(
                response.data?.pokemon.map(async (item: any) => {
                    const dataPokemon = await handleGetDetailsPokemon(item.pokemon.url);
                    return dataPokemon;
                }) || []
            );
            setPokemonData(pokemonDetailsList);
        } finally {
            setLoading(false);
        }
    };

    const handleGetPokemonByName = async () => {
        setLoadMore(false);
        setLoading(true);
        try {
            const response = await getPokemonByName(name ?? "");
            const data = response.data;
            const pokemon = {
                id: data?.id,
                name: data?.name,
                thumbnailImage: data.sprites?.front_default,
                types: data.types?.map((t: any) => t.type.name),
                weight: data?.weight
            } as Pokemon;
            setPokemonData([pokemon]);
        } finally {
            setLoading(false);
            setName(null);
        }
    };

    const handleLoadMore = () => {
        setOffsetInternal((prevOffset) => prevOffset + limit);
    };

    const handleCleanFilters = () => {
        setName(null);
        setType(null);
        setLoadMore(true);
        setPokemonData([]);
        handleGetAllPokemons(0);
    };

    useEffect(() => {
        handleGetAllPokemons(offsetInternal);
    }, [offsetInternal]);

    return {
        navigate,
        name,
        setName,
        type,
        setType,
        pokemonData,
        loading,
        loadMore,
        pokemonTypes,
        total,
        handleGetPokemonByName,
        handleGetAllpokemonByType,
        handleCleanFilters,
        handleFavorite,
        handleLoadMore
    };

};


export default PokemonListFunctions;