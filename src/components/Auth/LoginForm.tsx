import { Box, Button, FormControl } from "@mui/material"
import { Form, Formik } from "formik"
import * as Yup from 'yup';
import { MyTextInput } from "../formik/MyTextInput";
import { useAppDispatch } from "../../hooks/reduxHook";
import { SignIn } from "../../store/slices/auth/thunk";
import { LoginI } from "../../interfaces";
import { useNavigate } from "react-router-dom";






export const LoginForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = ({email, password}:LoginI) => {
        dispatch(SignIn({email, password}));
        navigate("/home")
    }


    const initialValues = {
        email: "",
        password: ""
    }
    return (
        <Box>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleLogin(values)}
                validationSchema={
                    Yup.object({
                        email: Yup.string().email("El email no valido").required("El campo correo es obligatorio"),
                        password: Yup.string().required("El campo contraseña es obligatorio"),
                    })
                }
            >
                {
                    () => (
                        <Form>
                            <Box width={400} display={"flex"} flexDirection={"column"} gap={2}>
                                <FormControl>
                                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                                        <MyTextInput name="email" label="Correo electronico" placeholder="ejemplo@correo.com"/>
                                        <MyTextInput name="password" label="Contraseña"/>
                                        <Button fullWidth variant="contained" type="submit">
                                            Iniciar Sesion
                                        </Button>
                                    </Box>

                                </FormControl>
                            </Box>
                        </Form>
                    )
                }
                

            </Formik>
        </Box>
    )
}
