import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { filterArray, filterArrayDates } from "../../../utilities/methods";
import BarGraph from "../../../shared/Graph/barGraph";
import BarGraphh  from "../../../shared/Graph/barGraphh";
import { CropLandscapeOutlined } from "@mui/icons-material";

type Props = {
  placeList: any[]
  socIntList: any[]
}


const Graphs: React.FC<Props> = (props: Props) => {

  const { placeList, socIntList } = props;

  const dates = [];

  const filteredPlaceList = filterArrayDates(placeList, true);
  // const filteredPlaceList = filterArray(placeList);
  
  // const filteredSocIntList = filterArray(socIntList);
  const filteredSocIntList = filterArrayDates(socIntList, false);

  // this will be the label
  for (let index = 0; index < 7; index++) {
    dates.push(new Date(Date.now() - index * 24 * 60 * 60 * 1000))
  }

  // const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  // console.log(dates, sevenDaysAgo)

  console.log("asd",filteredSocIntList )


  return (
    // <Row className="w-100 mt-5">
    //   <Col style={{ height: '70vh' }}>
    //     <span className="me-2">Recent Visited Places</span>
    //     <Link to={"/visited-places"}>View all</Link>
    //     {/* <BarGraph
    //       color={"#3259ad"}
    //       data={filteredPlaceList}
    //     /> */}

    //     <BarGraphh data={filteredPlaceList2} />

    //   </Col>

    //   <Col style={{ height: '70vh' }}>
    //     <span className="me-2">Recent Social Interactions</span>
    //     <Link to={"/social-interactions"}>View all</Link>
    //     {/* <BarGraph
    //       color={"#8884d8"}
    //       data={filteredSocIntList}
    //     /> */}
    //   </Col>

    //   {/* {
    //     filteredPlaceList2 !== []  ?
    //       <BarGraphh data={filteredPlaceList2} /> : null
    //   } */}



    // </Row>

    // <Fragment>
    //   <Row className="w-100 mt-5">
    //     <Col>
    //       <span className="me-2">Recent Visited Places</span>
    //       <Link to={"/visited-places"}>View all</Link>
    //       <BarGraphh data={filteredPlaceList} />
    //     </Col>
    //   </Row>
    //   <Row className="w-100 mt-5">
    //     <Col>
    //       <span className="me-2">Recent Social Interactions</span>
    //       <Link to={"/social-interactions"}>View all</Link>
    //       <BarGraphh data={filteredSocIntList} />
    //     </Col>
    //   </Row>
    // </Fragment>

    <Fragment>
      <Row className="w-100 mt-5">
        <Col>
          <span className="me-2">Recent Visited Places</span>
          <Link to={"/visited-places"}>View all</Link>
          <BarGraphh data={filteredPlaceList} />
        </Col>

        <Col>
          <span className="me-2">Recent Social Interactions</span>
          <Link to={"/social-interactions"}>View all</Link>
          <BarGraphh data={filteredSocIntList} />
        </Col>

      </Row>
     
    </Fragment>
  );
};

export default Graphs;
