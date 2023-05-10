import {Button} from '@mui/material'
import { RoutineResponseI } from '../../../interfaces'
import { useAppDispatch } from '../../../hooks'
import { setActiveRoutine, toogleModaleEditRoutine } from '../../../store/slices/routine/routineSlice';

interface Props {
    routine: RoutineResponseI;
}

export const EditRoutineButton = ({routine}:Props) => {

    const dispatch = useAppDispatch();

    return (
        <Button variant='contained' color='primary' onClick={() => {
            dispatch(setActiveRoutine(routine))
            dispatch(toogleModaleEditRoutine())
        }}>
            Editar Rutina

        </Button>
    )
}
