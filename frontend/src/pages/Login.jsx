import React, { Fragment } from 'react'
import { ArrowLeft } from 'react-feather';
import Slider from 'react-slick'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import stats from "../assets/images/dashboard/stats.png";
import LoginTabset from '../components/auth/LoginTabset';
import "../assets/scss/slick.scss";
import "../assets/scss/slick-theme.scss";
let logo1 = "http://localhost:3000/LogoNK.png";
const Login = () => {
    var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		arrows: false,
	};
    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="authentication-box">
                    <Container>
                        <Row>
                            {/* <Col className="col-md-5 p-0 card-left">
                                <Card className="bg-success" style={{backgroundImage:`url(${logo1})`, backgroundRepeat: "no-repeat","backgroundSize": "contain"}}>
                                    <div className="svg-icon">
                                        <img alt="" src={stats} className="Img-fluid" />
                                    </div>
                                    <Slider className="single-item" {...settings}>
										<div>
											<div>
												<h3>Welcome to Online Monitoring System</h3>
												<p>
													Hệ thống giám sát quan trắc nước thải tự động
												</p>
											</div>
										</div>
										<div>
											<div>
												<h3>Welcome to Online Monitoring System</h3>
												<p>
													Hệ thống giám sát quan trắc nước mặt tự động
												</p>
											</div>
										</div>
										<div>
											<div>
												<h3>Welcome to Online Monitoring System</h3>
												<p>
													Hệ thống giám sát từ xa
												</p>
											</div>
										</div>
									</Slider>
                                </Card>
                            </Col> */}
                            <Col className="col-md-12 p-0 card-right">
								<Card className="tab2-card">
									<CardBody>
										<LoginTabset />
									</CardBody>
								</Card>
							</Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default Login