import {Grid, Typography} from '@mui/material';
import { useAppSelector } from '../../../hooks/reduxHook';
import { RoutineItem } from './RoutineItem';
import { useNavigate } from 'react-router-dom';




export const RoutinesContainer = () => {
    const navigate = useNavigate();
    const {routines} = useAppSelector(state => state.routine);
    console.log(routines.length)
    return (
        <Grid container width={"100%"} display={'flex'} spacing={2} >
                {
                    routines.length > 0 ? routines.map((routine) => (
                        <Grid key={routine.id} item xs={12} md={4} lg={3}>
                            <RoutineItem routine={routine}/>
                        </Grid>
                    )) :
                    <Typography>Aún no hay rutinas click 
                        <Typography sx={{cursor:'pointer'}} color={"blue"} onClick={() => navigate('/home')} component={"a"}> aquí </Typography>
                        para crear una
                    </Typography>
                }
        </Grid>
    )
}
