import { ErrCoordinates } from "./coordinates.interface";
export interface Report{
    id: string,
    date: Date,
    procStage: string,
    carType: string,
    carSide: string,
    errType: string,
    errInclusion: string,
    errCoordinates: ErrCoordinates[]
}