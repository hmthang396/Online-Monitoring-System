import React, { Fragment, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import Authorization from '../components/common/Authorization';
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable from '../components/common/Datatable'
import { getFetch } from '../config/fetchData';
import { UserState } from '../context/User';
const ListNode = () => {
    const { user, setUser } = UserState();
    const [error, setError] = useState(false);

    const [nodes, setNodes] = useState([]);
    useEffect(() => {
        if (user && user.role === "Admin" && nodes.length == 0) {
            getFetch(`/Node/all`, user.accessToken).then((data) => {
                if (data.ErrorCode == 98) {
                    setUser(data.Data);
                    localStorage.setItem("userInfo", JSON.stringify(data.Data));
                    setError(true);
                } else if (data.ErrorCode == 0) {
                    let listNode = data.Data.map(node => {
                        return {
                            id: node._id,
                            description: node.description,
                            method: node.method.name,
                            project: node.project.code,
                            tag: node.tag
                        };
                    })
                    setNodes(listNode);
                }
            })
        }
    }, [error])
    return (
        <Fragment>
            <Breadcrumb title="List Node" parent="Nodes" />

            {
                user.role === "Admin" &&
                <Container fluid={true}>
                    <Card>
                        <CardHeader>
                            <h5>Node List</h5>
                        </CardHeader>
                        <CardBody>
                            <div className="clearfix"></div>
                            <div
                                id="batchDelete"
                                className="category-table user-list order-table coupon-list-delete"
                            >
                                {
                                    nodes.length == 0 &&
                                    <div>Loading</div>
                                }
                                {
                                    nodes.length > 0 &&
                                    <Datatable
                                        multiSelectOption={true}
                                        myData={nodes}
                                        pageSize={10}
                                        pagination={true}
                                        class="-striped -highlight"
                                        url={`/Node`}
                                    />
                                }

                            </div>
                        </CardBody>
                    </Card>
                </Container>
            }

            {
                user.role === "Customer" &&
                <Authorization />
            }
        </Fragment>
    )
}

export default ListNode