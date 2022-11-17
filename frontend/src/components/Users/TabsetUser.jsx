import React, { Fragment } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

const TabsetUser = () => {
    return (
        <Fragment>
            <Tabs>
                <TabList className="nav nav-tabs tab-coupon">
                    <Tab className="nav-link">Account</Tab>
                    <Tab className="nav-link">Permission</Tab>
                </TabList>
                <Form className="needs-validation user-add" noValidate="">
                    <TabPanel>
                        <h4>Account Details</h4>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4">
                                <span>*</span> Full Name
                            </Label>
                            <Input
                                className="form-control col-xl-8 col-md-7"
                                id="validationCustom0"
                                type="text"
                                required=""
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4">
                                <span>*</span> Email
                            </Label>
                            <Input
                                className="form-control col-xl-8 col-md-7"
                                id="validationCustom2"
                                type="text"
                                required=""
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4">
                                <span>*</span> Password
                            </Label>
                            <Input
                                className="form-control col-xl-8 col-md-7"
                                id="validationCustom3"
                                type="password"
                                required=""
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4">
                                <span>*</span> Confirm Password
                            </Label>
                            <Input
                                className="form-control col-xl-8 col-md-7"
                                id="validationCustom4"
                                type="password"
                                required=""
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4">
                                <span>*</span> Role
                            </Label>
                            <select className="form-control col-xl-8 col-md-7" required="">
                                <option>---SELECT---</option>
                            </select>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4">
                                <span>*</span> Project
                            </Label>
                            <select className="form-control col-xl-8 col-md-7" required="">
                                <option>---SELECT---</option>
                            </select>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4"> <span>*</span> Status</Label>
                            <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                <Label className="d-block">
                                    <Input
                                        className="radio_animated"
                                        id="edo-ani1"
                                        type="radio"
                                        name="rdo-ani"
                                    />
                                    Enable
                                </Label>
                                <Label className="d-block">
                                    <Input
                                        className="radio_animated"
                                        id="edo-ani2"
                                        type="radio"
                                        name="rdo-ani"
                                        defaultChecked
                                    />
                                    Disable
                                </Label>
                            </div>
                        </FormGroup>
                    </TabPanel>
                    <TabPanel>
                        <div className="permission-block">
                            <div className="attribute-blocks">
                                <h5 className="f-w-600 mb-3">Node Related Permission </h5>
                                <Row>
                                    <Col     xl="3" sm="4">
                                        <label>Read</label>
                                    </Col>
                                    <Col xl="9" sm="8">
                                        <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                            <Label className="d-block">
                                                <Input
                                                    className="radio_animated"
                                                    id="edo-ani1"
                                                    type="radio"
                                                    name="rdo-ani"
                                                />
                                                Allow
                                            </Label>
                                            <Label className="d-block">
                                                <Input
                                                    className="radio_animated"
                                                    id="edo-ani2"
                                                    type="radio"
                                                    name="rdo-ani"
                                                    defaultChecked
                                                />
                                                Deny
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
									<Col xl="3" sm="4">
										<Label>Write</Label>
									</Col>
									<Col xl="9" sm="8">
										<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani3"
													type="radio"
													name="rdo-ani1"
												/>
												Allow
											</Label>
											<Label className="d-block">
												<Input
													className="radio_animated"
													id="edo-ani4"
													type="radio"
													name="rdo-ani1"
                                                    defaultChecked
												/>
												Deny
											</Label>
										</FormGroup>
									</Col>
								</Row>

                            </div>
                        </div>
                    </TabPanel>
                </Form>

            </Tabs>
        </Fragment>
    )
}

export default TabsetUser