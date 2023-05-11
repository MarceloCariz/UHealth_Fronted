import { Button } from '@mui/material'
import { useAppDispatch } from '../../../hooks'
import { toogleUserModal } from '../../../store/slices/user/userSlice';

export const AddUserButton = () => {

    const dispatch = useAppDispatch();


    return (
        <Button variant='contained' color='primary' onClick={() => dispatch(toogleUserModal('add'))}>
            Agregar nuevo usuario
        </Button>
    )
}
