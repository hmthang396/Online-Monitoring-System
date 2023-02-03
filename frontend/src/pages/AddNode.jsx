import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Breadcrumb from '../components/common/Breadcrumb';
import { postFetch, getFetch } from '../config/fetchData';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { UserState } from '../context/User';
import Authorization from '../components/common/Authorization';
const AddNode = () => {
    const { user, setUser } = UserState();
    const [error, setError] = useState(false);

    const [methods, setMethods] = useState([]);
    const [projects, setProjects] = useState([]);
    const [sources, setSources] = useState([]);
    const nav = useNavigate();
    // 
    const [methodId, setMethodId] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [type, setType] = useState(null);
    const [variable, setVariable] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [code, setCode] = useState(null);
    const [unit, setUnit] = useState(null);
    const [tag, setTag] = useState(null);

    const [dataSourceId, setDataSourceId] = useState(null);

    const [projectId, setProjectId] = useState(null);
    const [read, setRead] = useState(false);
    const [write, setWrite] = useState(false);
    const [history, setHistory] = useState(false);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (user && user.role === "Admin") {

            if (projectId && methodId && dataSourceId && variable && type) {
                postFetch(`/Node`, user.accessToken, {
                    methodId,
                    name,
                    description,
                    type,
                    variable,
                    quantity,
                    code,
                    unit,
                    tag,
                    dataSourceId,
                    projectId,
                    read,
                    write,
                    history
                }).then((data) => {
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        toast.error("Updated AccessToken");
                    } else if (data.ErrorCode == 0) {
                        toast.success("Success");
                        nav(`${process.env.PUBLIC_URL}/list-nodes`);
                    } else {
                        toast.error("Error!!!");
                    }
                })
                    .catch((err) => { toast.error("Error!!!"); })
            } else {
                toast.warn("Vui Lòng Điền Đầy Đủ Thông Tin!");
            }
        }
    };

    useEffect(() => {
        if (user && user.role === "Admin") {
            if (methods.length === 0) {
                getFetch(`/Method/all`, user.accessToken).then((data) => {
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        setError(true);
                    } else if (data.ErrorCode == 0) {
                        setMethods(data.Data);
                    }
                });
            }
            if (projects.length === 0) {
                getFetch(`/Project/all`, user.accessToken).then((data) => {
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        setError(true);
                    } else if (data.ErrorCode == 0) {
                        setProjects(data.Data);
                    }
                });
            }
            if (sources.length === 0) {
                getFetch(`/DataSource/all`, user.accessToken).then((data) => {
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        setError(true);
                    } else if (data.ErrorCode == 0) {
                        setSources(data.Data);
                    }
                });
            }
        }
    }, [error]);
    const readChangeHandler = () => {
        let a = document.getElementsByName("read");
        setRead(a[0].checked);
    };
    const writeChangeHandler = () => {
        let a = document.getElementsByName("write");
        setWrite(a[0].checked);
    };
    const historyChangeHandler = () => {
        let a = document.getElementsByName("history");
        setHistory(a[0].checked);
    };

    return (
        <Fragment>
            <Breadcrumb title="Create Node" parent="Nodes" />

            {
                user.role === "Admin" &&
                <Container fluid={true}>
                    <Form onSubmit={formSubmitHandler}>
                        <Row className="product-adding">
                            <Col xl="6">
                                <Card>
                                    <CardHeader>
                                        <h5>Node</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="digital-add needs-validation">
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    <span>*</span> Method
                                                </Label>
                                                <select className="custom-select" required="" name='method' onChange={(e) => { setMethodId({ _id: e.target.value, title: e.target.selectedOptions[0].innerHTML }) }}>
                                                    <option value="null">--Select--</option>
                                                    {
                                                        methods.length > 0 &&
                                                        methods.map((element) => {
                                                            return <option value={element._id} key={element._id}>{element.description}</option>
                                                        })
                                                    }
                                                </select>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label pt-0">
                                                    <span>*</span> Name (Display on Dashboard)
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    id="title"
                                                    type="text"
                                                    required=""
                                                    onChange={(e) => { setName(e.target.value) }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label pt-0">
                                                    <span>*</span> Description (Display on Dashboard)
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    id="description"
                                                    type="text"
                                                    required=""
                                                    onChange={(e) => { setDescription(e.target.value) }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    <span>*</span> Type
                                                </Label>
                                                <select className="custom-select" required="" name='tupe' onChange={(e) => { setType(e.target.value) }}>
                                                    <option value="null">--Select--</option>
                                                    <option value="Real">Real/FLoat</option>
                                                    <option value="LReal">LReal/Double</option>
                                                    <option value="Int">Integer</option>
                                                    <option value="String">String</option>
                                                    <option value="Boolean">Boolean</option>
                                                </select>
                                            </FormGroup>
                                            {
                                                methodId &&
                                                <FormGroup>
                                                    <Label className="col-form-label pt-0">
                                                        <span>*</span>
                                                        {methodId?.title === "OPCUA" && "NodeId"}
                                                        {methodId?.title === "ADS" && "Symbol"}
                                                        {methodId?.title === "Modbus" && "Address"}
                                                        {methodId?.title === "Ethernet/IP" && "Tag"}
                                                        {methodId?.title === "MQTT" && "Topic"}
                                                    </Label>
                                                    <Input
                                                        className="form-control"
                                                        id="description"
                                                        type="text"
                                                        required=""
                                                        placeholder={methodId?.title === "OPCUA" ? "ns=x;s=yyy" : methodId?.title === "ADS" ? "MAIN.Variable" : methodId?.title === "Modbus" ? "30065" : methodId?.title === "Ethernet/IP" ? "Program:MainProgram.SF01_FLowrate" : ""}
                                                        onChange={(e) => { setVariable(e.target.value) }}
                                                    />
                                                </FormGroup>
                                            }
                                            {
                                                methodId?.title === "Modbus" &&
                                                <FormGroup>
                                                    <Label className="col-form-label pt-0">
                                                        <span>*</span> Quantity
                                                    </Label>
                                                    <Input
                                                        className="form-control"
                                                        id="description"
                                                        type="number"
                                                        required=""
                                                        placeholder='1; 4; ...'
                                                        onChange={(e) => { setQuantity(e.target.value) }}
                                                    />
                                                </FormGroup>
                                            }
                                            {
                                                methodId?.title === "Modbus" &&
                                                <FormGroup>
                                                    <Label className="col-form-label pt-0">
                                                        <span>*</span> Function Code
                                                    </Label>
                                                    <Input
                                                        className="form-control"
                                                        id="description"
                                                        type="text"
                                                        required=""
                                                        placeholder='FC3; FC16; ...'
                                                        onChange={(e) => { setCode(e.target.value) }}
                                                    />
                                                </FormGroup>
                                            }
                                            <FormGroup>
                                                <Label className="col-form-label pt-0">
                                                    <span>*</span> Unit
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    id="description"
                                                    type="text"
                                                    required=""
                                                    placeholder='m3/h, mg/L, ...'
                                                    onChange={(e) => { setUnit(e.target.value) }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label pt-0">
                                                    <span>*</span> Display
                                                </Label>
                                                <select className="custom-select" required="" name='tupe' onChange={(e) => { setTag(e.target.value) }}>
                                                    <option value="null">--Select--</option>
                                                    <option value="Dashboard">Dashboard</option>
                                                    <option value="History">History</option>
                                                    <option value="Reports">Reports</option>
                                                </select>
                                            </FormGroup>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="6">
                                <Card>
                                    <CardHeader>
                                        <h5>Datasource</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="digital-add needs-validation">
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    <span>*</span> Method
                                                </Label>
                                                <select className="custom-select" required="" name='method' onChange={(e) => { setDataSourceId({ _id: e.target.value, title: e.target.selectedOptions[0].innerHTML }) }}>
                                                    <option value="null">--Select--</option>
                                                    {
                                                        sources.length > 0 &&
                                                        sources.map((element) => {
                                                            return <option value={element._id} key={element._id}>{element.host}</option>
                                                        })
                                                    }
                                                </select>
                                            </FormGroup>
                                            {/* {
                                            methodId &&
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> HOST</Label>
                                                <Input
                                                    className="form-control"
                                                    id="host"
                                                    type="text"
                                                    placeholder={methodId?.title === "OPCUA" ? "opc.tcp://xxx.xxx.xxx.xxx:4840" : "192.168.1.30 - Address of Device"}
                                                    required=""
                                                    onChange={(e) => { setHost(e.target.value) }}
                                                />
                                            </FormGroup>
                                        }
                                        {
                                            methodId?.title === "ADS" &&
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> Target NetId</Label>
                                                <Input
                                                    className="form-control"
                                                    id="target"
                                                    type="text"
                                                    placeholder='x.x.x.x.1.1 - Target NETId of Device'
                                                    required=""
                                                    onChange={(e) => { setTarget(e.target.value) }}
                                                />
                                            </FormGroup>
                                        }
                                        {
                                            methodId?.title === "ADS" &&
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> Source NetId</Label>
                                                <Input
                                                    className="form-control"
                                                    id="source"
                                                    type="text"
                                                    placeholder='x.x.x.x.1.1 - Source NETId of Server'
                                                    required=""
                                                    onChange={(e) => { setSource(e.target.value) }}
                                                />
                                            </FormGroup>
                                        }
                                        {
                                            methodId &&
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> Port</Label>
                                                <Input
                                                    className="form-control"
                                                    id="port"
                                                    type="text"
                                                    placeholder='4840 - 502 - 48898 - ...'
                                                    required=""
                                                    onChange={(e) => { setPort(e.target.value) }}
                                                />
                                            </FormGroup>
                                        }
                                        {
                                            methodId?.title === "OPCUA" &&
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> Security Mode</Label>
                                                <select className="custom-select" required="" name='tupe' onChange={(e) => { setSecurityMode(e.target.value) }}>
                                                    <option value="null">--Select--</option>
                                                    <option value="None">None</option>
                                                </select>
                                            </FormGroup>
                                        }
                                        {
                                            methodId?.title === "OPCUA" &&
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> Security Policy</Label>
                                                <select className="custom-select" required="" name='tupe' onChange={(e) => { setSecurityPolicy(e.target.value) }}>
                                                    <option value="null">--Select--</option>
                                                    <option value="None">None</option>
                                                </select>
                                            </FormGroup>
                                        }
                                        {
                                            methodId?.title === "Modbus" &&
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> Slave</Label>
                                                <Input
                                                    className="form-control"
                                                    id="unitId"
                                                    type="number"
                                                    placeholder='1...255'
                                                    required=""
                                                    onChange={(e) => { setUnitId(e.target.value) }}
                                                />
                                            </FormGroup>
                                        } */}
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <h5>Project</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="digital-add needs-validation">
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> Project</Label>
                                                <select className="custom-select" required="" name='tupe' onChange={(e) => { setProjectId(e.target.value) }}>
                                                    <option value="null">--Select--</option>
                                                    {
                                                        projects.length > 0 &&
                                                        projects.map((element) => {
                                                            return <option value={element._id} key={element._id}>{element.code} - {element.description}</option>
                                                        })
                                                    }
                                                </select>
                                            </FormGroup>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <h5>Role Node</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="digital-add needs-validation">
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> <span>*</span> Read</Label>
                                                <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                    <Label className="d-block">
                                                        <Input
                                                            className="radio_animated"
                                                            id="edo-ani"
                                                            type="radio"
                                                            name="read"
                                                            onChange={readChangeHandler}
                                                        />
                                                        Enable
                                                    </Label>
                                                    <Label className="d-block">
                                                        <Input
                                                            className="radio_animated"
                                                            id="edo-ani1"
                                                            type="radio"
                                                            name="read"
                                                            onChange={readChangeHandler}
                                                        />
                                                        Disable
                                                    </Label>
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> <span>*</span> Write</Label>
                                                <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                    <Label className="d-block">
                                                        <Input
                                                            className="radio_animated"
                                                            id="edo-ani"
                                                            type="radio"
                                                            name="write"
                                                            onChange={writeChangeHandler}
                                                        />
                                                        Enable
                                                    </Label>
                                                    <Label className="d-block">
                                                        <Input
                                                            className="radio_animated"
                                                            id="edo-ani1"
                                                            type="radio"
                                                            name="write"
                                                            onChange={writeChangeHandler}
                                                        />
                                                        Disable
                                                    </Label>
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label pt-0"> <span>*</span> History</Label>
                                                <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                    <Label className="d-block">
                                                        <Input
                                                            className="radio_animated"
                                                            id="edo-ani"
                                                            type="radio"
                                                            name="history"
                                                            onChange={historyChangeHandler}
                                                        />
                                                        Enable
                                                    </Label>
                                                    <Label className="d-block">
                                                        <Input
                                                            className="radio_animated"
                                                            id="edo-ani1"
                                                            type="radio"
                                                            name="history"
                                                            onChange={historyChangeHandler}
                                                        />
                                                        Disable
                                                    </Label>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="12">
                                <Card>
                                    <CardHeader>
                                        <h5>Submit</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="digital-add needs-validation">
                                            <FormGroup className="mb-0">
                                                <div className="product-buttons text-center">
                                                    <Button type="submit" color="primary">
                                                        Add
                                                    </Button>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            }

            {
                user.role === "Customer" &&
                <Authorization />
            }
            <ToastContainer />
        </Fragment>
    )
}

export default AddNode