import {ChangeEvent, useEffect, useState} from 'react'
import {  Form, Formik } from "formik"
import * as Yup from 'yup';
import { MySelect } from "../formik/MySelect";
import {MenuItem, Button, Select, Box, TextField, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { getCategories } from '../../store/slices/category/thunk';
import { getProductByCategory } from '../../store/slices/Product/thunk';
import { createRoutine } from '../../store/slices/routine/thunk';
import { CreateRoutineI } from '../../interfaces';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export const AddRoutineForm = () => {

    const dispatch = useAppDispatch();
    const {categories} = useAppSelector(state => state.category);
    const {products} = useAppSelector(state => state.products);
    const {user} = useAppSelector(state => state.auth);


    useEffect(() => {
        dispatch(getCategories());
    }, [])

    const initialValues = {
        // productId: "",
        categorias: "seleccione",
        producto: "seleccione",
        horario: "seleccione",
        date: "",
    }

    const handleSubmit = (datos:any) => {

        const routine:CreateRoutineI = {userId: user?.id || "", horario: datos.horario, productId: datos.producto, date: datos.date};
        dispatch(createRoutine(routine))
    }

    const onChangeProductByCategory = (e:ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value;
        if(selectedValue == 'seleccione' || selectedValue == '') return;
        dispatch(getProductByCategory(selectedValue));
    }

    const getCategoriesIds = () => {
        const categoriesIds = categories.map(({id})=> (id))
        return categoriesIds.length == 0 ? [''] : categoriesIds;
    }
    
    const getProductsIds = () => {
        const productsIds = products.map(({id})=>(id));
        return products.length === 0 ? [''] : productsIds;
    }


    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
                handleSubmit(values);
                resetForm({values: {categorias: 'seleccione', producto: 'seleccione', horario: 'seleccione', date: "" }});
            }}
            validationSchema={
                Yup.object({
                    categorias: Yup.string().oneOf(getCategoriesIds(), 'La categoría debe ser válida').required("Este campo es obligatorio"),
                    producto: Yup.string().oneOf(getProductsIds(), "Producto incorrecto").required("Este campo es obligatorio"),
                    horario: Yup.string().oneOf(['mañana','tarde','noche'], "Horaio debe ser mañana, tarde o noche ").required("Este campo es obligatorio"),
                    date: Yup.date().required("Este campo es obligatorio")
                })
            }
        >
            
            {
                ({handleChange, errors, values, setFieldValue, handleReset}) => (
                    <Form>
                        {/* <FormControl fullWidth> */}
                            <Box width={{xs:"110%", md:400}} display={"flex"} flexDirection={"column"} gap={2}>
                                <MySelect 
                                        // defaultValue={"seleccione"}
                                        error={errors.categorias ? true : false}
                                        onChange={(e:any) => 
                                        {
                                            handleChange(e)
                                            onChangeProductByCategory(e) 
                                            setFieldValue("producto", "seleccione")
                                        }}
                                        label="Categorías" name="categorias" 
                                >
                                    <MenuItem  value="seleccione">Seleccione una categoria</MenuItem>
                                    {
                                        categories.map(({categoryName, id}) => (
                                            <MenuItem  key={id} value={id}>
                                                <Typography textTransform={"capitalize"}>
                                                {categoryName}
                                                </Typography>
                                            </MenuItem>
                                        ))
                                    }
                                </MySelect>

                                {/* Select producto */}
                                <MySelect
                                    error={errors.producto ? true : false}
                                    label="Producto" name="producto" 
                                    defaultValue={"seleccione"}
                                >
                                    <MenuItem  value="seleccione">Seleccione un producto</MenuItem>
                                    {
                                        products.length > 0 && products.map(({id, productName}) => (
                                            <MenuItem  key={id} value={id}>
                                                <Typography textTransform={"capitalize"}>
                                                {productName}
                                                </Typography>
                                            </MenuItem>
                                        ))
                                    }

                                </MySelect>
                            
                                
                                <Typography>Calorías: {products.find(({id})=> (id === values.producto))?.calories || "0"} kcal</Typography>
                                <Typography>Carbohidratos: {products.find(({id})=> (id === values.producto))?.carbs || "0"} gr</Typography>

                                <MySelect defaultValue={"seleccione"}  label="Horario" name="horario" >
                                    <MenuItem value={"seleccione"}>Seleccione un horario</MenuItem>
                                    <MenuItem value={"mañana"}>Mañana</MenuItem>
                                    <MenuItem value={"tarde"}>Tarde</MenuItem>
                                    <MenuItem value={"noche"}>Noche</MenuItem>
                                </MySelect>
                                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                    <DatePicker onChange={(e) => setFieldValue("date",e?.format("YYYY-MM-DD") || "")} format='DD/MM/YYYY' label="Fecha" defaultValue={dayjs(new Date())}/>
                                </LocalizationProvider>
                                {/* <TextField  disabled label="fecha" value={getDateToday()}/> */}
                                <Button color='secondary' variant='contained' type="submit">Crear</Button>
                            </Box>

                    </Form>
                )
            }
        </Formik>
    )
}
