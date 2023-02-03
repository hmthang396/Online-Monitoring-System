import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import Authorization from '../components/common/Authorization'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable from '../components/common/Datatable'
import { getFetch } from '../config/fetchData'
import { UserState } from '../context/User'

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const { user, setUser } = UserState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (users.length == 0 && user.role === "Admin") {
      getFetch(`/Account/all`, user.accessToken).then((data) => {
        console.log(data);
        if (data.ErrorCode == 98) {
          setUser(data.Data);
          localStorage.setItem("userInfo", JSON.stringify(data.Data));
          setError(true);
        } else if (data.ErrorCode == 0) {
          let listUsers = data.Data.map((user) => {
            return {
              id: user._id,
              avtar: user.pic,
              fullname: user.fullname,
              position: user.role
            };
          })
          setUsers(listUsers);
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }, [error])
  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />

      {
        user.role === "Admin" &&
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <h5>User Details</h5>
            </CardHeader>
            <CardBody>
              <div className="btn-popup pull-right">
                <Link to={`${process.env.PUBLIC_URL}/create-user`} className="btn btn-secondary">
                  Create User
                </Link>
              </div>
              <div className="clearfix"></div>
              <div
                id="batchDelete"
                className="category-table user-list order-table coupon-list-delete"
              >
                {
                  users.length == 0 &&
                  <div>Loading</div>
                }
                {
                  users.length > 0 &&
                  <Datatable
                    multiSelectOption={true}
                    myData={users}
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
      }

      {
        user.role === "Customer" &&
        <Authorization />
      }
    </Fragment>
  )
}

export default ListUser