import type { Waypoint } from "./Waypoint"

export interface PolylineOSRM {
  code: string
  waypoints: Waypoint[]
  routes: any[]
}
