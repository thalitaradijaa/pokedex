import React from "react";

import { Button, Grid, IconButton, MenuItem, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ListCard from "../../components/list-card/ListCard";
import Loading from "../../components/loading/Loading";
import PokemonListFunctions from "./PokemonList.functions";

const PokemonList: React.FC = () => {
    const {
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
        handleLoadMore } = PokemonListFunctions();

    return (
        <Grid container rowGap={4}>
            <Grid item container xs={12} lg={6} direction="row" gap={2}>
                <Grid item container xs={12} alignItems="center">
                    <TextField
                        id="name"
                        value={name}
                        label="Pesquise pelo nome"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)} />
                    <IconButton onClick={handleGetPokemonByName} disabled={!name}>
                        <SearchIcon />
                    </IconButton>
                </Grid>
                <Grid item container xs={12} lg={12} alignItems="center">
                    <TextField
                        sx={{ width: '80%' }}
                        id="type"
                        select
                        label="Pesquise pelo tipo"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        {pokemonTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <IconButton onClick={handleGetAllpokemonByType} disabled={!type} >
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item container xs={12} lg={6} direction="row" gap={2}>
                <Grid item container xs={12} justifyContent="flex-end">
                    <IconButton size="small" color="primary" onClick={() => navigate('/favorites')}>
                        <FavoriteIcon />
                    </IconButton>
                </Grid>
                <Grid item container xs={12} alignItems="center" justifyContent="flex-end">
                    <Button onClick={handleCleanFilters}>
                        Limpar Filtros
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <ListCard data={pokemonData} onClickFavorite={handleFavorite} />
            </Grid>
            {(loadMore && total >= pokemonData.length) && <Grid item container justifyContent="center" xs={12}>
                <Button onClick={handleLoadMore}>
                    Carregar Mais
                </Button>
            </Grid>
            }
            {loading && <Loading />}
        </Grid >
    );
}

export default PokemonList;