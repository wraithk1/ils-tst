interface Coordinates { 
  latitude: number
  longitude: number 
}

export interface RouteData {
  id: string
  route: string
  point1: Coordinates
  point2: Coordinates
  point3: Coordinates
}