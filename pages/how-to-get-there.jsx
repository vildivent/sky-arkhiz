import { MainLayout } from "../layouts/MainLayout";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import Link from "next/link";

export default function HowToGetThere() {
  return (
    <MainLayout title={"Как добраться"}>
      <div className="sm:flex mt-5 justify-around">
        <div className={`font-p text-[1rem] leading-normal sm:w-[30%]`}>
          <p className="mt-0">
            Сначала Вам нужно добраться до посёлка Нижний Архыз, Зеленчукского
            района, Карачаево-Черкесской республики, в котором находится жилой
            комплекс обсерватории.
          </p>
          <p>
            После въезда в посёлок Нижний Архыз через КПП, езжайте прямо по
            дороге, не сворачивая. После этого нужно проехать 16 км до шлагбаума
            обсерватории до места проведения экскурсии (влево-вниз по карте).
          </p>
          <p>
            Также Вы можете воспользоваться услугами{" "}
            <Link href={"/collaboration/transfer"}>
              <a className={`text-cyan-500 hover:text-white`}>трансфера</a>
            </Link>
            .
          </p>
        </div>

        <div className={`flex justify-center sm:w-[60%] sm:pl-2`}>
          <YMaps>
            <Map
              defaultState={{
                center: [43.661075819224585, 41.44811349916219],
                zoom: 13,
              }}
              width={"100%"}
              height={"30rem"}
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
            </Map>
          </YMaps>
        </div>
      </div>
    </MainLayout>
  );
}
