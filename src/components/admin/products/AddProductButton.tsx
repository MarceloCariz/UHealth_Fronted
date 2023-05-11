import {Button} from '@mui/material'
import { toogleModalProductActions } from '../../../store/slices/Product/productSlice'
import { useAppDispatch } from '../../../hooks'

export const AddProductButton = () => {

    const dispatch = useAppDispatch();
    return (
        <Button variant='contained' onClick={() => dispatch(toogleModalProductActions('add'))}>
            Agregar nuevo producto
        </Button>
    )
}
