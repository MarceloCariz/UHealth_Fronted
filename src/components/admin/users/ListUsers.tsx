import {useEffect} from 'react';
import {Box, Typography, LinearProgress} from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { getAllUsers } from '../../../store/slices/user/thunk';
import { AddUserButton } from './AddUserButton';
import { RemoveUserButton } from './RemoveUserButton';
import { EditUserButton } from './EditUserButton';
import { setActiveUserAction } from '../../../store/slices/user/userSlice';
import { ModalUser } from '.';



export const ListUsers = () => {
    const dispatch = useAppDispatch();
    const {users} = useAppSelector(state => state.users);

    useEffect(() => {
        // setTimeout(() => {
        dispatch(getAllUsers());
        // }, 5000);
    }, [])

// event: GridRowParams<any>
    const handleSelectUser= (event: React.MouseEvent<HTMLElement>) => {
        const id = event.currentTarget.getAttribute("data-id");
        const user = users.find((r) => r.id === id)!;
        dispatch(setActiveUserAction(user));
    }

    const handleClearUserSelected = () => {
        dispatch(setActiveUserAction(null));
    }


    //Columnas del usuario
    const columns:GridColDef[] = [
        {field: 'username', headerName: "Nombre de usuario", flex: 1 , minWidth: 150, renderCell: (params:GridCellParams) => <Typography>{`${params.value}`}</Typography>},
        {field: 'email', headerName: "correo electrónico", flex: 1 , minWidth: 150, renderCell: (params:GridCellParams) => <Typography>{`${params.value}`}</Typography>},
        {field: 'rolName', headerName: "Rol", flex: 1, minWidth: 150, renderCell:(params: GridCellParams) => (
            <Typography component={"span"} >{`${params.value}`}</Typography>
        ),},
        {field: 'id', headerName:"Acciones", flex: 1,minWidth: 150, renderCell: () =>(
            <Box display={"flex"} gap={2}>
                <EditUserButton/>
                <RemoveUserButton/>
            </Box>
        )}

    ]


    return (
        <Box marginTop={10} display={"flex"} flexDirection={"column"} gap={2} justifyContent={"center"} alignItems={"center"}>
            <ModalUser/>
            <Box  width={"80%"} >
                <AddUserButton/>

            </Box>

            <DataGrid
                sx={{width: "80%", boxShadow: '20'}}
                columns={columns}
                rows={users}
                slots={{
                    toolbar: GridToolbar,
                    loadingOverlay: LinearProgress,
                }}
                localeText={spanishText}
                
                // onRowClick={(e) => handleRowClick(e)}
                slotProps={{
                    row: {
                        onMouseEnter: handleSelectUser,
                        onMouseLeave: handleClearUserSelected,
                    }
                }}

                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                    },
                }}
                // pageSizeOptions={[1,1,1]}
                density='comfortable'
            />
        </Box>
    )
}

const spanishText = {
    // Texto de la barra de herramientas
    toolbarExport: 'Exportar',
    toolbarExportCSV: 'Exportar a CSV',
    toolbarExportExcel: 'Exportar a Excel',
    toolbarFilters: "Filtrar",
    toolbarDensity: 'Densidad',
    toolbarColumns: 'Columnas',
    toolbarColumnsLabel: "Encontrar columna",
    
    // Texto de paginación
    footerTotalRows: 'Filas por pagina',
    // paginationRowsPerPage: 'Filas por página:',
    // paginationLabelRowsPerPage: 'Filas por página',
    // paginationLabelDisplayedRows: '{from}-{to} de {count}',
    // paginationFirstAriaLabel: 'Primera página',
    // paginationFirstTooltip: 'Primera página',
    // paginationPreviousAriaLabel: 'Página anterior',
    // paginationPreviousTooltip: 'Página anterior',
    // paginationNextAriaLabel: 'Siguiente página',
    // paginationNextTooltip: 'Siguiente página',
    // paginationLastAriaLabel: 'Última página',
    // paginationLastTooltip: 'Última página',
    // Otros textos
    noRowsLabel: 'No hay filas para mostrar',
    // ... Agrega más traducciones según sea necesario
};