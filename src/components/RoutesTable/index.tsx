import React from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import {useDispatch, useSelector} from 'react-redux'
import sagaActions from '../../store/saga/actions'
import { getRoutes, getSelectedRoute, setSelectedRoute } from '../../store/slice'
import type { RouteData } from '../../types/RouteData'

const columns: ColumnsType<RouteData> = [
  {
    title: 'Маршрут',
    dataIndex: 'route'
  },
  {
    title: 'Точка 1 (lat, lng)',
    responsive: ['lg'],
    render: (_, { point1 }) => <span>{point1.latitude}, {point1.longitude}</span>,
  },
  {
    title: 'Точка 2 (lat, lng)',
    responsive: ['lg'],
    render: (_, { point2 }) => <span>{point2.latitude}, {point2.longitude}</span>,
  },
  {
    title: 'Точка 3 (lat, lng)',
    responsive: ['lg'],
    render: (_, { point3 }) => <span>{point3.latitude}, {point3.longitude}</span>,
  },
]

function RoutesTable() {
  const dispatch = useDispatch()
  const routes = useSelector(getRoutes)
  const selectedRoute = useSelector(getSelectedRoute)

  return (
    <Table
      rowKey={Date.now().toString()}
      columns={columns}
      dataSource={routes}
      pagination={{ hideOnSinglePage: true }}
      style={{ height: '300px' }}
      rowClassName={(record, idx) => (record.id === selectedRoute.id ? 'active-row' : '')}
      onRow={(record, idx) => {
        return {
          onClick: (e) => {
            dispatch(setSelectedRoute(record))
            dispatch({ type: sagaActions.FETCH_DATA })
          },
        }
      }}
    />
  )
}

export default RoutesTable
