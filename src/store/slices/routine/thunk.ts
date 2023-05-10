import uhealththApi from "../../../api/uhealthAxios";
import { toastError, toastSuccess } from "../../../components/ui";
import { CreateRoutineI, RoutineResponseI, UpdateRoutineI } from "../../../interfaces";
import { RootState } from "../../store";
import { removeRoutineById, setRoutinesByUser, updateRoutineById } from "./routineSlice";



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

export const putRoutine = (routine: any) => {
    return async(dispatch:any, getState:any)=>{
        try {
            const routineNewData = {
                productId: routine.productName,
                date: routine.date,
                horario: routine.horario
            }
            const {data} = await uhealththApi.put(`/user/routine/update/${routine.id}`,routineNewData);
            console.log(data)
            dispatch(updateRoutineById({routine:data}))
            toastSuccess("Rutina Actualizada correctamente")
        } catch (error) {
            console.log(error)
        }
    }
}