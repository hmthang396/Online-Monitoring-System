import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import { getFetch, postFetch } from '../config/fetchData';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { UserState } from '../context/User';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const History = () => {
    const { user, setUser } = UserState();
    const [data, setData] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [nodeId, setNodeId] = useState(null);
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [endDate, setEndDate] = useState(new Date().getTime());
    const [title, setTitle] = useState(null);
    const [error, setError] = useState(false);
    const [line, setLine] = useState();

    useEffect(() => {
        if (nodes.length === 0) {
            if (user) {
                postFetch(`/Node/history`, user.accessToken, {
                    accountId: user._id
                }).then((data) => {
                    console.log(data);
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        setError(true);
                    } else if (data.ErrorCode == 0) {
                        setNodes(data.Data);
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

    const timeOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',

    };

    let Options = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: {
                gridLines: {
                    color: '#f8f8f8'
                },
            },
            yAxes: {
                gridLines: {
                    color: '#f8f8f8'
                },
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Line Chart',
            },
        },
    };

    const submitHandle = () => {
        if (user) {
            getFetch(`/History/${nodeId}/${startDate}/${endDate}`, user.accessToken)
                .then(data => {
                    if (data.ErrorCode == 98) {
                        setUser(data.Data);
                        localStorage.setItem("userInfo", JSON.stringify(data.Data));
                        toast.error("Updated AccessToken");
                        toast.warning("Please click again")
                    } else if (data.ErrorCode == 0) {
                        toast.success("Success");
                        let labels = [];
                        let history = [];
                        data.Data.forEach((element) => {
                            labels.push(new Date(element.time).toLocaleDateString("en-US", timeOptions));
                            history.push(parseFloat(element.value));
                        });
                        setData({
                            labels: labels,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            datasets: [{
                                label: `${title}`,
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                                borderColor: "rgb(53, 162, 235)",
                                data: history
                            }]
                        });
                    } else {
                        toast.error("Error!!!");
                    }
                }).catch((error) => {

                })
        }
    };

    const addLineHandler = () => {
        let datasetsOld = new Array(...data.datasets);
        datasetsOld.push({
            label: `Line - ${line}`,
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            borderColor: "rgb(0, 0, 255)",
            data: Array(data.datasets[0].data.length).fill(line)
        });
        let dataNew = { ...data,datasets:datasetsOld  }
        setData(dataNew);
    };
    return (
        <div>
            <Breadcrumb title="Reports" parent="Reports" />
            <Container fluid={true}>
                <Row>
                    <Col sm="3">
                        <Card>
                            <CardBody>
                                <Label className="col-form-label">
                                    Node
                                </Label>
                                <select className="custom-select" required="" name='method' onChange={(e) => { setNodeId(e.target.value); setTitle(e.target.selectedOptions[0].innerHTML); }}>
                                    <option>--SELECT--</option>
                                    {
                                        nodes.length > 0 &&
                                        nodes.map((node) => {
                                            return <optgroup label={node.project.description} key={node.project._id}>
                                                {node.nodes.map((element) => {
                                                    return <option value={element._id} key={element._id}>{element.description}</option>
                                                })}
                                            </optgroup>
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
                    <Col sm="3">
                        <Card>
                            <CardBody>
                                <Label className="col-form-label">
                                    Value Line
                                </Label>
                                <Input type='number' onChange={(e) => { setLine(e.target.value) }} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card>
                            <CardBody>
                                <Label className="col-form-label">
                                    Add Line
                                </Label>
                                <Button type="submit" color="primary" style={{ width: "100%" }} onClick={addLineHandler}>Add</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5> Chart</h5>
                            </CardHeader>
                            <CardBody>
                                <div className="report-last-sm">
                                    {
                                        data &&
                                        <Line
                                            data={data}
                                            options={Options}
                                            width={700}
                                            height={500}
                                        />
                                    }

                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>
    )
}

export default History