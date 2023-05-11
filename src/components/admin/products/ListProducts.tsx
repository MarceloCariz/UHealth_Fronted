import {useEffect} from 'react'
import { Box, LinearProgress, Typography } from "@mui/material"
import { DataGrid, GridCellParams, GridColDef, GridToolbar, GridLocaleText } from "@mui/x-data-grid"
import { EditProductButton } from "./EditProductButton"
import { RemoveProductButton } from "./RemoveProductButton"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { getAllProducts } from "../../../store/slices/Product/thunk"
import { AddProductButton } from '.'
import { setActiveProduct } from '../../../store/slices/Product/productSlice'
import { AddCategoryButton } from '../category'
import { ModalProductActions } from './ModalProductActions'




export const ListProducts = () => {

    const dispatch = useAppDispatch();
    const {allProducts} = useAppSelector(state => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [])

// event: GridRowParams<any>
    const handleSelectProduct= (event: React.MouseEvent<HTMLElement>) => {
        const id = event.currentTarget.getAttribute("data-id");
        const product = allProducts.find((p) => p.id === id)!;
        dispatch(setActiveProduct(product));
    }

    const handleClearProductSelected = () => {
        dispatch(setActiveProduct(null));
    }

        //Columnas del producto
    const columns:GridColDef[] = [
            {field: 'productName', headerName: "Nombre del producto", flex: 1 , minWidth: 150, renderCell: (params:GridCellParams) => <Typography>{`${params.value}`}</Typography>},
            {field: 'calories', headerName: "Calorías", flex: 1 , minWidth: 150, renderCell: (params:GridCellParams) => <Typography>{`${params.value}`}</Typography>},
            {field: 'carbs', headerName: "Carbohidratos", flex: 1, minWidth: 150, renderCell:(params: GridCellParams) => (
                <Typography component={"span"} >{`${params.value}`}</Typography>
            ),},
            {field: 'category', headerName: "Categoría", flex: 1, minWidth: 150, renderCell:(params: GridCellParams) => (
                <Typography component={"span"} >{`${params.row.category.categoryName }`}</Typography>
            ),},
            {field: 'id', headerName:"Acciones", flex: 1,minWidth: 150, renderCell: () =>(
                <Box display={"flex"} gap={2}>
                    <EditProductButton/>
                    <RemoveProductButton/>
                </Box>
            )}
    ];
    // NestJS  - 


    return (
        <Box marginTop={2} display={"flex"} flexDirection={"column"} gap={2} justifyContent={"center"} alignItems={"center"}>
        {/* <ModalUser/> */}
        <ModalProductActions/>
        <Box display={"flex"} gap={2}>
            <AddCategoryButton/>
            <AddProductButton/>
        </Box>
        {/* {
            loadingUsers && (
                <CircularProgress/>
            )
        } */}
        <DataGrid
            sx={{width: "70%"}}
            columns={columns}
            rows={allProducts}
            slots={{
                toolbar: GridToolbar,
                loadingOverlay: LinearProgress
            }}
            localeText={spanishText}
            slotProps={{
                row: {
                    onMouseEnter: handleSelectProduct,
                    onMouseLeave: handleClearProductSelected,
                }
            }}
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