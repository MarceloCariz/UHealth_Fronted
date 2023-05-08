import { Drawer , Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { toogleDrawer } from '../../store/slices/ui/uiSlice';
import { useNavigate } from 'react-router-dom';


export const DrawerUi = () => {

    const {isOpenDrawer} = useAppSelector(state => state.ui);
    const {user} = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const role = user?.role;
    console.log(role)
    return (
        <Drawer
            anchor={"left"}
            open={isOpenDrawer}
            onClose={()=>dispatch(toogleDrawer())}
        >
            <Box sx={{width: 250, marginTop: "1rem"}}>
            <Typography component={"h2"} fontSize={28} textAlign="center" fontWeight={"semibold"}>Menu</Typography>
            <List>
                <ListItem  disablePadding>
                    <ListItemButton onClick={() => {
                            role === "administrador" ? navigate('/home-admin') : navigate("/home")
                        }}>
                        <ListItemIcon>
                            <AccessTimeIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary={`${role === "usuario" ? "Crear rutina" : "Administrar usuarios"} `} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem  disablePadding>
                    <ListItemButton onClick={() => navigate('routines')}>
                        <ListItemIcon>
                            {/* ICON */}
                        </ListItemIcon>
                        <ListItemText primary={"Rutinas"} />
                    </ListItemButton>
                </ListItem>
            </List>
            </Box>
        </Drawer>
    )
}
