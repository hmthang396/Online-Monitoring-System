import React, { Fragment, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import Authorization from '../components/common/Authorization';
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable from '../components/common/Datatable';
import { getFetch } from '../config/fetchData';
import { UserState } from '../context/User';

const ListSource = () => {
    const [sources, setSources] = useState([]);
    const [error, setError] = useState(false);
    const { user, setUser } = UserState();
    useEffect(() => {
        if (user && user.role === "Admin" && sources.length === 0) {
            getFetch(`/DataSource/all`, user.accessToken).then((data) => {
                console.log(data);
                if (data.ErrorCode == 98) {
                    setUser(data.Data);
                    localStorage.setItem("userInfo", JSON.stringify(data.Data));
                    setError(true);
                } else if (data.ErrorCode == 0) {
                    let listSource = data.Data.map(source => {
                        return {
                            id: source._id,
                            host: source.host,
                            method: source.method.name,
                        };
                    })
                    setSources(listSource);
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
                                    sources.length == 0 &&
                                    <div>Loading</div>
                                }
                                {
                                    sources.length > 0 &&
                                    <Datatable
                                        multiSelectOption={true}
                                        myData={sources}
                                        pageSize={10}
                                        pagination={true}
                                        class="-striped -highlight"
                                        url={`/DataSource`}
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

export default ListSource