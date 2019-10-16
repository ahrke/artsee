import { connect } from 'react-redux';
import MapScreen from '../Components/MapScreen/MapScreen';
import {
  updateUserLocation,
  setNearestArts
} from '../actions';


const mapStateToProps = state => ({
  arts: state.arts,
  currUserLocation: state.maps.userLocation
})

const mapDispatchToProps = dispatch => ({
  updateUserLocation: coords => dispatch(updateUserLocation(coords)),
  setNearestArts: arts => dispatch(setNearestArts(arts))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
