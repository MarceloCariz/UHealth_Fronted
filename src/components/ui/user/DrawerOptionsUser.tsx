
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks';
import { toogleDrawer } from '../../../store/slices/ui/uiSlice';

export const DrawerOptionsUser = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <>
            <List>
                <ListItem  disablePadding>
                    <ListItemButton onClick={() => {
                            navigate("/home")
                            dispatch(toogleDrawer())
                        }}>
                        <ListItemIcon>
                            <RestaurantIcon fontSize='large' color="primary"/>
                        </ListItemIcon>
                        <ListItemText  primary={
                            <Typography fontSize={28}>Crear rutina</Typography>
                        } />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem  disablePadding>
                    <ListItemButton onClick={() => {
                            navigate('routines')
                            dispatch(toogleDrawer())
                        }}>
                        <ListItemIcon>
                            <CalendarMonthIcon fontSize='large' color='secondary'/>
                        </ListItemIcon>
                        <ListItemText  primary={
                            <Typography fontSize={28}>Rutinas</Typography>
                        } />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}
