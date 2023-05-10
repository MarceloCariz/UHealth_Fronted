import {Box, Card, CardHeader, CardContent, Typography, IconButton, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { RoutineResponseI } from '../../../interfaces';
import { deleteRoutineById } from '../../../store/slices/routine/thunk';
import { useAppDispatch } from '../../../hooks/reduxHook';
import { EditRoutineButton } from '../ActionsButtons';
import dayjs from 'dayjs';

interface Props {
    routine: RoutineResponseI;
}

export const RoutineItem = ({routine}:Props) => {

    const {date, horario ,product , id} = routine;

    const dispatch = useAppDispatch();

    const dateTransform = () => {
        const newDate = dayjs(date).format("DD/MM/YYYY");
        return newDate;
        // console.log(parseDate)
        // return
        // const formatedDate = parseDate.toLocaleDateString('es-US',{ day: '2-digit', month: '2-digit', year: 'numeric' });
        // return formatedDate;
    }

    const removeRoutine = () => {
        dispatch(deleteRoutineById(id));
    }



    return (
        <Box>
            <Card>
                <CardHeader  sx={{backgroundColor:'rgb(50, 77, 112)', color: 'white'}} 
                    title={`Fecha: ${dateTransform()}`}
                    action={<IconButton onClick={removeRoutine} sx={{pb:1}}>
                                <Tooltip title="Eliminar rutina">
                                    <DeleteIcon color='error'/>
                                </Tooltip>
                            </IconButton>
                    }
                />
                <CardContent >
                    <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <Typography variant="h5" >Horario: 
                            <Typography color={"gray"} textTransform={"capitalize"} variant='h5' component={"span"}> {horario}</Typography>
                        </Typography>
                        <Typography variant="h5">Comida: 
                            <Typography color={"gray"} textTransform={"capitalize"} variant='h5' component={"span"}> {product.productName}</Typography>
                        </Typography>

                        <Typography variant="h5">Calorías: 
                            <Typography color={"gray"} textTransform={"capitalize"} variant='h5' component={"span"}> {product.calories} Kcal</Typography>
                        </Typography>

                        <Typography variant="h5">Carbohidratos: 
                            <Typography color={"gray"} textTransform={"capitalize"} variant='h5' component={"span"}> {product.carbs} g</Typography>
                        </Typography>
                        <Typography variant="h5">Categoria: 
                            <Typography color={"gray"} textTransform={"capitalize"} variant='h5' component={"span"}> {product.category.categoryName} </Typography>
                        </Typography>
                        <EditRoutineButton routine={routine}/>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
