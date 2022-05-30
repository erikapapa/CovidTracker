import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Stack } from "react-bootstrap";
import { Autocomplete, TextField } from "@mui/material";

import { postRequest, putRequest } from "../../services/apiCalls";

import { loadData } from "../../redux/actions/actionCreator";
import { suggestedList } from "../../utilities/methods";
import { useInput } from '../../hooks/useInput'

import FormText from "../../shared/Form/Input/formText";
import CustomButton from "../../shared/Form/Button/button";

type Props = {
	openModal: (bool: boolean) => void
	isPlaceExposure: boolean
	dataList: any
}

type errors = {
	namePlace: string,
	date: string,
	hours: string
}

const ModalContent: React.FC<Props> = (props) => {
	const { openModal, isPlaceExposure, dataList } = props;

	const dispatch = useDispatch();

	const [uniqDropdownList, setUniqDropdownList] = useState<any>([]);
	const {
		enteredValue: value,
		valueChangeHandler: handleChangeValue
	} = useInput("string", "");


	const {
		enteredValue: date,
		valueChangeHandler: handleChangeDate
	} = useInput("string", "");

	const {
		enteredValue: hours,
		valueChangeHandler: handleChangeHours
	} = useInput("num", 0);

	const {
		enteredValue: checkBoxValue,
		valueChangeHandler: handleChangeChckbox
	} = useInput("checkbox", false);

	const [errors, setErrors] = useState<errors>({
		namePlace: "",
		date: "",
		hours: ""
	});

	const saveChanges = () => {

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

			postRequest(url, body).then(() => {
				openModal(false);
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


	useEffect(() => {
		setUniqDropdownList(suggestedList(isPlaceExposure, dataList))
	}, [suggestedList, isPlaceExposure, dataList])


	return (
		<Fragment>
			<Form>
				<Autocomplete
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

				<Form.Check
					className={"mt-3"}
					type={"checkbox"}
					id={"form-check"}
					label={isPlaceExposure ? "Is crowded?" : "Is social distancing observed?"}
					onChange={handleChangeChckbox}
					checked={checkBoxValue}
				/>

			</Form>

			<Stack direction="horizontal" gap={4} className="mt-3">
				<CustomButton
					btnClass="ms-auto"
					variant="outline-primary"
					disabled={false}
					type="button"
					method={() => openModal(false)}
				>
					Cancel
				</CustomButton>

				<CustomButton
					btnClass=""
					variant="primary"
					disabled={false}
					type="submit"
					method={saveChanges}
				>
					Save
				</CustomButton>
			</Stack>



		</Fragment>

	);
};

export default ModalContent;
