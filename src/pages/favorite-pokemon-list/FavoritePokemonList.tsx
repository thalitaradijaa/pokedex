import React from "react";

import { Button, Grid, Typography } from "@mui/material";

import ListCard from "../../components/list-card/ListCard";
import Loading from "../../components/loading/Loading";
import FavoritePokemonListFunctions from "./FavoritePokemonList.functions";

const FavoritePokemonList: React.FC = () => {
    const {
        navigate,
        pokemonData,
        loading,
        handleFavorite, } = FavoritePokemonListFunctions();

    return (
        <Grid container rowGap={4}>
            <Grid item container xs={12} lg={6} >
                <Typography variant="h6" color="inherit" noWrap fontWeight={500}>
                    Seus favoritos
                </Typography>
            </Grid>
            <Grid item container xs={12} lg={6} justifyContent="flex-end">
                <Button color="primary" onClick={() => navigate('/')}>
                    Voltar
                </Button>
            </Grid>
            <Grid item xs={12}>
                <ListCard data={pokemonData} onClickFavorite={handleFavorite} />
            </Grid>
            {loading && <Loading />}
        </Grid >
    );
}

export default FavoritePokemonList;