import React, { Fragment, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable from '../components/common/Datatable'
import { getFetch } from '../config/fetchData';
const ListNode = () => {
    const [nodes, setNodes] = useState([]);
    useEffect(() => {
        if (nodes.length == 0) {
            getFetch(`/Node/all`).then((data) => {
                let listNode = data.Data.map(node => {
                    return {
                        id: node._id,
                        description:node.description,
                        method: node.method.name,
                        project: node.project.code,
                        tag: node.tag
                    };
                })
                setNodes(listNode);
            })
        }
    }, [])
    return (
        <Fragment>
            <Breadcrumb title="List Node" parent="Nodes" />
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
        </Fragment>
    )
}

export default ListNode