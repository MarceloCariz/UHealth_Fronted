import { Drawer , Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { toogleDrawer } from '../../store/slices/ui/uiSlice';


export const DrawerUi = () => {

    const {isOpenDrawer} = useAppSelector(state => state.ui);
    const dispatch = useAppDispatch();
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
                    <ListItemButton >
                    <ListItemIcon>
                        <AccessTimeIcon color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary={"Crear rutina"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem  disablePadding>
                    <ListItemButton>
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
