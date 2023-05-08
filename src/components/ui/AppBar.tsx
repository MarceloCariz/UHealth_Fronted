import {Link, useNavigate} from 'react-router-dom'
import { Box , Typography, IconButton, AppBar as AppBarMui, Toolbar,Container, Tooltip, Icon, Avatar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { toogleDrawer } from '../../store/slices/ui/uiSlice';
import { logout } from '../../store/slices/auth/authSlice';


export const AppBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth);


    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBarMui color='secondary'   elevation={2} position="static">
                <Container maxWidth="xl">
                    <Toolbar sx={{display: "flex"}}>
                        <Box display={"flex"} flexGrow={1} alignItems={"center"}>
                            <IconButton
                                edge="start"
                                aria-label="menu"
                                onClick={()=>dispatch(toogleDrawer())} size={"large"}
                            >
                                <MenuIcon sx={{color:"white", fontSize: "3.5rem"}} />
                            </IconButton>

                            <Link to={"/home"} style={{textDecoration: 'none'}}>
                                <Typography variant="h4"   color="white" component="div" sx={{ flexGrow: 1, fontSize:{xs: 28, md: 36}}}>
                                    UHealth
                                </Typography>
                            </Link>
                        </Box>


                        <Box sx={{flexGrow: 0}} display={"flex"} alignItems={"center"}>
                            <Typography textTransform={"capitalize"} variant='h6'>{user?.username}</Typography>
                            <Tooltip title="Perfil">
                                <IconButton>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Salir">
                                <IconButton onClick={handleLogout}>
                                    <LogoutIcon fontSize='large' sx={{color:"white"}}/>
                                </IconButton>
                            </Tooltip>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBarMui>
        </Box>
    )
}