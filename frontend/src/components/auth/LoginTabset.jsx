import React, { Fragment, useState } from 'react'
import { Unlock, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const LoginTabset = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove("show");
        event.target.classList.add("show");
    };
    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            setLoading(false);
            return;
        }
        try{
            fetch("/Account/login",{
                method : "POST",
                headers: {
                  "Content-type": "application/json;charset=utf-8",
                  method: "POST",
                },
                body:JSON.stringify({
                  email:email,
                  password:password,
                })
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem("userInfo",JSON.stringify(data.Data));
                setLoading(false);
                history(`${process.env.PUBLIC_URL}/dashboard`);
            });
        }catch(err){
            setLoading(false);
            console.log(err);
        }
    };
    return (
        <div>
            <Fragment>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon">
                        <Tab className="nav-link" onClick={(e) => clickActive(e)}>
                            <User />
                            Login
                        </Tab>
                        <Tab className="nav-link" onClick={(e) => clickActive(e)}>
                            <Unlock />
                            Register
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <Form className="form-horizontal auth-form" onSubmit={submitHandler}>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="login[username]"
                                    type="email"
                                    className="form-control"
                                    placeholder="Username"
                                    id="exampleInputEmail1"
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="login[password]"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                />
                            </FormGroup>
                            {/* <div className="form-terms">
                                <div className="custom-control custom-checkbox mr-sm-2">
                                    <Input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customControlAutosizing"
                                    />
                                    <Label className="d-block">
                                        <Input
                                            className="checkbox_animated"
                                            id="chk-ani2"
                                            type="checkbox"
                                        />
                                        Reminder Me{" "}
                                        <span className="pull-right">
                                            {" "}
                                            <a href="/#" className="btn btn-default forgot-pass p-0">
                                                lost your password
                                            </a>
                                        </span>
                                    </Label>
                                </div>
                            </div> */}
                            <div className="form-button">
                                <Button
                                    color="primary"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </div>
                            <div className="form-footer">
                                <span>Or Login up with social platforms</span>
                                <ul className="social">
                                    <li>
                                        <a href="/#">
                                            <i className="icon-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#">
                                            <i className="icon-google"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Form>
                    </TabPanel>
                    <TabPanel>
                        <Form className="form-horizontal auth-form">
                            <FormGroup>
                                <Input
                                    required=""
                                    name="login[username]"
                                    type="email"
                                    className="form-control"
                                    placeholder="Username"
                                    id="exampleInputEmail12"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="login[password]"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="login[password]"
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                />
                            </FormGroup>
                            <div className="form-terms">
                                <div className="custom-control custom-checkbox mr-sm-2">
                                    <Input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customControlAutosizing"
                                    />
                                    <Label className="d-block">
                                        <Input
                                            className="checkbox_animated"
                                            id="chk-ani2"
                                            type="checkbox"
                                        />
                                        I agree all statements in{" "}
                                        <span>
                                            <a href="/#">Terms &amp; Conditions</a>
                                        </span>
                                    </Label>
                                </div>
                            </div>
                            <div className="form-button">
                                <Button
                                    color="primary"
                                    type="submit"
                                >
                                    Register
                                </Button>
                            </div>
                            <div className="form-footer">
                                <span>Or Sign up with social platforms</span>
                                <ul className="social">
                                    <li>
                                        <a href="/#">
                                            <i className="icon-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#">
                                            <i className="icon-google"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Form>
                    </TabPanel>
                </Tabs>
            </Fragment>
        </div>
    )
}

export default LoginTabset