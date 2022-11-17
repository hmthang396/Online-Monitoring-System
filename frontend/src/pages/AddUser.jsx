import React, { Fragment } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import TabsetUser from '../components/Users/TabsetUser'

const AddUser = () => {
  return (
    <Fragment>
			<Breadcrumb title="Create User" parent="Users" />
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5> Add User</h5>
							</CardHeader>
							<CardBody>
								<TabsetUser />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
  )
}

export default AddUser