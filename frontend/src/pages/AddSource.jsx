import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Breadcrumb from '../components/common/Breadcrumb';
import { getFetch, postFetch } from '../config/fetchData';

const AddSource = () => {
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
  useEffect(() => {
    if (methods.length === 0) {
      getFetch(`/Method/all`).then((data) => { setMethods(data.Data); });
    }
  }, []);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (methodId && host) {
      postFetch(`/DataSource`, {
        methodId, host, target, source, port, securityMode, securityPolicy, unitId
      }).then((data) => {
        if (data.ErrorCode != 0) {
          toast.error("Error!!!");
        } else {
          toast.success("Success");
          nav(`${process.env.PUBLIC_URL}/list-source`);
        }
      })
        .catch((err) => { toast.error("Error!!!"); })
    } else {
      toast.warn("Vui Lòng Điền Đầy Đủ Thông Tin!");
    }
  }
  return (
    <Fragment>
      <Breadcrumb title="Create Source" parent="Sources" />
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
                    {
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
      <ToastContainer />
    </Fragment>
  )
}

export default AddSource