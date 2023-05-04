import { Outlet } from "react-router-dom";

import {Container, Box} from "@mui/material";
import { DrawerUi, AppBar } from "../components/ui/";




const HomePageLayout = () => {
    return (
        <> 
            <AppBar/>
            <DrawerUi/>
            <Container maxWidth={"xl"}  >
            <Box marginTop={4}>
                <Outlet/>
            </Box>
            </Container>
        </>
    )
}

export  {HomePageLayout}