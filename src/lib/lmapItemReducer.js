import { Map } from 'immutable';
import { latLngToImXYmap, pointToImXYmap } from './conversions';

import {
  LMAP_DOZOOM,
  LMAP_SETZOOM,
  LMAP_ZOOM_STARTED,
  LMAP_ZOOM_ENDED,
  LMAP_MOVE_STARTED,
  LMAP_MOVE_ENDED,
  LMAP_SET_CENTER,
  LMAP_RESIZED,
  LMAP_POPUP_OPENED,
  LMAP_POPUP_CLOSED,
  LMAP_MOUSE_DOWN,
  LMAP_MOUSE_UP,
  LMAP_MOUSE_OVER,
  LMAP_MOUSE_OUT,
  LMAP_MOUSE_MOVED,
} from './actionTypes';

const defaultState = new Map({
  center: new Map({ x: 44, y: 56 }),
  zoom: 5,
});

export default function lmapItemReducer(state = defaultState, action) {
  switch (action.type) {
    case LMAP_DOZOOM:
      return state.get('zoom') !== undefined ?
        state.update('zoom', zoom => zoom + action.zoomIncrement) :
        state;

    case LMAP_SETZOOM:
      return state.set('zoom', action.zoom);

    case LMAP_ZOOM_STARTED:
      return state.set('isZooming', true);

    case LMAP_ZOOM_ENDED:
      return state.set('isZooming', false);

    case LMAP_MOVE_STARTED:
      return state.set('isMoving', true);

    case LMAP_MOVE_ENDED:
      return state.set('isMoving', false);

    case LMAP_SET_CENTER:
      return state.set('center', latLngToImXYmap(action.center));

    case LMAP_RESIZED:
      return state.set('size', pointToImXYmap(action.newSize));

    case LMAP_POPUP_OPENED:
      return state.set('isPopupOpen', true);

    case LMAP_POPUP_CLOSED:
      return state.set('isPopupOpen', false);

    case LMAP_MOUSE_DOWN:
      return state.set('isMouseDown', true);

    case LMAP_MOUSE_UP:
      return state.set('isMouseDown', false);

    case LMAP_MOUSE_OVER:
      return state.set('isMouseOver', true);

    case LMAP_MOUSE_OUT:
      return state
        .set('isMouseOver', false)
        .delete('mouseGeoCoords')
        .delete('mousePixelCoords')
      ;

    case LMAP_MOUSE_MOVED:
      return state
        .setIn(['mouseGeoCoords', 'x'], action.latlng.lat)
        .setIn(['mouseGeoCoords', 'y'], action.latlng.lng)
        .setIn(['mousePixelCoords', 'x'], action.point.x)
        .setIn(['mousePixelCoords', 'y'], action.point.y)
      ;

    default:
      return state;
  }
}
