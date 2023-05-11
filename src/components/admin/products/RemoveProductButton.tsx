import {Button} from '@mui/material'
import { useAppDispatch } from '../../../hooks'
import { deleteProduct } from '../../../store/slices/Product/thunk';

export const RemoveProductButton = () => {

  const dispatch = useAppDispatch();

  return (
    <Button variant='contained' color='error' onClick={() => dispatch(deleteProduct())}>
        Eliminar
    </Button>
  )
}
