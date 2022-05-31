import React, { Fragment } from "react";
import { Table } from "react-bootstrap";
import { TableHead, TableRow, TableCell, TableSortLabel, Box, Paper, TableBody, TableContainer, TablePagination, tableCellClasses, tableHeadClasses, tableBodyClasses, tableClasses, tableContainerClasses } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';

import CustomTblRow from './customTblRow'

import './customTable.css'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: '600'
  }
}));

const StyledTableHead = styled(TableHead)(() => ({
  [`&.${tableHeadClasses.root}`]: {
    border: 'none',
    backgroundColor: '#FFFCF7',
    padding: '20px'
  }
}));
const StyledTableBody = styled(TableBody)(() => ({
  [`&.${tableBodyClasses.root}`]: {
    border: 'none',
    backgroundColor: '#FFFCF7',
    padding: '20px'
  }
}));

const StyledTable = styled(Table)(() => ({
  [`&.${tableClasses.root}`]: {
    border: 'none',
    backgroundColor: '#FFFCF7',
    padding: '20px'
  }
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  [`&.${tableContainerClasses.root}`]: {
    backgroundColor: '#FFFCF7',
  }
}));


type Props = {
  dataList: any[]
  headers: Object[]
  isPlaceExposure: boolean
}

type headerProps = {
  order: any
  orderBy: any
  onRequestSort: (event: any, property: any) => void
  headers: any[]
  isPlaceExposure: boolean
}

type Order = 'asc' | 'desc';

const SortableHeader = (props: headerProps) => {
  const { order, orderBy, onRequestSort, headers } = props;

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <Fragment>
      {headers.map((item) => (
        <StyledTableCell
          key={item.id}
          sortDirection={orderBy === item.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === item.id}
            direction={orderBy === item.id ? order : 'asc'}
            onClick={createSortHandler(item.id)}
          >
            {item.label}
            {orderBy === item.id ? (
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

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('');
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  
  // This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const { dataList, headers, isPlaceExposure } = props;

  const headerz = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Dessert (100g serving)',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Calories',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Fat (g)',
    },
    {
      id: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'Carbs (g)',
    }
  ]

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
                // stableSort(dataList, getComparator(order, orderBy))
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component={"div"}
          count={dataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="tbl-pagination"
        />
      </Paper>
    </Box>




  );
};

export default CustomTable;
