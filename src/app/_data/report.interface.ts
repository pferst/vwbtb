import { ErrCoordinates } from "./coordinates.interface";
export interface Report{
    id: string,
    carColor: string,
    date: Date,
    procStage: string,
    carType: string,
    carSide: string,
    lr: string,
    errType: string,
    carPart: string,
    errInclusion: string,
    errCoordinates: ErrCoordinates[]
}