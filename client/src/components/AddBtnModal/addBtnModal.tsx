import React, { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";

import CustomModal from "../../shared/CustomModal/customModal";
import CustomButton from "../../shared/Form/Button/button";
import ModalContent from "../ModalContent/ModalContent";

type Props = {
	name: string
	isPlaceExposure: boolean
	variant: string
	btnClass: string
	dataList: any
}

const AddBtnModal: React.FC<Props> = (props: Props) => {
	const { name, isPlaceExposure, variant, btnClass, dataList} = props;

	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>("");
	const [modalBody, setModalBody] = useState<React.SetStateAction<{}>>(<div></div>);

	const handleOpenModal = (bool: boolean) => {
		setIsOpenModal(bool);
		if (bool) {
			setModalTitle(name);
			setModalBody(
				<ModalContent
					dataList={dataList}
					isPlaceExposure={isPlaceExposure}
					openModal={handleOpenModal}
				/>
			);
		}
	}


	return (
		<Fragment>
			<CustomButton
				btnClass={btnClass}
				variant={variant}
				disabled={false}
				type="button"
				method={() => handleOpenModal(true)}
			>
				{name}
			</CustomButton>

			<CustomModal
				show={isOpenModal}
				handleClose={setIsOpenModal}
				modalHeader={modalTitle}
			>
				{modalBody}
			</CustomModal>

		</Fragment>

	);
};

export default AddBtnModal;
