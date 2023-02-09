import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import Switch from "react-switch";
import { UserState } from '../../context/User';
import { postFetch } from '../../config/fetchData';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const NodeSetting = (props) => {
    const { user, setUser } = UserState();
    const history = useNavigate();
    const [state, setState] = useState(props.node.value);
    const [value, setValue] = useState(props.node.value);
    const handleChange = (e) => {
        setState(e);
        submitVariable();
    }
    const isValidateNumber = (value) => {
        return !isNaN(value);
    };
    const submitVariable = () => {
        if (props.node.type !== "Boolean") {
            if (isValidateNumber(state)) {
                postFetch(`/Data/Write`, user.accessToken, {
                    accountId: user._id,
                    nodeId: props.node._id,
                    value: state
                })
                    .then((data) => {
                        if (data.ErrorCode === 0) {
                            if(data.Data === "Success"){
                                //history(`${process.env.PUBLIC_URL}/setting`);
                                setValue(state);
                                toast.success("Success");
                            }else{
                                toast.warning(data.Data);
                            }
                        } else if (data.ErrorCode === 98) {
                            setUser(data.Data);
                            localStorage.setItem("userInfo", JSON.stringify(data.Data));
                            toast.info("Update AccessToken");
                            toast.warning("Please Click Again!!!");
                        } else {
                            toast.error("Error");
                        }
                        console.log(data);
                    })
                    .catch((error) => {
                        toast.error("Error");
                        console.log(error);
                    });
            }
        }else{
            console.log(state);
            postFetch(`/Data/Write`, user.accessToken, {
                accountId: user._id,
                nodeId: props.node._id,
                value: state
            })
                .then((data) => {
                    if (data.ErrorCode === 0) {
                        if(data.Data === "Success"){
                            //history(`${process.env.PUBLIC_URL}/setting`);
                            setValue(state);
                            toast.success("Success");
                        }else{
                            toast.warning(data.Data);
                        }
                    } else if (data.ErrorCode === 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        toast.info("Update AccessToken");
                        toast.warning("Please Click Again!!!");
                    } else {
                        toast.error("Error");
                    }
                    console.log(data);
                })
                .catch((error) => {
                    toast.error("Error");
                    console.log(error);
                });
        }
    };
    return (
        <Col xl="6 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
                {
                    props.node.type !== "Boolean" &&
                    <CardBody className="bg-secondary">
                        <FormGroup>
                            <Label for="exampleAddress">
                                {props.node.name}
                            </Label>
                            {
                                props.node.value !== "Lock" &&
                                <InputGroup>
                                    <InputGroupText>
                                        {value}
                                    </InputGroupText>
                                    <Input
                                        type='text'
                                        className='mr-5'
                                        id={props.node._id}
                                        name={props.node.name}
                                        onChange={(e) => { setState(e.target.value) }}
                                    />
                                    <Button color="primary" onClick={submitVariable}>
                                        Submit
                                    </Button>
                                </InputGroup>
                            }
                            {
                                props.node.value === "Lock" &&
                                <p>Bạn không được phân quyền để cài đặt</p>
                            }
                        </FormGroup>
                    </CardBody>
                }

                {
                    props.node.type === "Boolean" &&
                    <CardBody className="bg-danger ">
                        <Form>
                            <FormGroup className='m-0'>
                                <Label for="exampleAddress">
                                    {props.node.name}
                                </Label>
                                {
                                    props.node.value !== "Lock" &&
                                    <Row style={{ "float": "right" }}>
                                        <InputGroup >
                                            <Switch onChange={handleChange} checked={value} />
                                        </InputGroup>
                                    </Row>
                                }
                                {
                                    props.node.value === "Lock" &&
                                    <p>Bạn không được phân quyền để cài đặt</p>
                                }
                            </FormGroup>
                        </Form>
                    </CardBody>
                }

            </Card>
            <ToastContainer />
        </Col>
    )
}

export default NodeSetting