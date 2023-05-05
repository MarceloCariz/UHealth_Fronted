import {Grid, Typography} from '@mui/material';
import { useAppSelector } from '../../../hooks/reduxHook';
import { RoutineItem } from './RoutineItem';




export const RoutinesContainer = () => {

    const {routines} = useAppSelector(state => state.routine);
    return (
        <Grid container width={"100%"} display={'flex'} spacing={2} >
                {
                    routines.length > 0 && routines.map((routine) => (
                        <Grid key={routine.id} item xs={12} md={4} lg={3}>
                            <RoutineItem routine={routine}/>
                        </Grid>
                    ))
                }
        </Grid>
    )
}
