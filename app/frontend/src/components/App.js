import React, { useState, useEffect } from "react";
import L from "leaflet";
import "./App.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import { Collapse, Form, FormGroup, Label, Input, FormText } from "reactstrap";

var myIcon = L.icon({
  iconUrl:
    "data:image/png;base64,\
  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\
  ",
  iconSize: [25, 41]
  //   iconAnchor: [22, 94],
  //   popupAnchor: [-10, -90]
});

const App = () => {
  const [lat, setLat] = useState(-23);
  const [long, setLong] = useState(-45);
  const [zoom, setZoom] = useState(3);
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [listPoints, setListPoints] = useState([]);
  const position = [lat, long];

  function success(pos) {
    var crd = pos.coords;

    setLat(crd.latitude);
    setLong(crd.longitude);
    setZoom(8);
    <CardText></CardText>;
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(loc => {
        setLat(loc.latitude);
        setLong(loc.longitude);
        setZoom(8);
      });
  }

  useEffect(() => {
    fetch("/get_points")
      .then(res => res.json())
      .then(data => setListPoints(data));
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const formSubmitted = e => {
    e.preventDefault();
    const post_message = {
      contact,
      message,
      lat,
      long
    };
    console.log("submit");
    fetch("/save", {
      method: "POST",
      body: JSON.stringify(post_message)
    });
  };

  return (
    <div>
      <div className="header">
        <h3 className="display">COVID OPEN MAP</h3>
        <Button
          color="primary"
          onClick={() => setOpen(!open)}
          className="toggle-button"
        >
          Registre seu caso de COVID19 !
        </Button>
      </div>
      <Map className="map" center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={myIcon}>
          <Popup>
            Test. <br /> Easily customizable.
          </Popup>
        </Marker>
        {listPoints.map(el => {
          return (
            <Marker key={el.id} position={[el.lat, el.long]} icon={myIcon}>
              <Popup>
                Test. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
      </Map>
      <Collapse isOpen={open}>
        <Card body className="message-form">
          <CardTitle>
            <b>Informações</b>
          </CardTitle>
          {/* <CardText>Informações</CardText> */}
          <Form onSubmit={formSubmitted}>
            <FormGroup>
              <Label for="examplename">Contato:</Label>
              <Input
                onChange={e => setContact(e.target.value)}
                type="name"
                name="name"
                id="examplename"
                placeholder="Deixe um contato..."
                value={contact}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Mensagem:</Label>
              <Input
                onChange={e => setMessage(e.target.value)}
                type="textarea"
                name="text"
                id="exampleText"
                placeholder="Escreva uma mensagem"
                value={message}
              />
            </FormGroup>
            <Button type="submit">Registrar</Button>
          </Form>
        </Card>
      </Collapse>
    </div>
  );
};

export default App;
