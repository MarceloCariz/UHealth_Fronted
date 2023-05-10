import uhealththApi from "../../../api/uhealthAxios";
import { toastError, toastSuccess } from "../../../components/ui";
import { CreateRoutineI } from "../../../interfaces";
import { RootState } from "../../store";
import { removeRoutineById, setRoutinesByUser } from "./routineSlice";



export const getAllRoutinesByUser = () => {
    return async(dispatch:any, getState: () => RootState)=>{
        try {
            const {user} = getState().auth;

            const userId = user?.id!;

            const {data} = await uhealththApi(`/user/routine/get/all/${userId}`);
            
            dispatch(setRoutinesByUser(data));
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteRoutineById = (routineId : string) => {
    return async(dispatch:any, getState:any)=>{
        try {
            const {data} = await uhealththApi.delete(`/user/routine/delete/${routineId}`);
            dispatch(removeRoutineById(routineId));
            toastSuccess(data);
        } catch (error) {
            console.log(error)
            toastError("Hubo un error al eliminar la rutina")
        }
    }
}

export const createRoutine = (routine:CreateRoutineI) => {
    return async(dispatch:any, getState:any)=>{
        try {
            const {data} = await uhealththApi.post('/user/routine/create',routine);
            console.log(data)
            toastSuccess("Rutina creada correctamente")
        } catch (error) {
            console.log(error)
        }
    }
}