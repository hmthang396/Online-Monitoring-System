import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { getFetch, postFetch } from '../../config/fetchData';
import { UserState } from '../../context/User';
import MyDropzone from '../common/MyDropzone';
import { toast, ToastContainer } from 'react-toastify';

const TabsetUser = () => {
    const nav = useNavigate();
    const [projects, setProjects] = useState([]);
    const [fullname, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [role, setRole] = useState(null);
    const [projectId, setProject] = useState(null);
    const [pic, setPic] = useState(null);
    const [read, setRead] = useState(false);
    const [write, setWrite] = useState(false);
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(false);
    const { user, setUser } = UserState();

    const statusChangeHandler = () => {
        let a = document.getElementsByName("status");
        setStatus(a[0].checked);
    };
    const readChangeHandler = () => {
        let a = document.getElementsByName("read");
        setRead(a[0].checked);
    };
    const writeChangeHandler = () => {
        let a = document.getElementsByName("write");
        setWrite(a[0].checked);
    };
    const fileHandler = (file) => {

        setPic(file);
    }
    useEffect(() => {
        if (user) {
            if (projects.length === 0) {
                getFetch(`/Project/all`, user.accessToken).then((data) => {
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        setError(true);
                    } else {
                        setProjects(data.Data);
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        };
    }, [error]);
    const formSubmitHandler = (e) => {
        if (user) {
            e.preventDefault();
            const data = new FormData();
            data.append("fullname", fullname);
            data.append("email", email);
            data.append("password", password);
            data.append("projectId", projectId);
            data.append("role", role);
            data.append("read", read);
            data.append("write", write);
            data.append("status", status);
            data.append("file", pic);
            fetch(`http://localhost:4000/Account`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json;charset=utf-8",
                },
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                    } else if (data.ErrorCode == 0) {
                        toast.success("Success");
                        nav(`${process.env.PUBLIC_URL}/list-user`);
                    } else {
                        toast.error("Error!!!");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    };
    return (
        <Fragment>
            <Form className="needs-validation user-add" noValidate="" onSubmit={formSubmitHandler}>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon">
                        <Tab className="nav-link">Account</Tab>
                        {/* <Tab className="nav-link">Permission</Tab> */}
                    </TabList>

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
                                onChange={(e) => { setFullName(e.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4">
                                <span>*</span> Email
                            </Label>
                            <Input
                                className="form-control col-xl-8 col-md-7"
                                id="validationCustom2"
                                type="email"
                                required=""
                                onChange={(e) => { setEmail(e.target.value) }}
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
                                onChange={(e) => { setPassword(e.target.value) }}
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
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4">
                                <span>*</span> Role
                            </Label>
                            <select className="form-control col-xl-8 col-md-7" required="" onChange={(e) => { setRole(e.target.value) }}>
                                <option>---SELECT---</option>
                                <option value={`Customer`}>Customer</option>
                                <option value={`Admin`}>Administrator</option>
                            </select>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4">
                                <span>*</span> Project
                            </Label>
                            <select className="form-control col-xl-8 col-md-7" required="" onChange={(e) => { setProject(e.target.value) }}>
                                <option>---SELECT---</option>
                                {
                                    projects.length > 0 &&
                                    projects.map((element) => {
                                        return <option value={element._id} key={element._id}>{element.code} - {element.description}</option>
                                    })
                                }
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
                                        name="status"
                                        onChange={statusChangeHandler}
                                    />
                                    Enable
                                </Label>
                                <Label className="d-block">
                                    <Input
                                        className="radio_animated"
                                        id="edo-ani2"
                                        type="radio"
                                        name="status"
                                        defaultChecked
                                        onChange={statusChangeHandler}
                                    />
                                    Disable
                                </Label>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4"> <span>*</span> Read</Label>
                            <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                <Label className="d-block">
                                    <Input
                                        className="radio_animated"
                                        id="edo-ani1"
                                        type="radio"
                                        name="read"
                                        onChange={readChangeHandler}
                                    />
                                    Allow
                                </Label>
                                <Label className="d-block">
                                    <Input
                                        className="radio_animated"
                                        id="edo-ani2"
                                        type="radio"
                                        name="read"
                                        defaultChecked
                                        onChange={readChangeHandler}
                                    />
                                    Deny
                                </Label>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-md-4"> <span>*</span> Write</Label>
                            <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                <Label className="d-block">
                                    <Input
                                        className="radio_animated"
                                        id="edo-ani3"
                                        type="radio"
                                        name="write"
                                        onChange={writeChangeHandler}
                                    />
                                    Allow
                                </Label>
                                <Label className="d-block">
                                    <Input
                                        className="radio_animated"
                                        id="edo-ani4"
                                        type="radio"
                                        name="write"
                                        defaultChecked
                                        onChange={writeChangeHandler}
                                    />
                                    Deny
                                </Label>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-form-label pt-0"> Product Upload</Label>
                            <MyDropzone getFile={fileHandler} />
                        </FormGroup>
                    </TabPanel>
                    {/* <TabPanel>
                        <div className="permission-block">
                            <div className="attribute-blocks">
                                <h5 className="f-w-600 mb-3">Node Related Permission </h5>
                                <Row>
                                    <Col xl="3" sm="4">
                                        <label>Read</label>
                                    </Col>
                                    <Col xl="9" sm="8">
                                        <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                            <Label className="d-block">
                                                <Input
                                                    className="radio_animated"
                                                    id="edo-ani1"
                                                    type="radio"
                                                    name="read"
                                                    onChange={readChangeHandler}
                                                />
                                                Allow
                                            </Label>
                                            <Label className="d-block">
                                                <Input
                                                    className="radio_animated"
                                                    id="edo-ani2"
                                                    type="radio"
                                                    name="read"
                                                    defaultChecked
                                                    onChange={readChangeHandler}
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
                                                    name="write"
                                                    onChange={writeChangeHandler}
                                                />
                                                Allow
                                            </Label>
                                            <Label className="d-block">
                                                <Input
                                                    className="radio_animated"
                                                    id="edo-ani4"
                                                    type="radio"
                                                    name="write"
                                                    defaultChecked
                                                    onChange={writeChangeHandler}
                                                />
                                                Deny
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </TabPanel> */}

                </Tabs>
                <div className="pull-right">
                    <Button type="submit" color="primary">
                        Save
                    </Button>
                </div>
            </Form>
        </Fragment>
    )
}

export default TabsetUser