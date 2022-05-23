import React, { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box, Paper, TableBody, TableContainer, TablePagination } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { formatDate, formatWord, suggestedList } from "../../../utilities/methods";
import AddBtnModal from "../../AddBtnModal/addBtnModal";
import CustomButton from "../../../shared/Form/Button/button";
import { Autocomplete, TextField } from "@mui/material";

import './customTable.css'
import { deleteRequest } from "../../../services/apiCalls";
import { loadData } from "../../../redux/actions/actionCreator";
import { useDispatch } from "react-redux";
import { useInput } from "../../../hooks/useInput";

import CustomTblRow from './customTblRow'
import { MoneyOffCsredRounded } from "@mui/icons-material";

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
        <TableCell
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
        </TableCell>
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
        <TableContainer >
          <Table aria-label="custom table">
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <TableHead>
              <TableRow>


                <SortableHeader
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headers={headers}
                  isPlaceExposure={isPlaceExposure}
                ></SortableHeader>

                <TableCell key="5">Actions</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>

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

              {/* {dataList.map((row) => (
            <CustomTblRow
              key={row._id}
              selectedItem={row}
              isPlaceExposure={isPlaceExposure}
              dataList={dataList}
            />
          ))} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
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
