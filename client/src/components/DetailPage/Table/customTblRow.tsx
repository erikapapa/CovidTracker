import React, { Fragment, useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { TableRow, TableCell } from "@mui/material";

import CustomButton from "../../../shared/Form/Button/button";
import { Autocomplete, TextField } from "@mui/material";

import './customTable.css'
import { deleteRequest, putRequest } from "../../../services/apiCalls";
import { loadData } from "../../../redux/actions/actionCreator";
import { useDispatch } from "react-redux";
import { useSetField } from "../../../hooks/useSetField";
import { useDate } from "../../../hooks/useDate";
import FormText from "../../../shared/Form/Input/formText";
import CustomModal from "../../../shared/CustomModal/customModal";
import { useFormatStrings } from "../../../hooks/useFormatStrings";

type Props = {
  selectedItem: any
  isPlaceExposure: boolean
  dataList: any[]
}

type errors = {
  namePlace: string,
  date: string,
  hours: string
}

const CustomTblRow: React.FC<Props> = (props: Props) => {

  const { dataList, isPlaceExposure, selectedItem } = props;
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [uniqDropdownList, setUniqDropdownList] = useState<any>([]);

  const [errors, setErrors] = useState<errors>({
    namePlace: "",
    date: "",
    hours: ""
  });

  const selectedValue = isPlaceExposure ? selectedItem.place : selectedItem.name;
  const selectedChckbox = isPlaceExposure ? selectedItem.isCrowded : selectedItem.isSocialDistancing;

  const {
    enteredValue: value,
    valueChangeHandler: handleChangeValue
  } = useSetField("string", selectedValue);


  const {
    enteredValue: date,
    valueChangeHandler: handleChangeDate
  } = useSetField("string", new Date(selectedItem.date).toISOString().split('T')[0]);

  const {
    enteredValue: hours,
    valueChangeHandler: handleChangeHours
  } = useSetField("num", selectedItem.hours);

  const {
    enteredValue: checkBoxValue,
    valueChangeHandler: handleChangeChckbox
  } = useSetField("checkbox", selectedChckbox);

  const { formatDate } = useDate();
  const { formatWord, suggestedList } = useFormatStrings();

  const handleDelete = (id: string) => {
    const url = isPlaceExposure ? `visited-places` : `social-interactions`;
    handleCloseModal(false);
    deleteRequest(url, id).then(() => {
      loadData(url, dispatch, isPlaceExposure);
    });
  }

  const handleEditView = (bool: boolean) => {
    setIsEdit(bool);
  }

  const handleUpdateChanges = () => {
    const url = isPlaceExposure ? `visited-places` : `social-interactions`;

    if (value !== "" && date !== "" && hours > 0) {
      let body = {};
      if (isPlaceExposure) {
        body = {
          "place": value,
          "date": date,
          "hours": hours,
          "isCrowded": checkBoxValue
        };
      }
      else {
        body = {
          "name": value,
          "date": date,
          "hours": hours,
          "isSocialDistancing": checkBoxValue
        };
      }

      putRequest(url, body, selectedItem._id).then(() => {
        handleEditView(false)
        loadData(url, dispatch, isPlaceExposure);
      });

    }
    else {
      let errorObj: errors = {
        namePlace: "",
        date: "",
        hours: ""
      };

      errorObj.namePlace = value === "" ? "This is required." : "";
      errorObj.date = date === "" ? "Date is required." : "";
      errorObj.hours = hours < 1 ? "Hours is required and must be greater than 0." : "";

      if (Object.keys(errorObj).length !== 0) {
        setErrors(errorObj);
      }

    }

  }

  const handleCloseModal = (bool: boolean) => {
    setDeleteModal(bool);
  }


  useEffect(() => {
    setUniqDropdownList(suggestedList(isPlaceExposure, dataList))
  }, [isPlaceExposure, dataList])

  return (
    <Fragment>
      <TableRow
        key={selectedItem._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell className="ps-3">
          {
            isEdit ?
              <Autocomplete
                className="pt-3"
                freeSolo
                disableClearable
                options={uniqDropdownList}
                onSelect={handleChangeValue}
                value={value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={isPlaceExposure ? "Place" : "Name"}
                    placeholder={isPlaceExposure ? "Enter place" : "Enter name"}
                    value={value}
                    onChange={handleChangeValue}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    helperText={errors.namePlace}
                    error={errors.namePlace ? true : false}
                  />
                )}
              />
              : selectedValue
          }



        </TableCell>
        <TableCell className="ps-3">
          {
            isEdit ?
              <FormText
                label="Date"
                inputValue={date}
                inputType="date"
                inputPlaceholder="Enter date"
                formClass="mt-3"
                handleOnChange={handleChangeDate}
                id="date"
                isError={errors.date ? true : false}
                helperText={errors.date}
              />

              : formatDate(selectedItem.date)
          }
        </TableCell>

        <TableCell className="ps-3">
          {
            isEdit ?
              <FormText
                label="Hours"
                inputValue={hours}
                inputType="number"
                inputPlaceholder="Enter hours"
                formClass="mt-3"
                handleOnChange={handleChangeHours}
                id="number"
                isError={errors.hours ? true : false}
                helperText={errors.hours}
              />
              : selectedItem.hours
          }
        </TableCell>

        <TableCell className={`ps-3 ${isEdit ? "" : selectedItem.isCrowded || selectedItem.isSocialDistancing ? 'highlight-red' : ""}`}>
          {
            isEdit ?
              <Form.Check
                className={"mt-3"}
                type={"checkbox"}
                id={`form-check-${selectedItem._id}`}
                label={isPlaceExposure ? "Is crowded?" : "Is social distancing observed?"}
                onChange={handleChangeChckbox}
                checked={checkBoxValue}
              />
              : formatWord(selectedChckbox)
          }
        </TableCell>
        <TableCell className="ps-3">
          <div className="d-flex align-items-center" style={{ fontSize: '14px' }}>

            {
              isEdit ?
                <Fragment>
                  <CustomButton
                    btnClass=""
                    variant={"outline-primary"}
                    disabled={false}
                    method={() => handleEditView(false)}
                    type="button"
                  >
                    Cancel
                  </CustomButton>

                  <CustomButton
                    btnClass="ms-3"
                    variant={"primary"}
                    disabled={false}
                    method={() => handleUpdateChanges()}
                    type="button"
                  >
                    Update
                  </CustomButton>
                </Fragment>
                :
                <Fragment>
                  <CustomButton
                    btnClass="actions-links"
                    variant={"link"}
                    disabled={false}
                    method={() => handleEditView(true)}
                    type="button"
                  >
                    {"Edit"}
                  </CustomButton>

                  |

                  <CustomButton
                    btnClass="actions-links"
                    variant={"link"}
                    disabled={false}
                    method={() => handleCloseModal(true)}
                    type="button"
                  >
                    {"Delete"}
                  </CustomButton>
                </Fragment>
            }

          </div>



        </TableCell>
      </TableRow>

      <CustomModal
        show={deleteModal}
        handleClose={() => handleCloseModal(false)}
        modalHeader={"Delete Record"}
      >
        Are you sure you want to delete this record?

        <Stack direction="horizontal" gap={4} className="mt-3">
          <CustomButton
            btnClass="ms-auto"
            variant="outline-primary"
            disabled={false}
            type="button"
            method={() => handleCloseModal(false)}
          >
            No
          </CustomButton>

          <CustomButton
            btnClass=""
            variant="primary"
            disabled={false}
            type="button"
            method={() => handleDelete(selectedItem._id)}
          >
            Yes
          </CustomButton>
        </Stack>

      </CustomModal>

    </Fragment>


  );
};

export default CustomTblRow;
