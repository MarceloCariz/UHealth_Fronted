import {useEffect} from 'react'
import {Grid, Typography, Box} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { RoutineItem } from './RoutineItem';
import { useNavigate } from 'react-router-dom';
import { getAllRoutinesByUser } from '../../../store/slices/routine/thunk';
import { EditModal } from '../modals';




export const RoutinesContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {routines} = useAppSelector(state => state.routine);
    const {user} = useAppSelector(state => state.auth);

    useEffect(() => {
        if(!user) return;
        dispatch(getAllRoutinesByUser());
    }, [user])
    return (
        <>
            <EditModal/>
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
        </>
    )
}
