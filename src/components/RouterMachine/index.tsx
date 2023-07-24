import L from 'leaflet'
import 'leaflet-routing-machine'

import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

import { getPolyline } from '../../store/slice'
import { useSelector } from 'react-redux'

export default function Routing() {
  const map = useMap()
  const polyline = useSelector(getPolyline)

  useEffect(() => {
    if (!map || !polyline?.waypoints) return

    const routingControl = L.Routing.control({
      plan: L.Routing.plan([
        L.latLng(polyline.waypoints[0].location[0], polyline.waypoints[0].location[1]),
        L.latLng(polyline.waypoints[1].location[0], polyline.waypoints[1].location[1]),
        L.latLng(polyline.waypoints[2].location[0], polyline.waypoints[2].location[1])
      ], {
        createMarker: function(i, waypoint, n){
          return L.marker(waypoint.latLng);
        }
      })
    }).addTo(map)

    return () => {
      map.removeControl(routingControl)
    }
  }, [map, polyline])

  return <></>
}