import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

import CustomButton from "../../../shared/Form/Button/button";
import AddBtnModal from "../../AddBtnModal/addBtnModal";

type Props = {
	placeList: any[]
	socIntList: any[]
	getAllData: () => void
}

const ButtonHeader: React.FC<Props> = (props: Props) => {
	const { placeList, socIntList, getAllData } = props;

	return (
		<Fragment>
			<Row className="text-center my-3">

				<Col md={{ offset: 3 }}>
					<Row>
						<Col >

							<AddBtnModal
								name="Add Social Interaction"
								isPlaceExposure={false}
								variant=""
								btnClass="w-100 btn-shadow-blue"
								dataList={socIntList}
							/>
						</Col>

						<Col>
							<AddBtnModal
								name="Add Place Exposure"
								isPlaceExposure={true}
								variant=""
								btnClass="w-100 btn-shadow-blue"
								dataList={placeList}
							/>
						</Col>

						<Col>
							<CustomButton
								btnClass="w-100 btn-pale-cerulean"
								variant=""
								type="button"
								disabled={false}
								method={() => getAllData()}
							>
								Refresh Data
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
