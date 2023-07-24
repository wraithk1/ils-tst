interface SagaActions {
  SELECT_ROUTE: string
  FETCH_DATA: string
  FETCH_FAILED: string
}

const sagaActions: SagaActions = {
  SELECT_ROUTE: 'SELECT_ROUTE',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_FAILED: 'FETCH_FAILED'
}

export default sagaActions