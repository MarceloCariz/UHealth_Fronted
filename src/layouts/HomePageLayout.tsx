import { Outlet } from "react-router-dom";
import {Container, Box} from "@mui/material";
import { DrawerUi, AppBar } from "../components/ui/";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const HomePageLayout = () => {
    return (
        <> 
            <AppBar/>
            <DrawerUi/>
            <Container maxWidth={"xl"}  >
            <Box marginTop={4}>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
                <Outlet/>
            </Box>
            </Container>
        </>
    )
}

export  {HomePageLayout}