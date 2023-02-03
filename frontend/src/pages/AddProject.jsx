import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Authorization from '../components/common/Authorization';
import Breadcrumb from '../components/common/Breadcrumb';
import { postFetch } from '../config/fetchData';
import { UserState } from '../context/User';
const AddProject = () => {
    const { user, setUser } = UserState();
    const [error, setError] = useState(false);

    const history = useNavigate();
    const [code, setCode] = useState(null);
    const [description, setDescription] = useState(null);
    const [name, setName] = useState(null);
    const formSubmitHandler = (e) => {
        if (user) {
            e.preventDefault();
            if (code && description && name) {
                postFetch(`/Project`, user.accessToken, {
                    code, description, name
                }).then((data) => {
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                    } else if (data.ErrorCode == 0) {
                        toast.success("Success");
                        history(`${process.env.PUBLIC_URL}/product-list`);
                    } else {
                        toast.error("Error!!!");
                    }
                }).catch((err) => {
                    console.log(err);
                    toast.error("Error!!!");
                });
            } else {
                toast.warn("Vui Lòng Điền Đầy Đủ Thông Tin!");
            }
        } else {
            console.log("1");
        }
    };
    return (
        <Fragment>
            <Breadcrumb title="Add Project" parent="Projects" />

            {
                user.role === "Admin" &&
                <Container fluid={true}>
                    <Form onSubmit={formSubmitHandler}>
                        <Row className="product-adding">
                            <Col xl="12">
                                <Card>
                                    <CardHeader>
                                        <h5>Node</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="digital-add needs-validation">
                                            <FormGroup>
                                                <Label className="col-form-label pt-0">
                                                    <span>*</span> Name
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    id="name"
                                                    type="text"
                                                    required=""
                                                    onChange={(e) => { setName(e.target.value) }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label pt-0">
                                                    <span>*</span> Code
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    id="code"
                                                    type="text"
                                                    required=""
                                                    onChange={(e) => { setCode(e.target.value) }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label pt-0">
                                                    <span>*</span> Description
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    id="description"
                                                    type="text"
                                                    required=""
                                                    onChange={(e) => { setDescription(e.target.value) }}
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

export default AddProject