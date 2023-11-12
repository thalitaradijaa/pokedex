import {
    Card as CardMaterial,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Stack,
    Chip
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface CardProps {
    id: number
    name: string;
    imageUrl: string;
    types: string[];
    favorite: boolean;
    onClickFavorite: (id: number) => void;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
    const { id, name, imageUrl, favorite, types, onClickFavorite } = props;

    return (
        <CardMaterial sx={{ width: 220 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    sx={{
                        minHeight: 220,
                        width: '100%',
                        objectFit: 'cover'
                    }}
                    image={imageUrl}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'space-between' }} >
                <Stack direction="row" columnGap={1}>
                    {types?.map(type =>
                        <Chip label={type} size="small" />
                    )}
                </Stack>
                <IconButton size="small" color="primary" onClick={() => onClickFavorite(id)}>
                    {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardActions>
        </CardMaterial>
    );
};

export default Card;