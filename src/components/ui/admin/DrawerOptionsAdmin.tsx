import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { useAppDispatch } from '../../../hooks';
import { toogleDrawer } from '../../../store/slices/ui/uiSlice';

export const DrawerOptionsAdmin = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    return (
        <>
            <List>
                <ListItem  disablePadding>
                    <ListItemButton onClick={() => {
                            navigate('users')
                            dispatch(toogleDrawer())
                        }}>
                        <ListItemIcon>
                            <GroupIcon fontSize='large' color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary={
                            <Typography fontSize={28}>Usuarios</Typography>
                        } />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem  disablePadding>
                    <ListItemButton onClick={() => {
                            navigate('products')
                            dispatch(toogleDrawer())
                        }}>
                        <ListItemIcon>
                            <FoodBankIcon fontSize='large' color='secondary'/>
                        </ListItemIcon>
                        <ListItemText primary={
                            <Typography fontSize={28}>Productos</Typography>
                        } />
                    </ListItemButton>
                </ListItem>
            </List>
        </>

    )
}
