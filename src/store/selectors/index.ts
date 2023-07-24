import type { RoutesState } from "../slice";

export const selectedRouteSelector = (state: RoutesState) => state.routes.selectedRoute