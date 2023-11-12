export interface DataApiPokedex {
    count: number;
    next: string;
    previous: string | null;
    results: [
        {
            name: string;
            url: string;
        }
    ]
}