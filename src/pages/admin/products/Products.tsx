import { Box, Typography } from '@mui/material'
import { ListProducts } from '../../../components';

const Products = () => {
    return (
        <Box>
            <Typography variant='h4' textAlign={"center"} >Administrar Productos</Typography>
            <ListProducts/>
        </Box>
    )
}


export default Products;