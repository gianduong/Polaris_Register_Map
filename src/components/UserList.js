import React,{ useState, useCallback } from "react";
import { Avatar, Button } from '@shopify/polaris';
import GoogleMapReact from 'google-map-react';
import Pagination from "react-js-pagination";
require("bootstrap/less/bootstrap.less");
const AnyReactComponent = ({ text }) => <div>{text}</div>;

function UserList() {
    let center = {
        lat: 81,
        lng: 30.33
    }
    let zoom = 11

    let data = [
        {
            name: 'Person1',
            age: 30,
            weight: 200,
            lat: 51.95,
            lng: 30.33

        },
        {
            name: 'Person2',
            age: 30,
            weight: 200,
            lat: 52.95,
            lng: 30.33
        },
        {
            name: 'Person3',
            age: 30,
            weight: 200,
            lat: 54.95,
            lng: 30.33

        }
    ]
    const [state, setState] = useState({
        activePage: 15
    })
    const handleShowCenter = (person) => {
        center.lat = person.lat;
        center.lng = person.lng;
    }

    return (
        <div className="map">
            <div className="list-user">
                <span className="title">Danh sách User</span>
                <div className="list-User-detail">
                    {data.map((person, index) => (
                        <div className="list-item" onClick={() => handleShowCenter(person)}>
                            <Avatar customer name="Farrah" />
                            <span key={index} >{person.name}</span>
                        </div>
                    ))}
                </div>
                <Pagination
                    activePage={state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                />
            </div>
            <div className="map-detail">
                <GoogleMapReact
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}
export default UserList;