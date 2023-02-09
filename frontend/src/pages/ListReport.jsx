import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import Authorization from '../components/common/Authorization'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable from '../components/common/Datatable'
import { getFetch } from '../config/fetchData'
import { UserState } from '../context/User'

const ListReport = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(false);
    const { user, setUser } = UserState();
    useEffect(() => {
        if (user && user.role === "Admin" && reports.length === 0) {
            getFetch(`/Report`, user.accessToken).then((data) => {
                console.log(data);
                if (data.ErrorCode == 98) {
                    setUser(data.Data);
                    localStorage.setItem("userInfo", JSON.stringify(data.Data));
                    setError(true);
                } else if (data.ErrorCode == 0) {
                    let listReport = data.Data.map(report => {
                        return {
                            id: report._id,
                            file: report.file,
                            project: report.project.name,
                            nodes: report.nodes.length,
                        };
                    })
                    setReports(listReport);
                }
            })
        }
    }, [error])
    return (
        <Fragment>
            <Breadcrumb title="List Report" parent="Reports" />
            {
                user.role === "Admin" &&
                <Container fluid={true}>
                    <Card>
                        <CardHeader>
                            <h5>Reports List</h5>
                        </CardHeader>
                        <CardBody>
                            <div className="clearfix"></div>
                            <div
                                id="batchDelete"
                                className="category-table user-list order-table coupon-list-delete"
                            >
                                {
                                    reports.length > 0 &&
                                    <Datatable
                                        multiSelectOption={true}
                                        myData={reports}
                                        pageSize={10}
                                        pagination={true}
                                        class="-striped -highlight"
                                        url={`/Report`}
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
            <ToastContainer />
        </Fragment>
    )
}

export default ListReport