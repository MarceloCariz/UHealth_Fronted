import {useEffect} from 'react'
import { Form, Formik } from "formik"
import * as Yup from 'yup';
import { MySelect } from "../formik/MySelect";
import {MenuItem, Button, FormControl, Box, TextField} from '@mui/material';
import { MyTextInput } from "../formik/MyTextInput";
import { getDateToday } from "../../utils/dates";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { getCategories } from '../../store/slices/category/thunk';

export const AddRoutineForm = () => {

    const dispatch = useAppDispatch();
    const {categories} = useAppSelector(state => state.category);
    useEffect(() => {
        dispatch(getCategories());
    }, [])

    const initialValues ={
        // productId: "",
        categorias: "",
        producto: "",
        horario: "",
    }

    const handleSubmit = (datos:any, reset:any) => {
        console.log(datos)
        reset();
    }

    const getCategoriesIds = () => {
        const categoriesIds = categories.map(({id})=> (id))
        return categoriesIds.length == 0 ? [''] : categoriesIds;
    } 


    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}
            validationSchema={
                Yup.object({
                    categorias: Yup.string().oneOf(getCategoriesIds(), 'La categoria no coincide').required("Este campo es obligatorio"),
                    producto: Yup.string().oneOf(['pepino','platano'], "Producto incorrecto").required("Este campo es obligatorio"),
                    horario: Yup.string().oneOf(['mañana','tarde','noche'], "Horaio debe ser mañana, tarde o noche ").required("Este campo es obligatorio"),
                })
            }
        >
            
            {
                () => (
                    <Form>
                        {/* <FormControl fullWidth> */}
                            <Box width={400} display={"flex"} flexDirection={"column"} gap={2}>
                                {/* <MyTextInput label="Producto" name="producto"/> */}
                                <MySelect label="Categorias" name="categorias" >
                                    <MenuItem value="seleccione">Seleccione</MenuItem>
                                    {
                                        categories.map(({categoryName, id}) => (
                                            <MenuItem key={id} value={id}>{categoryName}</MenuItem>
                                        ))
                                    }
                                </MySelect>

                                <MySelect  label="Horario" name="horario" >
                                    <MenuItem value={"seleccione"}>Seleccione un horario</MenuItem>
                                    <MenuItem value={"mañana"}>Mañana</MenuItem>
                                    <MenuItem value={"tarde"}>Tarde</MenuItem>
                                    <MenuItem value={"noche"}>Noche</MenuItem>
                                </MySelect>
                                <TextField disabled label="fecha" value={getDateToday()}/>
                                <Button type="submit">Crear</Button>
                            </Box>

                        {/* </FormControl> */}
                    </Form>
                )
            }
        </Formik>
    )
}
