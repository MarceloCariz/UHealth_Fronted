import { Box } from "@mui/material"
import { LoginForm } from "../components"

const Login = () => {
    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <LoginForm/>
        </Box>
    )
}

export default Login