import React, { Fragment, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Container, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import NodeSetting from '../components/common/NodeSetting';
import { postFetch } from '../config/fetchData';
import { UserState } from '../context/User';

const Setting = () => {
    const { user, setUser } = UserState();
    const [context, setContext] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fetchNode = async (para) => {
        let dataRaw = await fetch("/Data/ReadVariableControl", {
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
    };
    useEffect(() => {
        setContext(<div>Loading...</div>);
        setLoading(true);
        if (user) {
            postFetch(`/Data/ReadVariableControl`, user.accessToken, {
                accountId: user._id,
            }).then((result) => {
                if (result.ErrorCode === 98) {
                    setUser(result.Data);
                    localStorage.setItem("userInfo", JSON.stringify(result.Data));
                    setError(true);
                } else if (result.ErrorCode === 0) {
                    setContext(
                        result.Data.project.map((element) => {
                            return (
                                <Card key={element.projectId}>
                                    <CardHeader>
                                        <h5>{element.name}</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            {element.nodes.map((node) => {
                                                return <NodeSetting key={node._id} node={node} />;
                                            })}
                                        </Row>
                                    </CardBody>
                                </Card>);
                        })
                    );
                    setLoading(false);
                }
                console.log(result);
            });
        }
    }, [error]);
    return (
        <Fragment>
            <Breadcrumb title="Setting" parent="Setting" />
            <Container fluid={true}>
                {loading && <div>Loading...</div>}
                {!loading &&
                    context
                }
            </Container>
        </Fragment>
    )
}

export default Setting