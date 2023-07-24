import { call, takeEvery, put, select } from 'redux-saga/effects'
import { setPolyline, setError } from '../slice'
import sagaActions from './actions'
import { selectedRouteSelector } from '../selectors'
import type { RouteData } from '../../types/RouteData'
import type { PolylineOSRM } from '../../types/PolilyneOSRM'

export function* fetchPolyline() {
  try {
    const selectedRoute: RouteData = yield select(selectedRouteSelector)

    if(!selectedRoute) {
      throw new Error('Сначала выберете маршрут')
    }

    const {point1, point2, point3} = selectedRoute
    const fetchURL = `http://router.project-osrm.org/route/v1/driving/${point1.latitude},${point1.longitude};${point2.latitude},${point2.longitude};${point3.latitude},${point3.longitude}?overview=false`

    const routeOSRM: PolylineOSRM = yield call(async () => {
      return await(await fetch(fetchURL)).json()
    })

    yield put(setPolyline(routeOSRM))
  } catch (e: any) {
    yield put(setError(e.message))
  }
}

export default function* watcherSaga() {
  yield takeEvery(sagaActions.FETCH_DATA, fetchPolyline)
}