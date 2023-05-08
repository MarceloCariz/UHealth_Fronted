import { Box, Container } from "@mui/material"
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks";
import { getUserByToken } from "../store/slices/auth/thunk";


const AuthPageLayout = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {token} = useAppSelector(state => state.auth);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        console.log("authlayout")
        if(token){
            dispatch(getUserByToken());
            navigate("/home");
        }

    },[token])

    return (
        <> 
            <Container maxWidth={"xl"}  >
            <Box marginTop={4}>
                <Outlet/>
            </Box>
            </Container>
        </>
    )
}

export  {AuthPageLayout}