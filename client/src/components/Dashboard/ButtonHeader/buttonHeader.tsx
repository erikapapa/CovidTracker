import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

import CustomButton from "../../../shared/Form/Button/button";
import AddBtnModal from "../../AddBtnModal/addBtnModal";

type Props = {
	placeList: any[]
	socIntList: any[]
}

const ButtonHeader: React.FC<Props> = (props: Props) => {
	const { placeList, socIntList } = props;

	return (
		<Fragment>
			<Row className="text-center my-3">
				<Col md={3} lg={3}></Col>

				<Col>
					<Row>
						<Col>

							<AddBtnModal
								name="Add Social Interaction"
								isPlaceExposure={false}
								variant="primary"
								btnClass="w-100"
								dataList={socIntList}
							/>

						</Col>

						<Col>

							<AddBtnModal
								name="Add Place Exposure"
								isPlaceExposure={true}
								variant="primary"
								btnClass="w-100"
								dataList={placeList}
							/>

						</Col>

						<Col>
							<CustomButton
								btnClass="w-100"
								variant="danger"
								type="button"
								disabled={false}
								method={() => console.log("reset")}
							>
								Reset Data
							</CustomButton>
						</Col>

					</Row>
				</Col>

				<Col md={3} lg={3}></Col>
			</Row>


		</Fragment>

	);
};

export default ButtonHeader;
