import React, { Fragment, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../components/common/Breadcrumb';
import NodeDashboard from '../components/common/NodeDashboard';
import { UserState } from '../context/User';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { user } = UserState();
  const { nodes, setNodes } = useState();
  const [context, setContext] = useState();
  const [loading, setLoading] = useState(true);
  const fetchNode = async (para) => {
    console.log(`fetchNode`);
    let dataRaw = await fetch("/Data/Read", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
        method: "POST",
      },
      body: JSON.stringify({
        accountId: para,
      })
    });
    let data = await dataRaw.json();
    return data;
  };
  useEffect(() => {
    console.log(`useEffect`);
    setContext(<div>Loading...</div>)
    setLoading(true);
    if (user) {
      fetchNode(user._id).then((result) => {
        if(result.ErrorCode == 0){
          toast.success(`Success`);
        }else{
          toast.warn(`Error!!!`);
        }
        if (result) {
          console.log(result);
          setContext(result.Data.project.map((element) => {
            return (
              <Card key={element.projectId}>
                <CardHeader>
                  <h5>{element.name}</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    {element.nodes.map((node) => {
                      return <NodeDashboard title={node.description} unit={node.unit} key={node._id} value={node.value} />
                    })}
                  </Row>
                </CardBody>
              </Card>
            );
          }));
          setLoading(false);
        }
      }).catch((err)=>{toast.error(`Error!!!`)})
    }
  }, [user]);
  return (
    <Fragment>
      {
        user && <Breadcrumb title="Dashboard" parent="Dashboard" />
      }
      <Container fluid={true}>
        {loading && <div>Loading...</div>}
        {!loading &&
          context
        }
      </Container>
      <ToastContainer />
    </Fragment>
  )
}

export default Dashboard;