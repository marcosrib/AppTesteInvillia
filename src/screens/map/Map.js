import React, { Component } from 'react'
import { View } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios'
import Search from '../search'
import { CHAVEGOOGLE } from '../../util/chaveGoogle'
class Map extends Component {

    state = {
        region: null,
        places: null,
        localSeleciodoMarker: null,
        markerSeleciondado:true
    }

    async componentDidMount() {
        Geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                console.log(latitude, longitude);
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                })
                this.getLacaisProximos()
            },
            error => console.log(error.message),
            { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 }
        )
    }

    getGeolocation = async () => {

    }

    getLacaisProximos = async () => {
        const { latitude, longitude } = this.state.region

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=point_of_interest&key=${CHAVEGOOGLE}`
        const places = await axios.get(url);
        const markers = [];
        places.data.results.map((data, index) => {
            markers.push(
                <Marker
                    key={index}
                    title={data.name}
                    coordinate={{
                        latitude: data.geometry.location.lat,
                        longitude: data.geometry.location.lng
                    }}
                />
            )
            this.setState({ places: markers })
        })


    }
    localSelecionado = (data, { geometry }) => {
        const { lat: latitude, lng: longitude } = geometry.location
        this.setState({
            region: {
                latitude,
                longitude,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.0134
            }
        })
        this.setState({
            localSeleciodoMarker: {
                latitude,
                longitude,
            }
        })
        this.setState({markerSeleciondado:true})
    }

    render() {
        const { region, localSeleciodoMarker } = this.state
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled={true}
                   
                >
                    {this.state.localSeleciodoMarker !== null ?
                        <Marker
                            coordinate={localSeleciodoMarker}
                        /> : this.state.places}
                </MapView>
                <Search localSelecionado={this.localSelecionado} />
            </View>
        );
    }

}
export default Map