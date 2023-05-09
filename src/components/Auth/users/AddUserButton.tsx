import { Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { toogleUserModal } from '../../../store/slices/user/userSlice';

export const AddUserButton = () => {

    const dispatch = useAppDispatch();
    const {activeUserAction} = useAppSelector(state => state.users);

    const handleAddUser = () => {
        console.log(activeUserAction)
    }
    return (
        <Button variant='contained' color='primary' onClick={() => dispatch(toogleUserModal('add'))}>
            Agregar nuevo usuario
        </Button>
    )
}
