export interface Pokemon {
    id: number;
    name: string;
    thumbnailImage: string;
    types: string[];
    weight: number;
    favorite?: boolean;
}