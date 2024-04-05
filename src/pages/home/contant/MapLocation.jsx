// import {  } from "mapir-react-component";
import Mapir from "mapir-react-component";
import React, { useEffect, useRef, useState } from "react";
import { useMyContext } from "../../../components/contextProvider/MyContext";
const tokenMapir =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUzODgyOWQ5ZjJkNzI4MDg2YTlhODRmMjI0ZGNhMThmOTQwMDNkOThkNmNhYTFmNmNlYTY2MjEzNzYzYmFkYzY4ZmEzMzZlYTlmMGQzMjEwIn0.eyJhdWQiOiIyNjY5NSIsImp0aSI6IjUzODgyOWQ5ZjJkNzI4MDg2YTlhODRmMjI0ZGNhMThmOTQwMDNkOThkNmNhYTFmNmNlYTY2MjEzNzYzYmFkYzY4ZmEzMzZlYTlmMGQzMjEwIiwiaWF0IjoxNzEwNjI3NjE3LCJuYmYiOjE3MTA2Mjc2MTcsImV4cCI6MTcxMzA0NjgxNywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.Whouv1KCk23Xt7-sV-cIBN23x60H6YjsO-G_QUzgekCzOCyVvPAZ6QM34dC2lkMtIEy6PxU29pO4nY2xvKG1OI-RmEByezDunNFhFNR1O42gtZYRa9SPmTXkeRJ_P9eQoNVqO8ls32kqtpTzVNvCJsvKuL9Z1EQXjEigRXbIl17W8xffB0u6Dqdr0K0enSsPp-AVH-igugxrtYh1ZNWQkndmv0XSsjbzTTof_ZYOw6iM5hJ8CpP1iWu8uTjxF0ICcSwrlRTXGqBdpfXSDfaFVeaA3YfHpzdqmkVB_k_vxLVsv_X3robVUWvV9DRwgagrkZJx_W2cHgPF1ArsmskV-g";

const MapLocation = () => {
  // const { isLocation } = useMyContext();
  // const position = [isLocation?.longitude, isLocation?.latitude];
  const [isLocation, setIsLocation] = useState([0, 0]);

  let prevPositionRef = useRef(null);

  // const handleGetLocation = () => {
  //   const interval = setInterval(() => {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         prevPositionRef({ latitude, longitude });
  //       },
  //       (error) => {
  //         console.error("Error getting geolocation:", error.message);
  //       }
  //     );
  //     return () => clearInterval(interval);
  //   }, 3000);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          setIsLocation([longitude, latitude]);
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const { longitude, latitude } = isLocation || {};
  //   if (typeof longitude === "number" && typeof latitude === "number") {
  //     prevPositionRef.current = [longitude, latitude];
  //   }
  // }, [isLocation]);

  const Map = Mapir.setToken({
    transformRequest: (url) => {
      return {
        url: url,
        fitBounds: [[], []],
        hash: true,
        trackResize: true,
        refreshExpiredTiles: false,
        headers: {
          "x-api-key": tokenMapir,
          "Mapir-SDK": "reactjs",
        },
      };
    },
  });

  return (
    <>
      {
        <Mapir
          zoom={[15]}
          type="fill"
          className="maxW-400 maxH-400 fitMap w-100 border border-primary m-2 rounded-4"
          userLocation
          center={isLocation}
          scrollZoom={false}
          hash={true}
          Map={Map}
          interactive={true}
          onMoveEnd={(map) => console.log(map.getZoom())}
        >
          <Mapir.Feature coordinates={isLocation} />
          <Mapir.Layer type="symbol" layout={{ "icon-image": "harbor-15" }} />
          <Mapir.Marker coordinates={isLocation} anchor="bottom" />
        </Mapir>
      }
    </>
  );
};

// export default React.memo(MapLocation);
export default MapLocation;
