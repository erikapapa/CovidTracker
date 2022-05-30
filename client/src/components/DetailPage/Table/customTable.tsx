import React, { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { TableHead, TableRow, TableCell, TableSortLabel, Box, Paper, TableBody, TableContainer, TablePagination, tableCellClasses, tableHeadClasses, tableBodyClasses, tablePaginationClasses, tableClasses, paperClasses, tableContainerClasses } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import CustomTblRow from './customTblRow'
import './customTable.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: '600'
  }
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  [`&.${tableHeadClasses.root}`]: {
    border: 'none',
    backgroundColor: '#FFFCF7',
    padding: '20px'
  }
}));
const StyledTableBody = styled(TableBody)(({ theme }) => ({
  [`&.${tableBodyClasses.root}`]: {
    border: 'none',
    backgroundColor: '#FFFCF7',
    padding: '20px'
  }
}));

const StyledTable = styled(Table)(({ theme }) => ({
  [`&.${tableClasses.root}`]: {
    border: 'none',
    backgroundColor: '#FFFCF7',
    padding: '20px'
  }
}));

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  [`&.${tablePaginationClasses.root}`]: {
    backgroundColor: '#FFFCF7',
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  [`&.${tableContainerClasses.root}`]: {
    backgroundColor: '#FFFCF7',
  }
}));


type Props = {
  dataList: any[]
  headers: string[]
  isPlaceExposure: boolean
}

type errors = {
  namePlace: string,
  date: string,
  hours: string
}

type headerProps = {
  order: any
  orderBy: any
  onRequestSort: (event: any, property: any) => void
  headers: any[]
  isPlaceExposure: boolean
}

const SortableHeader = (props: headerProps) => {
  const { order, orderBy, onRequestSort, headers, isPlaceExposure } = props;

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <Fragment>
      {headers.map((item) => (
        <StyledTableCell
          key={item}
          sortDirection={orderBy === item ? order : false}
        >
          <TableSortLabel
            active={orderBy === item}
            onClick={createSortHandler(item)}
          >
            {item}
            {orderBy === item ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </StyledTableCell>
      ))}
    </Fragment>
  );
}


const CustomTable: React.FC<Props> = (props: Props) => {

  const [order, setOrder] = React.useState<string>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const descendingComparator = (a: any, b: any, orderBy: any) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }


  const getComparator = (order: any, orderBy: any) => {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  const { dataList, headers, isPlaceExposure } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <StyledTableContainer >
          <StyledTable aria-label="custom table">
            <colgroup>
              <col width="30%" />
              <col width="20%" />
              <col width="10%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <StyledTableHead>
              <TableRow>
                <SortableHeader
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headers={headers}
                  isPlaceExposure={isPlaceExposure}
                ></SortableHeader>

                <StyledTableCell key="5">Actions</StyledTableCell>

              </TableRow>
            </StyledTableHead>
            <StyledTableBody>

              {
                dataList.slice().sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <CustomTblRow
                        key={row._id}
                        selectedItem={row}
                        isPlaceExposure={isPlaceExposure}
                        dataList={dataList}
                      />
                    )

                  })

              }
            </StyledTableBody>
          </StyledTable>
        </StyledTableContainer>
        <StyledTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>




  );
};

export default CustomTable;
