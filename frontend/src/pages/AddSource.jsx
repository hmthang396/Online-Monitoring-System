import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Authorization from '../components/common/Authorization';
import Breadcrumb from '../components/common/Breadcrumb';
import { getFetch, postFetch } from '../config/fetchData';
import { UserState } from '../context/User';

const AddSource = () => {
  const { user, setUser } = UserState();
  const [methods, setMethods] = useState([]);
  const nav = useNavigate();
  const [methodId, setMethodId] = useState(null);
  const [host, setHost] = useState(null);
  const [target, setTarget] = useState(null);
  const [source, setSource] = useState(null);
  const [port, setPort] = useState(null);
  const [securityMode, setSecurityMode] = useState('None');
  const [securityPolicy, setSecurityPolicy] = useState('None');
  const [unitId, setUnitId] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (user && user.role === "Admin" && methods.length === 0) {
      getFetch(`/Method/all`, user.accessToken).then((data) => {
        console.log(data);
        if (data.ErrorCode == 98) {
          setUser(data.Data);
          localStorage.setItem("userInfo", JSON.stringify(data.Data));
          setError(true);
        } else if (data.ErrorCode == 0) {
          setMethods(data.Data);
        }
      }).catch(error => {
        console.log(error);
      })
    }
  }, [error]);
  const formSubmitHandler = (e) => {
    if (user && user.role === "Admin") {
      e.preventDefault();
      if (methodId && host) {
        postFetch(`/DataSource`, user.accessToken, {
          methodId, host, target, source, port, securityMode, securityPolicy, unitId,
        }).then((data) => {
          if (data.ErrorCode == 98) {
            setUser(data.Data);
            localStorage.setItem("userInfo", JSON.stringify(data.Data));
            toast.error("Updated AccessToken");
          } else if (data.ErrorCode == 0) {
            toast.success("Success");
            nav(`${process.env.PUBLIC_URL}/list-source`);
          } else {
            toast.error("Error!!!");
          }
        })
          .catch((err) => { toast.error("Error!!!"); })
      } else {
        toast.warn("Vui Lòng Điền Đầy Đủ Thông Tin!");
      }
    }
  }
  return (
    <Fragment>
      <Breadcrumb title="Create Source" parent="Sources" />

      {
        user.role === "Admin" &&
        <Container fluid={true}>
          <Form onSubmit={formSubmitHandler}>
            <Row className="product-adding">
              <Col xl="12">
                <Card>
                  <CardHeader>
                    <h5>Source</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="digital-add needs-validation">
                      <FormGroup>
                        <Label className="col-form-label">
                          <span>*</span> Method
                        </Label>
                        <select className="custom-select" required="" name='method' onChange={(e) => { setMethodId({ id: e.target.value, title: e.target.selectedOptions[0].innerHTML }) }}>
                          <option value="null">--Select--</option>
                          {
                            methods.length > 0 &&
                            methods.map((element) => {
                              return <option value={element._id} key={element._id}>{element.description}</option>
                            })
                          }
                        </select>
                      </FormGroup>
                      {
                        methodId &&
                        <FormGroup>
                          <Label className="col-form-label pt-0"> HOST</Label>
                          <Input
                            className="form-control"
                            id="host"
                            type="text"
                            placeholder={methodId?.title === "OPCUA" ? "opc.tcp://xxx.xxx.xxx.xxx:4840" : ((methodId?.title === "MQTT") ? "mqtt://xxx.xxx.xxx.xxx:xxx" : "192.168.1.30 - Address of Device")}
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
                      }
                      {
                        methodId?.title === "MQTT" &&
                        <FormGroup>
                          <Label className="col-form-label pt-0"> Username</Label>
                          <Input
                            className="form-control"
                            id="host"
                            type="text"
                            placeholder={methodId?.title === "MQTT" ? "Username" : ""}
                            required=""
                            onChange={(e) => { setSecurityMode(e.target.value) }}
                          />
                        </FormGroup>
                      }
                      {
                        methodId?.title === "MQTT" &&
                        <FormGroup>
                          <Label className="col-form-label pt-0"> Password</Label>
                          <Input
                            className="form-control"
                            id="host"
                            type="text"
                            placeholder={methodId?.title === "MQTT" ? "Password" : ""}
                            required=""
                            onChange={(e) => { setSecurityPolicy(e.target.value) }}
                          />
                        </FormGroup>
                      }
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

export default AddSource