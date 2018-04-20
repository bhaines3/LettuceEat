import React, { Component } from 'react';
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';

const params = { v: '3.exp', key: 'AIzaSyABpdOVb3I9kBHUBo-8YP3VpPmBH8DSPz4' };

class Map extends Component {

    state = {
        lat: "",
        lng: "",
        msg: ""
    }
    componentWillMount() {
        this.setState({
            lat: this.props.lat,
            lng: this.props.lng,
            msg: this.props.msg
        })
    }
    
    //Updates state every time state is updatedin the parent in each click
    componentWillReceiveProps(nextProps) {
        this.setState({
            lat: nextProps.lat,
            lng: nextProps.lng,
            msg: nextProps.msg
        })
    }

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onDragEnd(e) {
        console.log('onDragEnd', e);
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    onClick(e) {
        console.log('onClick', e);
    }

    render() {
        return (
            <Gmaps className="mb-4"
                width={'100%'}
                height={'500%'}
                lat={this.state.lat}
                lng={this.state.lng}
                zoom={12}
                loadingMessage={'loading...'}
                params={params}
                onMapCreated={this.onMapCreated}>
                <Marker
                    lat={this.state.lat}
                    lng={this.state.lng}
                    draggable={true}
                    onDragEnd={this.onDragEnd} />
                <InfoWindow
                    lat={this.state.lat}
                    lng={this.state.lng}
                    content={this.state.msg}
                    onCloseClick={this.onCloseClick} />
            </Gmaps>
        );
    }
};

export default Map;
