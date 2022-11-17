import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import Breadcrumb from '../components/common/Breadcrumb';
import Datatable from '../components/common/Datatable';
import { getFetch } from '../config/fetchData';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListProject = () => {
  const [projects,setProject] = useState([]);
  useEffect(() => {
    if (projects.length == 0) {
        getFetch(`/Project/all`).then((data) => {
            let listProject = data.Data.map(project => {
                return {
                    id: project._id,
                    code:project.code,
                    name: project.name,
                    description: project.description,
                };
            })
            setProject(listProject);
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
                                projects.length == 0 &&
                                <div>Loading</div>
                            }
                            {
                                projects.length > 0 &&
                                <Datatable
                                    multiSelectOption={true}
                                    myData={projects}
                                    pageSize={10}
                                    pagination={true}
                                    class="-striped -highlight"
                                    url={`/Project`}
                                />
                            }

                        </div>
                    </CardBody>
                </Card>
            </Container>
            <ToastContainer/>
        </Fragment>
  )
}

export default ListProject