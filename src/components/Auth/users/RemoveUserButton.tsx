import {Button} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deleteUser } from '../../../store/slices/user/thunk';



export const RemoveUserButton = () => {

    const dispatch = useAppDispatch();
    const {activeUserAction} = useAppSelector(state => state.users);
    return (
        <Button variant='contained' color='error' onClick={() => dispatch(deleteUser(activeUserAction?.id || ""))}>
            Eliminar
        </Button>
    )
}
