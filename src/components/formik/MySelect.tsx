import { ErrorMessage, useField } from "formik"
import {Select} from '@mui/material';

interface Props{
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    [x: string] : any;
}

export const MySelect = ({label, ...props}:Props) => {

    const [field] = useField(props);

    return (
        <>
            <Select 
            defaultValue={"seleccione"} 
            label={label}
            variant="filled"
            fullWidth {...field} {...props} />
            <ErrorMessage name={props.name} component="span" className="error"/>
        </>
    )
}