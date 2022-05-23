import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { getRequest } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { LoadPlaceAction } from "../../redux/actions/actionCreator";
import { StoreState } from "../../redux/store/store";
import { DataGrid } from '@mui/x-data-grid';

import ButtonHeader from "./ButtonHeader/buttonHeader";
import Graphs from "./Graph/graph";
import AlertNotification from "../Notification/AlertNotification"
import Alerts from "../Notification";

type Props = {
	placeList: any[]
	socIntList: any[]
}


const Dashboard: React.FC<Props> = (props: Props) => {

	const { placeList, socIntList } = props;

	return (
		<Container>
			<Row>
				<h1 className="text-center my-3">
					COVID Exposure Tracker Tool
				</h1>
			</Row>

			<ButtonHeader
				placeList={placeList}
				socIntList={socIntList}
			/>

			<Alerts
				placeList={placeList}
				socIntList={socIntList} />

			<Graphs
				placeList={placeList}
				socIntList={socIntList}
			/>


		</Container>
	);
};

export default Dashboard;


