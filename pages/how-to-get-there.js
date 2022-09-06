import { MainLayout } from "../components/MainLayout";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import "../styles/HowToGetThere.module.css";

export default function HowToGetThere() {
  return (
    <MainLayout title={"Как добраться"}>
      <main>
        <h1 className={`text-center py-[125px] text-[72px] font-h1 heading`}>
          Как добраться
        </h1>

        <div className={`flex justify-center sm:m-10 m-5`}>
          <YMaps>
            <Map
              defaultState={{
                center: [43.650004569239, 41.43560851623212],
                zoom: 16,
              }}
              width={"100%"}
              height={"30rem"}
              modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            >
              <Placemark
                geometry={[43.650004569239, 41.43560851623212]}
                properties={{
                  iconContent: "",
                  iconCaption: "Место сбора",
                  hintContent: "",
                  balloonContent: "Площадка проведения экскурсии",
                  balloonContentHeader: "",
                }}
              />
              <ZoomControl options={{ float: "left" }} />
              <GeolocationControl options={{ float: "right" }} />
            </Map>
          </YMaps>
        </div>
      </main>
    </MainLayout>
  );
}
