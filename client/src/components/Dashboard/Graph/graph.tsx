import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { filterArrayDates } from "../../../utilities/methods";
import BarGraph from "../../../shared/Graph/barGraph";
import { Box, Button, Card, CardActions, CardContent, Paper } from "@mui/material";

import './graph.css'

type Props = {
  placeList: any[]
  socIntList: any[]
}


const Graphs: React.FC<Props> = (props: Props) => {

  const { placeList, socIntList } = props;

  const filteredPlaceList = filterArrayDates(placeList, true);
  const filteredSocIntList = filterArrayDates(socIntList, false);

  return (

    <Fragment>
      <Row className="w-100 mt-5">
        <Col>


          <Card variant="outlined" className={`h-100 ${filteredPlaceList.length === 0 ? "pt-5" : ""}`}>
            <CardContent className={`${filteredPlaceList.length === 0 ? "d-flex text-center justify-content-center align-items-center my-5 py-5" : ""}`}>
              {
                filteredPlaceList.length === 0 ?
                  <Box className="d-flex text-center h-100 justify-content-center align-items-center">
                    <h4>No data from 7 days to display</h4>
                  </Box>
                  :
                  <BarGraph data={filteredPlaceList} />
              }
            </CardContent>
            <CardActions>
              <Link to={"/visited-places"} className={`card-graph-links ms-3 mb-2 ${filteredPlaceList.length === 0 ? "mt-5" : ""}`}>View all recent visited places</Link>
            </CardActions>
          </Card>

        </Col>

        <Col>

          <Card variant="outlined" className={`h-100 ${filteredSocIntList.length === 0 ? "pt-5" : ""}`}>
            <CardContent className={`${filteredSocIntList.length === 0 ? "d-flex text-center justify-content-center align-items-center my-5 py-5" : ""}`}>
              {
                filteredSocIntList.length === 0 ?
                  <h4>No data from 7 days to display</h4>
                  :
                  <BarGraph data={filteredSocIntList} />
              }
            </CardContent>
            <CardActions>
              <Link to={"/social-interactions"} className={`card-graph-links ms-3 mb-2 ${filteredSocIntList.length === 0 ? "mt-5" : ""}`}>View all recent Social Interactions</Link>
            </CardActions>
          </Card>
        </Col>

      </Row>

    </Fragment>
  );
};

export default Graphs;
