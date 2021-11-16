import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Avatar } from '@shopify/polaris';
// import GoogleMapReact from 'google-map-react';
import ReactPaginate from 'react-paginate';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import personFilledMarker from '../assets/person.jpg';
import { getPaging } from "../api/baseApi"
//#region Fomat icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
// Create marker icon according to the official leaflet documentation
const personMarker = L.icon({
    iconUrl: personFilledMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});
//#endregion

const center = [51.505, -0.09]
const zoom = 13
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

//#region show center
function DisplayPosition({ map }) {
    const [position, setPosition] = useState(map.getCenter())

    const onClick = useCallback(() => {
        map.setView(center, zoom)
    }, [map])

    const onMove = useCallback(() => {
        setPosition(map.getCenter())
    }, [map])

    useEffect(() => {
        map.on('move', onMove)
        return () => {
            map.off('move', onMove)
        }
    }, [map, onMove])

    return (
        <p>
            latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
            <button onClick={onClick}>reset</button>
        </p>
    )
}
//#endregion

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup permanent>Bạn ở đây :))</Popup>
            <Tooltip direction="topleft" offset={[0, 20]} opacity={1} permanent>
                Bạn ở đây
            </Tooltip>
        </Marker>
    )
}

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <div>
                        <h3>Item #{item}</h3>
                    </div>
                ))}
        </>
    );
}

function UserList() {
    
    const [map, setMap] = useState(null)
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
            lng: 39.33

        },
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
            lat: 53.95,
            lng: 34.33
        },
        {
            name: 'Person3',
            age: 30,
            weight: 200,
            lat: 54.95,
            lng: 45.33

        },
        {
            name: 'Person1',
            age: 30,
            weight: 200,
            lat: 51.95,
            lng: 23.33

        },
        {
            name: 'Person2',
            age: 30,
            weight: 200,
            lat: 43.95,
            lng: 30.33
        },
        {
            name: 'Person3',
            age: 30,
            weight: 200,
            lat: 60.95,
            lng: 30.33

        }
    ]
    //#region pagination
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    }
    //#endregion

    const [users, setUsers] = useState(null)

    function HandleGetUser(){
        const pageInt = 1;
        const pageSize = 10;
        getPaging(pageInt,pageSize).then((res) => {
            setUsers(res.data)
            console.log(users)
        })
    };
    HandleGetUser()
    const displayMap = useMemo(
        () => (
            <MapContainer
                className="height"
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                whenCreated={setMap}>
                <TileLayer
                    url='http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
                />
                <>
                    {data &&
                        data.map((item) => (
                            <Marker position={[item.lat, item.lng]} icon={personMarker}>
                                <Tooltip offset={[0, 20]} opacity={1} permanent>
                                    <>
                                        <div>Họ và tên: {item.name}</div>
                                        <div>Tuổi: {item.age}</div>
                                        <div>Địa chỉ: {item.weight}</div>
                                    </>
                                </Tooltip>
                            </Marker>
                        ))}
                </>
                <LocationMarker />
            </MapContainer>
        ),
        [],
    )
    const onClick = useCallback((user) => {
        const userCenter = [user.lat, user.lng];
        map.setView(userCenter, 12)
    }, [map])
    return (
        <div className="map">        
            <div className="list-user">
                <span className="title">Danh sách User</span>
                <div className="list-User-detail">
                    {data.map((person, index) => (
                        <div className="list-item" onClick={() => onClick(person)}>
                            <Avatar customer name="Farrah" />
                            <span key={index} >{person.name}</span>
                        </div>
                    ))}
                </div>
                <Items currentItems={currentItems} />
                <div className="list-User-detail">
                    <div className="list-item">
                        <ReactPaginate
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>
            <div className="map-detail">

                {displayMap}
            </div >
        </div >
    )
}
export default UserList;