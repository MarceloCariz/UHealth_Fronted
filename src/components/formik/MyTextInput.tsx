import { ErrorMessage, useField } from "formik";
import { Box,  TextField } from "@mui/material";

interface Props{
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    [x: string] : any;
}

export const MyTextInput = ({label, ...props}:Props) => {

    const [field] = useField(props); /// con meta se puede agregar estilos con los errores que proporciona el meta

    return (
        <Box display={"flex"} flexDirection="column">
            {/* <FormLabel className="text-left  font-semibold text-lg" htmlFor={props.id || props.name}>{label}</FormLabel> */}
            <TextField label={label} {...field} {...props} />
            <ErrorMessage className="error"  name={props.name} component="span"/>
        </Box>
    )
}