import {Link} from 'react-router-dom'
import { Box , Typography, IconButton, AppBar as AppBarMui, Toolbar,Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from '../../hooks/reduxHook';
import { toogleDrawer } from '../../store/slices/ui/uiSlice';


export const AppBar = () => {

    const dispatch = useAppDispatch();

    return (
        <Box >
            <AppBarMui color='secondary'   elevation={2} position="static">
            <Container maxWidth="xl">
                <Toolbar  >
                <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={()=>dispatch(toogleDrawer())} size={"large"}
                >
                    <MenuIcon sx={{color:"white", fontSize: "3.5rem"}} />
                </IconButton>
                <Link to={"/home"} style={{textDecoration: 'none'}}>
                    <Typography variant="h4"   color="white" component="h1" sx={{ flexGrow: 1, fontSize:{xs: 28, md: 36}}}>
                        UHealth
                    </Typography>
                    </Link>
                {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </Container>
            </AppBarMui>
        </Box>
    )
}