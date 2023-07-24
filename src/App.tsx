import React from 'react'
import { Layout, Row, Col, Alert } from 'antd'

import RoutesTable from './components/RoutesTable'
import RoutesMap from './components/RoutesMap'
import { useSelector } from 'react-redux'
import { getError } from './store/slice'

const CONTENT_STYLE: React.CSSProperties = {
  minHeight: '100vh',
  minWidth: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const { Content } = Layout

function App() {
  const error = useSelector(getError)

  return (
    <Layout>
      <Content style={CONTENT_STYLE}>
        {!error ? (
          <Row gutter={16}>
            <Col>
              <RoutesTable />
            </Col>
            <Col>
              <RoutesMap />
            </Col>
          </Row>
        ) : (
          <Alert message={error} type='error' showIcon />
        )}
      </Content>
    </Layout>
  )
}

export default App
