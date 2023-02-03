import React, { useState } from 'react'
import { Box, } from 'react-feather'
import { Card, CardBody, Col, Media } from 'reactstrap';
import CountUp from "react-countup";

const NodeDashboard = (props) => {
    return (
        <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
                <CardBody className="bg-secondary">
                    <Media className="static-top-widget row">
                        <div className="icons-widgets col-4">
                            <div className="align-self-center text-center">
                                <Box className="font-warning" />
                            </div>
                        </div>
                        <Media body className="col-8">
                            <span className="m-0">{props?.title}</span>
                            <h3 className="mb-0">
                                {(props?.value)}
                                {/* <CountUp className="counter" end={props?.value} /> */}
                                <small> {props?.unit}</small>
                            </h3>
                        </Media>
                    </Media>
                </CardBody>
            </Card>
        </Col>
    )
}

export default NodeDashboard