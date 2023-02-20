import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import { downloadFetch, getFetch, postFetch } from '../config/fetchData'
import { UserState } from '../context/User'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import "react-toastify/dist/ReactToastify.css";
import { Bold } from 'react-feather'
import Authorization from '../components/common/Authorization'
import { useNavigate } from 'react-router-dom'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const animatedComponents = makeAnimated();
const AddReport = () => {
    const { user, setUser } = UserState();
    const [files, setFiles] = useState([]);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [file, setFile] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [row, setRow] = useState(null);
    const [col, setCol] = useState(null);
    const [error, setError] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (user && user.role === "Admin" && files.length === 0) {
            getFetch(`/Report/FileName`, user.accessToken).then((data) => {
                if (data.ErrorCode == 98) {
                    setUser(data.Data);
                    localStorage.setItem("userInfo", JSON.stringify(data.Data));
                    setError(true);
                } else if (data.ErrorCode == 0) {
                    setFiles(data.Data);
                }
            }).catch(error => {
                console.log(error);
            })
        }
        if (user && projects.length === 0 && user.role === "Admin") {
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
        };

    }, [error]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (user && user.role === "Admin") {
            postFetch(`/Report`, user.accessToken, { file, row, col, project, nodes })
                .then((data) => {
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        toast.error("Updated AccessToken");
                    } else if (data.ErrorCode == 0) {
                        toast.success("Success");
                        nav(`${process.env.PUBLIC_URL}/list-report`);
                    } else {
                        toast.error("Error!!!");
                    }
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    const changeHanlderProject = (id) => {
        if (user && user.role === "Admin" && nodes.length === 0) {
            const data = new FormData();
            data.append("projectId", id);
            postFetch(`/Node/Project`, user.accessToken, {
                projectId: id
            })

                .then((data) => {
                    console.log(data);
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                    } else if (data.ErrorCode == 0 && data.Data.length > 0) {
                        setNodes(data.Data.map((element) => {
                            return {
                                value: element._id,
                                label: element.name
                            }
                        }));
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    };

    const hanlderDownload = () => {
        if (file) {
            downloadFetch(`/Report/Download/${file}`, user.accessToken).then((data) => {
                if (data.ErrorCode == 98) {
                    setUser(data.Data);
                    localStorage.setItem("userInfo", JSON.stringify(data.Data));
                    toast.warn(`Please Click Button Again!`);
                } else {
                    let file = window.URL.createObjectURL(data);
                    window.open(file);
                }
            });
        } else {
            toast.warn(`Please Select Report File!`);
        }

    };

    return (
        <Fragment>
            <Breadcrumb title="Create Reprt File" parent="Report File" />
            {
                user.role === "Admin" &&
                <Container fluid={true}>
                    <Form onSubmit={formSubmitHandler}>
                        <Row className="product-adding">
                            <Col xl="12">
                                <Card>
                                    <CardHeader>
                                        <h5>Config File Report</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="digital-add needs-validation">
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    <span>*</span> File
                                                </Label>
                                                <InputGroup>
                                                    <select className="custom-select" required name='file' onChange={(e) => { setFile(e.target.value) }}>
                                                        <option value="null">--Select--</option>
                                                        {
                                                            files.length > 0 &&
                                                            files.map((element) => {
                                                                return <option value={element} key={element}>{element}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <Button
                                                        type='button'
                                                        onClick={hanlderDownload}
                                                    >
                                                        Download
                                                    </Button>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    <span>*</span> Project
                                                </Label>
                                                <select className="custom-select" required name='project' onChange={(e) => { setProject(e.target.value); changeHanlderProject(e.target.value) }}>
                                                    <option>---SELECT---</option>
                                                    {
                                                        projects.length > 0 &&
                                                        projects.map((element) => {
                                                            return <option value={element._id} key={element._id}>{element.code} - {element.description}</option>
                                                        })
                                                    }
                                                </select>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    <span>*</span> Node
                                                </Label>
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={animatedComponents}
                                                    options={nodes}
                                                    isMulti={true} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    <span>*</span> Row
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    id="row"
                                                    type="number"
                                                    required
                                                    onChange={(e) => { setRow(e.target.value) }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    <span>*</span> Col
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    id="col"
                                                    type="number"
                                                    required
                                                    onChange={(e) => { setCol(e.target.value) }}
                                                />
                                            </FormGroup>
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

export default AddReport