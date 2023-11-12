
import { ApiResult } from "../interfaces/ApiResult";
import { DataApiPokedex } from "../interfaces/DataApiPokedex";
import api from "./api.service";


export async function getPokemons(limit: number, offset: number): Promise<ApiResult<DataApiPokedex>> {
    return await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
};

export async function getPokemonByName(name: string): Promise<ApiResult<any>> {
    return await api.get(`/pokemon/${name}`);
};

export async function getPokemonByType(type: string): Promise<ApiResult<any>> {
    return await api.get(`/type/${type}`);
};

export async function getDetailsPokemon(url: string): Promise<ApiResult<any>> {
    return await api.get(url);
};