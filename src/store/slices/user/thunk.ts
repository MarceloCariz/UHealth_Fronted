import uhealththApi from "../../../api/uhealthAxios";
import { toastError, toastSuccess } from "../../../components/ui";
import { UserI } from "../../../interfaces";
import { addUser, editUser, removeUser, setUsers, startLoadingUsers } from "./userSlice";



export const getAllUsers = () => {
    return async(dispatch:any, getState:any)=>{

        try{
            dispatch(startLoadingUsers());
            
            const {data} = await uhealththApi("/user/");

            dispatch(setUsers(data))
        }catch(error){
            console.log(error)
        }

    }
}

export const createUser = (user : UserI, resetForm:any) => {
    return async(dispatch:any, getState:any)=>{
        try{
            console.log(user)
            const {data} = await uhealththApi.post("/user/", user);
            dispatch(addUser({user:data}));
            toastSuccess("Usuario añadido");
            resetForm();
        }catch(error){
            console.log(error)
            toastError("Hubo un error")
        }

    }
}

export const updateUser = (user : UserI) => {
    return async(dispatch:any, getState:any)=>{
        try{
            console.log(user)
            const {data} = await uhealththApi.put(`/user/${user.id}`, {...user, password: '122345678'});
            dispatch(editUser({user:data}));
            toastSuccess("Usuario actualizado");
        }catch(error){
            console.log(error)
            toastError("Hubo un error")
        }

    }
}

export const deleteUser = (id: string) => {
    return async(dispatch:any, getState:any)=>{
        try{
            const {data} = await uhealththApi.delete(`/user/${id}`);
            dispatch(removeUser({id}));
            toastSuccess(data);
        }catch(error){
            console.log(error)
            toastError("Hubo un error")
        }

    }
}