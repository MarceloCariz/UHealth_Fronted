import {Box, Typography} from '@mui/material';
import { AddRoutineForm } from '../../components/routines/AddRoutineForm';


const Home = () => {
    return (
        <Box >
            <Typography textAlign={"center"} component={"h2"} variant='h4'>Crear Rutina</Typography>
            <Box marginTop={10} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <AddRoutineForm/>
            </Box>
        </Box>
    )
}

export default Home