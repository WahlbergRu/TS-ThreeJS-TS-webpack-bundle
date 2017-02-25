export interface IGEOJson {
    type: string;
    geometry: {
        type: string,
        coordinates: Array<Array<Array<number>>>
    },
    properties: {
        name: string
    }
}