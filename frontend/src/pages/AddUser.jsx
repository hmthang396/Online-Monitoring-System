import React, { Fragment } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Authorization from '../components/common/Authorization'
import Breadcrumb from '../components/common/Breadcrumb'
import TabsetUser from '../components/Users/TabsetUser'
import { UserState } from '../context/User'

const AddUser = () => {
	const { user, setUser } = UserState();
	return (
		<Fragment>
			<Breadcrumb title="Create User" parent="Users" />

			{
				user.role === "Admin" &&
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
			}

			{
				user.role === "Customer" &&
				<Authorization />
			}
		</Fragment>
	)
}

export default AddUser