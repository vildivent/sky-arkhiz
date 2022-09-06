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
      <main className={`lg:w-[80%] w-[90%] mx-auto mt-24`}>
        <h1
          className={`text-center font-h1 sm:text-[4.5rem] text-[2.8rem] sm:mt-24 pt-8`}
        >
          Как добраться
        </h1>
        <p className={`font-p text-[1.5rem] `}>
          Сначала Вам нужно добраться до посёлка Нижний Архыз, Зеленчукского
          района, Карачаево-Черкесской республики, в котором находится жилой
          комплекс обсерватории.
        </p>
        <p className={`font-p text-[1.5rem] `}>
          После въезда в посёлок Нижний Архыз через КПП, езжайте прямо по
          дороге, не сворачивая. После этого нужно проехать 16 км до шлагбаума
          обсерватории до места проведения экскурсии (влево-вниз по карте).
        </p>

        <div className={`flex justify-center mb-10`}>
          <YMaps>
            <Map
              defaultState={{
                center: [43.661075819224585, 41.44811349916219],
                zoom: 14,
              }}
              width={"100%"}
              height={"37rem"}
              modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            >
              <Placemark
                geometry={[43.650004569239, 41.43560851623212]}
                properties={{
                  iconContent: "",
                  iconCaption: "Место проведения экскурсии",
                  hintContent: "",
                  balloonContent: "Площадка для проведения экскурсии",
                  balloonContentHeader: "",
                }}
              />
              <ZoomControl options={{ float: "left" }} />
              <GeolocationControl options={{ float: "left" }} />
            </Map>
          </YMaps>
        </div>
      </main>
    </MainLayout>
  );
}
