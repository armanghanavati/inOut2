// import {  } from "mapir-react-component";
import Mapir from "mapir-react-component";
import React from "react";
import { Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const MapLocation = ({ location, setLocation }) => {
  const mediaXs = useMediaQuery({ query: "(max-width: 370px)" });
  const mediaMd = useMediaQuery({ query: "(max-width: 750px)" });
  const mediaXl = useMediaQuery({ query: "(max-width: 990px)" });

  const position = [location?.longitude || 35.701015360529524, location?.latitude || 51.3421678918595];
  const tokenMapir =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUzODgyOWQ5ZjJkNzI4MDg2YTlhODRmMjI0ZGNhMThmOTQwMDNkOThkNmNhYTFmNmNlYTY2MjEzNzYzYmFkYzY4ZmEzMzZlYTlmMGQzMjEwIn0.eyJhdWQiOiIyNjY5NSIsImp0aSI6IjUzODgyOWQ5ZjJkNzI4MDg2YTlhODRmMjI0ZGNhMThmOTQwMDNkOThkNmNhYTFmNmNlYTY2MjEzNzYzYmFkYzY4ZmEzMzZlYTlmMGQzMjEwIiwiaWF0IjoxNzEwNjI3NjE3LCJuYmYiOjE3MTA2Mjc2MTcsImV4cCI6MTcxMzA0NjgxNywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.Whouv1KCk23Xt7-sV-cIBN23x60H6YjsO-G_QUzgekCzOCyVvPAZ6QM34dC2lkMtIEy6PxU29pO4nY2xvKG1OI-RmEByezDunNFhFNR1O42gtZYRa9SPmTXkeRJ_P9eQoNVqO8ls32kqtpTzVNvCJsvKuL9Z1EQXjEigRXbIl17W8xffB0u6Dqdr0K0enSsPp-AVH-igugxrtYh1ZNWQkndmv0XSsjbzTTof_ZYOw6iM5hJ8CpP1iWu8uTjxF0ICcSwrlRTXGqBdpfXSDfaFVeaA3YfHpzdqmkVB_k_vxLVsv_X3robVUWvV9DRwgagrkZJx_W2cHgPF1ArsmskV-g";

  const Map = Mapir.setToken({
    transformRequest: (url) => {
      return {
        url: url,
        fitBounds: [[], []],
        hash: true,
        trackResize: true,
        refreshExpiredTiles: false,
        headers: {
          "x-api-key": tokenMapir, // Replace 'Your_API_KEY' with your actual Mapir API key
          "Mapir-SDK": "reactjs",
        },
      };
    },
  });

  return (
    <>
      <Mapir
        type="fill"
        className="maxW-400 maxH-400 fitMap w-100 border border-primary m-2 rounded-4"
        userLocation
        center={position}
        scrollZoom={false}
        hash={true}
        Map={Map}
        interactive={true}
        onMoveEnd={(map) => console.log(map.getZoom())}
      >
        <Mapir.Feature coordinates={position} />
        <Mapir.Layer type="symbol" layout={{ "icon-image": "harbor-15" }} />
        <Mapir.Marker coordinates={position} anchor="bottom" />
      </Mapir>
    </>
  );
};

export default MapLocation;
