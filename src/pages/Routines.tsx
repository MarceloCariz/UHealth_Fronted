import {useEffect} from 'react'
import {Box} from '@mui/material'
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { getAllRoutinesByUser } from '../store/slices/routine/thunk';
import { RoutinesContainer } from '../components/routines';


const Routines = () => {

    const dispatch = useAppDispatch();
    const {routines} = useAppSelector(state => state.routine)

    useEffect(() => {
        dispatch(getAllRoutinesByUser());
    }, [])
    return (
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <RoutinesContainer/>
        </Box>
    )
}

export default Routines