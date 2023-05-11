import {Modal, Box,MenuItem, Typography, Button} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toogleUserModal } from '../../../store/slices/user/userSlice';
import { MyTextInput } from '../../formik/MyTextInput';
import { MySelect } from '../../formik/MySelect';
import { createUser, updateUser } from '../../../store/slices/user/thunk';
import { UserI } from '../../../interfaces';



export const ModalUser = () => {


    const {isModalUserOpen, activeUserAction} = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    const handleSubmitActionModal = (user: UserI, resetForm:any) => {
        if(isModalUserOpen.type === "add"){
            dispatch(createUser(user, resetForm));
            return
        }
        //Actualizar
        console.log(user)
        dispatch(updateUser(user));
    }

    const initialValuesAdd:UserI = {
        username: "",
        email: "",
        password: "",
        rolName: "seleccione"
    }

    const initialValuesEdit:UserI = {
        id: activeUserAction?.id  || "",
        username: activeUserAction?.username || "",
        email: activeUserAction?.email || "",
        rolName: activeUserAction?.rolName || "",
    }

    const ValidationSchemaAdd = Yup.object({
        username: Yup.string().min(3,"Debe ser de un minimo de 3 caracteres").max(20, "No debe tener mas de 20 caracteres").required("Este campo es obligatorio"),
        email: Yup.string().email("Email no valido").required("Este campo es obligatorio"),
        password: Yup.string().min(8,"Debe ser de un minimo de 8 caracteres").max(20, "No debe tener mas de 20 caracteres").required("Este campo es obligatorio"),
        rolName: Yup.string().oneOf(['usuario','administrador'], "El rol debe ser usuario o administrador").required("Este campo es obligatorio")
    })

    const ValidationSchemaEdit= Yup.object({
        username: Yup.string().min(3,"Debe ser de un minimo de 3 caracteres").max(20, "No debe tener mas de 20 caracteres").required("Este campo es obligatorio"),
        email: Yup.string().email("Email no valido").required("Este campo es obligatorio"),
        rolName: Yup.string().oneOf(['usuario','administrador'], "El rol debe ser usuario o administrador").required("Este campo es obligatorio")
    })

    return (
        <Modal
            open={isModalUserOpen.active}
            sx={{display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center"}}
            onClose={() => dispatch(toogleUserModal(''))}
        >
            <Box sx={{backgroundColor: "white"}} borderRadius={3} paddingX={4} paddingY={2}  display={"flex"} flexDirection={"column"} gap={5}>
                <Typography  variant='h4' textAlign={"center"} >Agregar Usuario</Typography>
                <Formik
                    initialValues={isModalUserOpen.type === "add" ? initialValuesAdd : initialValuesEdit}
                    onSubmit={(e:UserI, {resetForm}) => {handleSubmitActionModal(e, resetForm)}}
                    validationSchema={
                        isModalUserOpen.type === "add" ? ValidationSchemaAdd : ValidationSchemaEdit
                    }
                >
                    {
                        () => (
                            <Form>
                                <Box width={400} display={"flex"} flexDirection={"column"} gap={2}>
                                    <MyTextInput label='Nombre de usuario' name="username"/>
                                    <MyTextInput label='Correo electronico' name="email" />
                                    {
                                        isModalUserOpen.type === "add" && (
                                            <MyTextInput label='Contraseña' name="password" />
                                        )
                                    }
                                    <MySelect label='Rol' name='rolName'  >
                                        <MenuItem value={"seleccione"}>Seleccione un rol</MenuItem>
                                        <MenuItem value={"administrador"}>Administrador</MenuItem>
                                        <MenuItem value={"usuario"}>Usuario</MenuItem>
                                    </MySelect>
                                    <Button type="submit" variant='contained' color={isModalUserOpen.type === "add" ? 'primary' : 'success'}>
                                        {isModalUserOpen.type === "add" ? "Agregar" : "Editar"}{" "}usuario
                                    </Button>
                                </Box>
                            </Form>
                        )
                    }
                </Formik>
            </Box>
        </Modal>
    )
}
