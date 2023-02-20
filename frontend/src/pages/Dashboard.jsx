import React, { Fragment, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../components/common/Breadcrumb';
import NodeDashboard from '../components/common/NodeDashboard';
import { UserState } from '../context/User';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HOST } from '../constants/hostBE';
import { postFetch } from '../config/fetchData';
const Dashboard = () => {
  const { user, setUser } = UserState();
  const { nodes, setNodes } = useState();
  const [context, setContext] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchNode = async (para) => {
    try {
      let dataRaw = await fetch(`${HOST}/Data/Read`, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
          "Authorization": user.accessToken,
          method: "POST",
        },
        body: JSON.stringify({
          accountId: para,
        })
      });
      let data = await dataRaw.json();
      return data;
    } catch (error) {
      return error;
    }
  };


  useEffect(() => {
    setContext(<div>Loading...</div>);
    if (user && !loading) {
      setLoading(true);
      postFetch(`/Data/Read`, user.accessToken, {
        accountId: user._id,
      })
        .then((result) => {
          if (result.ErrorCode == 0) {
            toast.success(`Success`);
          } else if (result.ErrorCode == 98) {
            setUser(result.Data);
            localStorage.setItem("userInfo", JSON.stringify(result.Data));
            setError(true);
          } else {
            toast.warn(`Error!!!`);
          }
          if (result.Data.project.length > 0 && result.ErrorCode == 0) {
            setContext(result.Data.project.map((element) => {
              return (
                <Card key={element.projectId}>
                  <CardHeader>
                    <h5>{element.name}</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      {element.nodes.map((node) => {
                        return <NodeDashboard title={node.name} unit={node.unit} key={node._id} value={node.value} />
                      })}
                    </Row>
                  </CardBody>
                </Card>
              );
            }));
            setLoading(false);
          } else {
            setContext(
              <Card>
                <CardHeader>
                  <h5>Bạn Chưa được cấp quyền truy cập vào dự án</h5>
                </CardHeader>
              </Card>
            );
            setLoading(false);
          }
        }).catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(`Error!!!`);
        })
      // fetchNode(user._id)
      //   .then((result) => {
      //     if (result.ErrorCode == 0) {
      //       toast.success(`Success`);
      //     } else if (result.ErrorCode == 98) {
      //       setUser(result.Data);
      //       localStorage.setItem("userInfo", JSON.stringify(result.Data));
      //       setError(true);
      //     } else {
      //       toast.warn(`Error!!!`);
      //     }
      //     if (result.Data.project.length > 0 && result.ErrorCode == 0) {
      //       setContext(result.Data.project.map((element) => {
      //         return (
      //           <Card key={element.projectId}>
      //             <CardHeader>
      //               <h5>{element.name}</h5>
      //             </CardHeader>
      //             <CardBody>
      //               <Row>
      //                 {element.nodes.map((node) => {
      //                   return <NodeDashboard title={node.description} unit={node.unit} key={node._id} value={node.value} />
      //                 })}
      //               </Row>
      //             </CardBody>
      //           </Card>
      //         );
      //       }));
      //       setLoading(false);
      //     } else {
      //       setContext(
      //         <Card>
      //           <CardHeader>
      //             <h5>Bạn Chưa được cấp quyền truy cập vào dự án</h5>
      //           </CardHeader>
      //         </Card>
      //       );
      //       setLoading(false);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setLoading(false);
      //     toast.error(`Error!!!`);
      //   })
    }
  }, [error]);
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