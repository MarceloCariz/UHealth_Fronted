import {Modal, Box,MenuItem, Typography, Button} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toogleUserModal } from '../../../store/slices/user/userSlice';
import { MyTextInput } from '../../formik/MyTextInput';
import { MySelect } from '../../formik/MySelect';
import { createUser, updateUser } from '../../../store/slices/user/thunk';
import { UserI } from '../../../interfaces';
import { setActiveProduct, toogleModalProductActions } from '../../../store/slices/Product/productSlice';
import { useEffect } from 'react';
import { getCategories } from '../../../store/slices/category/thunk';
import { createNewProduct, getProductByCategory, putProduct } from '../../../store/slices/Product/thunk';



export const ModalProductActions = () => {


    const {isOpenModalProductActions, activeProduct, products} = useAppSelector(state => state.products);
    const {categories} = useAppSelector(state => state.category); 
    const dispatch = useAppDispatch();

    const handleSubmitActionModal = (product:any, resetForm:any) => {
        if(isOpenModalProductActions.type === "add"){
            // dispatch(createUser(product, resetForm));
            dispatch(createNewProduct(product, resetForm));
            return
        }
        //Actualizar
        dispatch(putProduct(product));
    }

    useEffect(() => {
        dispatch(getCategories());
    },[])

    const initialValuesAdd = {
        productName: "",
        calories: "",
        carbs: "",
        categoryId: "seleccione",
    }

    const initialValuesEdit = {
        id: activeProduct?.id  || "",
        productName:activeProduct?.productName|| "",
        calories: activeProduct?.calories || "",
        carbs: activeProduct?.carbs || "",
        categoryId: activeProduct?.category.id || "",
    }

    const getCategoriesIds = () => {
        return categories.map((c) => (c.id));
    }

    const getProductIds = () => {
        return products.map((p) => (p.id));
    }

    const ValidationSchemaAdd = Yup.object({
        productName: Yup.string().min(3,"Debe ser de un minimo de 3 caracteres").max(20, "No debe tener mas de 20 caracteres").required("Este campo es obligatorio"),
        calories: Yup.number().typeError("Las calorías deben ser un numero").positive("Las calorias deben ser positiva").required("Este campo es obligatorio"),
        carbs: Yup.number().typeError("Los carbohidratos deben ser un numero").positive("Los carbohidratos deben ser positiva").required("Este campo es obligatorio"),
        categoryId: Yup.string().oneOf(getCategoriesIds(), "La categoría no es valida").required("Este campo es obligatorio")
    })

    const ValidationSchemaEdit= Yup.object({
        productName: Yup.string().min(3,"Debe ser de un minimo de 3 caracteres").max(20, "No debe tener mas de 20 caracteres").required("Este campo es obligatorio"),
        calories: Yup.number().typeError("Las calorías deben ser un numero").positive("Las calorias deben ser positiva").required("Este campo es obligatorio"),
        carbs: Yup.number().typeError("Los carbohidratos deben ser un numero").positive("Los carbohidratos deben ser positiva").required("Este campo es obligatorio"),
        categoryId: Yup.string().oneOf(getCategoriesIds(), "La categoría no es valida").required("Este campo es obligatorio")
    })


    return (
        <Modal
            open={isOpenModalProductActions.active}
            sx={{display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center"}}
            onClose={() => dispatch(toogleModalProductActions(''))}
        >
            <Box sx={{backgroundColor: "white"}} borderRadius={3} paddingX={4} paddingY={2}  display={"flex"} flexDirection={"column"} gap={5}>
                <Typography  variant='h4' textAlign={"center"} >{isOpenModalProductActions.type === "add" ? "Agregar" : "Editar"} producto</Typography>
                <Formik
                    initialValues={isOpenModalProductActions.type === "add" ? initialValuesAdd : initialValuesEdit}
                    onSubmit={(e, {resetForm}) => {handleSubmitActionModal(e, resetForm)}}
                    validationSchema={
                        isOpenModalProductActions.type === "add" ? ValidationSchemaAdd : ValidationSchemaEdit
                    }
                >
                    {
                        () => (
                            <Form>
                                <Box width={400} display={"flex"} flexDirection={"column"} gap={2}>

                                    <MyTextInput label='Nombre del producto'  name="productName"/>





                                    <MyTextInput label='Calorías' name="calories" />
                                    <MyTextInput label='Carbohidratos' name="carbs" />

                                    <MySelect  label='Categoria' name='categoryId'>
                                        <MenuItem value={"seleccione"}>Seleccione una categoría</MenuItem>
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

                                    <Button type="submit" variant='contained' color={isOpenModalProductActions.type === "add" ? 'primary' : 'success'}>
                                        {isOpenModalProductActions.type === "add" ? "Agregar" : "Editar"}{" "}producto
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
