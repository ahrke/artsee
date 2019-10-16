import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

import useApplicationData from '../../hooks/useApplicationData';

import CenterOnMe from './CenterOnMe';
import { NearestArtButton, NearestArtsButton, NearestArtDirections, Duration } from './Nearest';
import { marker, userLocation } from './MapWidgets';

export default MapScreen = ({navigation, arts, currUserLocation, updateUserLocation, setNearestArts}) => {

  const {
    state,
    getNearestArt
  } = useApplicationData();

  const [duration, setDuration] = useState(null);
  const [mapview, setMapview] = useState(null);
  const [directionOn, setDirectionState] = useState(false)
  const [region, setRegion] = useState({
    latitude: 43.644913,
    longitude: -79.402520,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0081,
  })

  navigationOptions = {
    title: 'Map'
  };

  useEffect(() => {
    if (mapview) {
      mapview.animateToRegion(region, 50)
    }
  }, [region])

  return (
    <Container style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
       {/* <Header style={{backgroundColor:colors.color2}}>
        <Left style={{flex:1}}><Text style={{color:colors.text, fontWeight:'bold', fontSize:18}}>artsee</Text></Left>
        <Body style={{flex:1, alignItems:'center', justifyContent: "center"}}>
        </Body>
        <Right style={{flex:1}}/>
      </Header> */}
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          onUserLocationChange={event => updateUserLocation(event.nativeEvent)}
          ref={c => setMapview(c)}
        >
          {marker(arts, setRegion, region, navigation)}
          {currUserLocation && userLocation(currUserLocation)}
          <NearestArtDirections userLocation={currUserLocation} destination={state.destination} setDuration={setDuration} setRegion={setRegion} directionOn={directionOn} setDirectionState={setDirectionState} />
        </MapView>
        <NearestArtButton getNearestArt={getNearestArt} setDirectionState={setDirectionState} userLocation={currUserLocation} />
        <NearestArtsButton setNearestArts={setNearestArts} userLocation={currUserLocation} arts={arts} />
        <Duration duration={duration} setDuration={setDuration} setDirectionState={setDirectionState} setRegion={setRegion} userLocation={currUserLocation} />
        <CenterOnMe
          setRegion={setRegion}
          coordinates={{
            latitude:
              (currUserLocation && currUserLocation.latitude) || 43.644913,
            longitude:
              (currUserLocation && currUserLocation.longitude) || -79.40252
          }}
       />
      </View>
    </Container>
  );
};