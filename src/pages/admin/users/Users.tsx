import {Box, Typography} from '@mui/material'
import { ListUsers } from '../../../components'

const Users = () => {
    

    return (
        <Box>
            <Typography variant='h4' textAlign={"center"} >Administrar usuarios</Typography>
            <ListUsers/>
        </Box>
    )
}

export default Users