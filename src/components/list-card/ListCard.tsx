import React from 'react';

import { Grid } from "@mui/material";

import Card from "../../components/card/Card"
import { Pokemon } from "../../interfaces/Pokemon";

interface listCardProps {
    data: Pokemon[];
    onClickFavorite: (id: number) => void
}

const ListCard: React.FC<listCardProps> = (props: listCardProps) => {
    const { data, onClickFavorite } = props;
    return (
        <Grid container rowGap={4}>
            {data?.map((item, key) =>
                <Grid item container justifyContent="center" xs={12} sm={6} md={4} lg={2} key={key}>
                    <Card id={item.id} name={item?.name} imageUrl={item?.thumbnailImage} favorite={item?.favorite ?? false} types={item.types} onClickFavorite={onClickFavorite} />
                </Grid>
            )}
        </Grid>
    );
}

export default ListCard;