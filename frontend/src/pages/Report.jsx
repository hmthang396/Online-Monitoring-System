import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import ReactDatePicker from 'react-datepicker'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Container, Label, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import { downloadPostFetch, postFetch } from '../config/fetchData'
import { UserState } from '../context/User'

const Report = () => {
    const { user, setUser } = UserState();
    const [error, setError] = useState(false);
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState(null);
    const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [endDate, setEndDate] = useState(new Date().setHours(23, 59, 59, 0));

    useEffect(() => {
        if (projects.length === 0) {
            if (user) {
                postFetch(`/Project/${user._id}`, user.accessToken, {
                    accountId: user._id
                }).then((data) => {
                    console.log(data);
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        setError(true);
                    } else if (data.ErrorCode == 0) {
                        console.log(data.Data);
                        setProjects(data.Data);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }, [user, error]);

    const handleStartDate = (date) => {
        let time = new Date(date);
        time.setHours(0, 0, 0, 0);
        setStartDate(time.getTime());
    };

    const handleEndDate = (date) => {
        let time = new Date(date);
        time.setHours(23, 59, 59, 0);
        setEndDate(time.getTime());
    };
    const submitHandle = (e) => {
        e.preventDefault();
        downloadPostFetch(`/Report/DownloadReport`, user.accessToken, {
            projectId,
            startDate,
            endDate
        }).then((data) => {
            if (data.ErrorCode == 98) {
                setUser(data.Data);
                localStorage.setItem("userInfo", JSON.stringify(data.Data));
                toast.warn(`Please Click Button Again!`);
            } else {
                let file = window.URL.createObjectURL(data);
                window.open(file);
            }
        });
    };
    return (
        <div>
            <Breadcrumb title="Report" parent="Report" />
            <Container fluid={true}>
                <Row>
                    <Col sm="3">
                        <Card>
                            <CardBody>
                                <Label className="col-form-label">
                                    Project
                                </Label>
                                <select className="custom-select" required="" name='method' onChange={(e) => { setProjectId(e.target.value); }}>
                                    <option>--SELECT--</option>
                                    {
                                        projects.length > 0 &&
                                        projects.map((project) => {
                                            return <option value={project._id} key={project._id}>{project.name}</option>
                                        })
                                    }
                                </select>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card>
                            <CardBody>
                                <Label className="col-form-label">
                                    From
                                </Label>
                                <ReactDatePicker
                                    selected={startDate}
                                    onChange={handleStartDate}
                                />

                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card>
                            <CardBody>
                                <Label className="col-form-label">
                                    To
                                </Label>
                                <ReactDatePicker
                                    selected={endDate}
                                    endDate={endDate}
                                    onChange={handleEndDate}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card>
                            <CardBody>
                                <Label className="col-form-label">
                                    Submit
                                </Label>
                                <Button type="submit" color="primary" style={{ width: "100%" }} onClick={submitHandle}>Display</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Report