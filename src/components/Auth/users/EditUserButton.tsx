import {Button, ButtonProps} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { toogleUserModal } from '../../../store/slices/user/userSlice';


export const EditUserButton = (props?: ButtonProps) => {

    const dispatch = useAppDispatch();



    return (
        <Button variant='contained' color='primary'  onClick={() => dispatch(toogleUserModal('edit'))}>
            Editar
        </Button>
    )
}
