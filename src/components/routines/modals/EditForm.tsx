import {useEffect} from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import { Box, MenuItem, Typography, TextField, Button } from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {getProductByCategory} from '../../../store/slices/Product/thunk'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCategories } from '../../../store/slices/category/thunk';
import { getDateToday } from '../../../utils/dates';
import { MySelect } from '../../formik/MySelect';
import dayjs from 'dayjs';
import { putRoutine } from '../../../store/slices/routine/thunk';



export const EditForm = () => {


    const {activeRoutine} = useAppSelector(state => state.routine);
    const {products} = useAppSelector(state => state.products);
    const {categories} = useAppSelector(state => state.category);


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProductByCategory(activeRoutine?.product.category.id || ""));
    }, [])

    const initialValues = {
        horario: activeRoutine?.horario || "", 
        date: activeRoutine?.date || "",
        productName: activeRoutine?.product.id || "",
        categoryName: activeRoutine?.product.category.id || "",
    }

    const getCategoriesIds = () => {
        return categories.length > 0 ? categories.map((category) => (category.id)) : [''];
    }

    const getProductsIds = () => {
        const productsIds = products.map(({id})=>(id));
        return products.length === 0 ? [''] : productsIds;
    }

    const onChangeProductByCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value;
        if(selectedValue == 'seleccione' || selectedValue == '') return;
        dispatch(getProductByCategory(selectedValue));
        getProductsIds();
    }

    const handleSubmitUpdate = (values:any) => {
        const updateRoutine = {...values, id: activeRoutine?.id};
        //eliminar cateogryid 
        dispatch(putRoutine(updateRoutine))
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(e:any) => handleSubmitUpdate(e)}
            validationSchema={
                Yup.object({
                    horario: Yup.string().oneOf(["mañana","tarde","noche"],"el horario debe ser mañana, tarde, noche").required("Este campo es obligatorio"),
                    date: Yup.date().required("Este campo es obligatorio"),
                    productName: Yup.string().oneOf(getProductsIds(),"El producto no es valido"),
                    categoryName: Yup.string().oneOf(getCategoriesIds(),"Seleccione una categoria valida").required("Este campo es obligatorio")
                })
            }
        >
            {
                ({handleChange, setFieldValue, values}) => (
                    <Form>
                        {/* <FormControl fullWidth> */}
                            <Box width={400} display={"flex"} flexDirection={"column"} gap={2}>
                                <MySelect
                                    onChange={(e:any) => 
                                        {
                                            handleChange(e)
                                            onChangeProductByCategory(e)
                                            setFieldValue("productName", "seleccione")

                                        }} 
                                        label="Categorías" name="categoryName" 
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
                                    label="Producto" name="productName" 
                                >
                                    <MenuItem  value="seleccione">Seleccione un producto</MenuItem>
                                    {
                                        values.categoryName !== "seleccione" &&  products.length > 0 && products.map(({id, productName}) => (
                                            <MenuItem  key={id} value={id}>
                                                <Typography textTransform={"capitalize"}>
                                                {productName}
                                                </Typography>
                                            </MenuItem>
                                        ))
                                    }

                                </MySelect>
                            
                            

                                <MySelect defaultValue={"seleccione"}  label="Horario" name="horario" >
                                    <MenuItem value={"seleccione"}>Seleccione un horario</MenuItem>
                                    <MenuItem value={"mañana"}>Mañana</MenuItem>
                                    <MenuItem value={"tarde"}>Tarde</MenuItem>
                                    <MenuItem value={"noche"}>Noche</MenuItem>
                                </MySelect>
                                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                    <DatePicker onChange={(e) => setFieldValue("date",e?.format("YYYY-MM-DD"))} format='DD/MM/YYYY' label="Fecha" defaultValue={dayjs(activeRoutine?.date)}/>
                                </LocalizationProvider>
                                <Button color='secondary' variant='contained' type="submit">Actualizar</Button>
                            </Box>
                    </Form>
        )}
        </Formik>
    )
}
