import React from "react";
import { Row, Container } from "react-bootstrap";

import ButtonHeader from "./ButtonHeader/buttonHeader";
import Graphs from "./Graph/graph";
import Alerts from "../Notification";

type Props = {
	placeList: any[]
	socIntList: any[]
	getAllData: () => void
}

const Dashboard: React.FC<Props> = (props: Props) => {
	const { placeList, socIntList, getAllData } = props;
	
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
				getAllData={getAllData}
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


