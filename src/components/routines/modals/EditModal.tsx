import {Modal, Box, Typography} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { toogleModaleEditRoutine } from '../../../store/slices/routine/routineSlice';
import { EditForm } from './EditForm';

export const EditModal = () => {

    const {isOpenEditModalRoutine} = useAppSelector(state => state.routine);
    const dispatch = useAppDispatch();

    return (
        <Modal
            open={isOpenEditModalRoutine}
            onClose={() => dispatch(toogleModaleEditRoutine())}
            sx={{display:"flex", alignItems:"center", justifyContent: "center"}}
        >
            <Box  width={"25%"} height={"50%"} sx={{backgroundColor: "white"}} borderRadius={3} paddingX={4} paddingY={2}  
                display={"flex"} flexDirection={"column"} justifyItems={"center"} alignItems={"center"} gap={5}>
                <Typography  variant='h4' textAlign={"center"} >Editar Rutina</Typography>
                
                <EditForm/>
            </Box>

        </Modal>
    )
}
