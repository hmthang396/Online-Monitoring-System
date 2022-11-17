import React, { Fragment, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable from '../components/common/Datatable';
import { getFetch } from '../config/fetchData';

const ListSource = () => {
  const [sources, setSources] = useState([]);
  useEffect(() => {
    if (sources.length == 0) {
        getFetch(`/DataSource/all`).then((data) => {
          console.log(data);
            let listSource = data.Data.map(source => {
                return {
                    id: source._id,
                    host:source.host,
                    method: source.method.name,
                };
            })
            setSources(listSource);
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
        </Fragment>
  )
}

export default ListSource