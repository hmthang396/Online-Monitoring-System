import React from 'react'
import { Card, CardHeader, Container } from 'reactstrap'

const Authorization = () => {
  return (
    <Container fluid={true}>
      <Card>
        <CardHeader>
          <h5>Bạn Không đủ thẩm quyền để truy cập vào trang này</h5>
        </CardHeader>
      </Card>
    </Container>
  )
}

export default Authorization