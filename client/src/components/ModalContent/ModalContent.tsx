import React, { Fragment, useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";

import FormInput from "../../shared/Form/Input/formInput";
import FormText from "../../shared/Form/Input/formText";
import CustomButton from "../../shared/Form/Button/button";

import { getRequest, postRequest, putRequest } from "../../services/apiCalls";

import { LoadSocInteractionAction, LoadPlaceAction, loadData } from "../../redux/actions/actionCreator";
import { useDispatch } from "react-redux";
import { suggestedList } from "../../utilities/methods";
import { useInput } from '../../hooks/useInput'

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
	// const [value, setValue] = useState<string>("");
	// const [date, setDate] = useState<string>("");
	// const [hours, setHours] = useState<number>(0);
	// const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);

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
	
	
	// const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setValue(e.target.value);
	// }

	// const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setDate(e.target.value);
	// }

	// const handleChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setHours(parseInt(e.target.value));
	// }

	// const handleChangeChckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setCheckBoxValue(e.target.checked);
	// }

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

			console.log("::::::ADD::::::", url, body)

			postRequest(url, body).then(() => {
				console.log(body)
				openModal(false);
				loadData(url, dispatch, isPlaceExposure);
			});

			// if (isEdit) {
			// 	// putRequest
			// 	putRequest(url, body, selectedItem._id).then(() => {
			// 		console.log(body)
			// 		openModal(false);
			// 		loadData(url, dispatch, isPlaceExposure);
			// 	});
			// }

			// else {
			// 	postRequest(url, body).then(() => {
			// 		console.log(body)
			// 		openModal(false);
			// 		loadData(url, dispatch, isPlaceExposure);
			// 	});
			// }
		}
		else {
			console.log("incorrect", url, value ,date ,hours, checkBoxValue)

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





	// useEffect(() => {
		
	// 	if(isEdit){
	// 		if (isPlaceExposure ) {
	// 			setValue(selectedItem.place)
	// 			setCheckBoxValue(selectedItem.isCrowded)
	// 		}
	// 		else {
	// 			setValue(selectedItem.name)
	// 			setCheckBoxValue(selectedItem.isSocialDistancing)
	// 		}
	// 		// 2022-05-12 - format
	// 		let x = new Date(selectedItem.date).toISOString().split('T')[0];
	// 		console.log("asd", x)
	// 		setDate(new Date(selectedItem.date).toISOString().split('T')[0]);
	// 		setHours(parseInt(selectedItem.hours));
			
	// 	}
		
		
		
	// }, [selectedItem])

	// console.log("updateee", isEdit, value ,date ,hours, checkBoxValue)

	return (
		<Fragment>
			<Form>
				{/* <FormInput
					label={isPlaceExposure ? "Place" : "Name"}
					inputValue={value}
					inputType="text"
					inputPlaceholder={isPlaceExposure ? "Enter place" : "Enter name"}
					formClass=""
					handleOnChange={handleChangeValue}
					required={true}
				>
				</FormInput> */}

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

				{/* <FormInput
					label="Date"
					inputValue={date}
					inputType="date"
					inputPlaceholder="Enter date"
					formClass="mt-3"
					handleOnChange={handleChangeDate}
					required={true}
				>
				</FormInput> */}
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
				{/* 
				<FormInput
					label="Hours"
					inputValue={hours}
					inputType="number"
					inputPlaceholder="Enter hours"
					formClass="mt-3"
					handleOnChange={handleChangeHours}
					required={true}
				>
				</FormInput> */}

				<Form.Check
					className={"mt-3"}
					type={"checkbox"}
					id={"form-check"}
					label={isPlaceExposure ? "Is crowded?" : "Is social distancing observed?"}
					onChange={handleChangeChckbox}
					checked={checkBoxValue}
				// onBlur={handleBlurUserId}
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
