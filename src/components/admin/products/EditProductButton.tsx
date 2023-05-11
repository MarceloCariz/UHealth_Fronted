import {Button} from '@mui/material'
import { useAppDispatch } from '../../../hooks'
import { toogleModalProductActions } from '../../../store/slices/Product/productSlice';

export const EditProductButton = () => {

    const dispatch = useAppDispatch();

    return (
        <Button variant='contained' onClick={() => dispatch(toogleModalProductActions('edit'))}>
            Editar
        </Button>
    )
}
