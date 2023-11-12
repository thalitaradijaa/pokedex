export interface ApiResult<Data> {
    data: Data | null,
    status: number | null;
    statusText: string | null;
}