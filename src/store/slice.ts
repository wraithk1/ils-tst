import { configureStore, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import type { RouteData } from '../types/RouteData'
import type { PolylineOSRM } from '../types/PolilyneOSRM'

const data: RouteData[] = [
  {
    id: '1',
    route: 'Маршрут 1',
    point1: { latitude: 59.84660399, longitude: 30.29496392 },
    point2: { latitude: 59.82934196, longitude: 30.42423701 },
    point3: { latitude: 59.83567701, longitude: 30.38064206 },
  },
  {
    id: '2',
    route: 'Маршрут 2',
    point1: { latitude: 59.82934196, longitude: 30.42423701 },
    point2: { latitude: 59.82761295, longitude: 30.41705607 },
    point3: { latitude: 59.84660399, longitude: 30.29496392 },
  },
  {
    id: '3',
    route: 'Маршрут 3',
    point1: { latitude: 59.83567701, longitude: 30.38064206 },
    point2: { latitude: 59.84660399, longitude: 30.29496392 },
    point3: { latitude: 59.82761295, longitude: 30.41705607 },
  },
]

const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    selectedRoute: {} as RouteData,
    polyline: {} as PolylineOSRM,
    routes: data,
    isLoading: false,
    error: '',
  },
  reducers: {
    setSelectedRoute: (state, action: PayloadAction<RouteData>) => {
      state.selectedRoute = action.payload
    },
    setPolyline: (state, action: PayloadAction<PolylineOSRM>) => {
      state.polyline = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})


export type RoutesState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const {setSelectedRoute, setPolyline, setError} = routesSlice.actions

export const getRoutes = (state: RoutesState) => state.routes.routes
export const getSelectedRoute = (state: RoutesState) => state.routes.selectedRoute
export const getPolyline = (state: RoutesState) => state.routes.polyline
export const getError = (state: RoutesState) => state.routes.error

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: {
    routes: routesSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(saga)

export default store