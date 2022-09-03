import Image from "next/image";
import BgCover from "../components/BgCover";
import { MainLayout } from "../components/MainLayout";
import { roadToStarsGalaxy, roadToStarsTelescope } from "../public/assets";
import { bgStars4k } from "../public/assets";

export default function Excursions() {
  return (
    <MainLayout title={"Экскурсии"}>
      <BgCover bg={bgStars4k} height="100%">
        <main className={`lg:w-[80%] w-[90%] mx-auto mt-[6rem]`}>
          <h1
            className={`text-center font-h1 sm:text-[72px] text-[45px] sm:mt-[6rem] pt-[2rem]`}
          >
            Дорога к звёздам
          </h1>
          <h2
            className={`text-center font-h1 italic sm:text-[40px] text-[23px] mt-5`}
          >
            Ночная экскурсия по звёздному небу с телескопом
          </h2>
          <h3
            className={`text-center font-h1 italic text-gray-300 sm:text-[30px] text-[18px] mt-5`}
          >
            Категория: образовательный туризм.
          </h3>
          <div
            className={`font-p text-[15px] leading-normal text-justify mt-5`}
          >
            <p>
              Ночное небо завораживает своей красотой в разное время года
              по-новому. Познавательная лекция под открытым небом познакомит вас
              с небесными объектами, видимыми глазом.
            </p>
            <div className={`lg:float-right lg:ml-5 text-center`}>
              <Image
                src={roadToStarsGalaxy}
                alt="Галактика"
                quality={100}
                placeholder="blur"
              />
            </div>

            <p>
              С помощью мобильного телескопа CELESTRON c диаметром объектива
              280мм и максимальным увеличением 660х, вы сможете рассмотреть
              интересные объекты ночного неба доступные в данное время года и
              ночи (луна, планеты, галактики, скопления звезд, туманности и
              др.).
            </p>
            <p>
              Профессиональный экскурсовод - сотрудник Специальной
              астрофизической обсерватории - ответит на интересующие вас вопросы
              и поможет погрузиться в увлекательный мир астрономии, где вам
              откроются тайны и загадки Вселенной.
            </p>
            <p>
              Экскурсия рассчитана на взрослых людей и школьников. Вы можете
              брать с собой детей любого возраста, в зависимости от степени их
              заинтересованности астрономией.
            </p>
            <div className={`sm:float-left sm:mr-5 text-center`}>
              <Image
                src={roadToStarsTelescope}
                alt="Телескоп"
                quality={100}
                placeholder="blur"
              />
            </div>
            <p>
              Экскурсии проводятся ежедневно, но зависят от погоды, при
              облачности, осадках, тумане, высокой влажности или ветре -
              экскурсии не проводятся. Решение о проведении или отмене экскурсии
              принимает экскурсовод в день проведения, за два часа до начала.
            </p>
            <p>
              Начало экскурсии: летом примерно в 21.30, зимой около 19.00. При
              неустойчивой погоде время может корректироваться от 30 до 90
              минут.
            </p>
            <ul className="list-inside list-disc">
              <li className="list-none">Место проведения:</li>
              <li>
                пос. Нижний Архыз, Верхняя научная площадка Специальной
                астрофизической обсерватории, территория телескопа БТА;
              </li>
              <li>поселок Романтик (по отдельной заявке для больших групп).</li>
            </ul>
            <p>Продолжительность экскурсии 1,5 часа.</p>
            <p>Количество человек в группе до 25.</p>
            <p>
              Стоимость экскурсии -
              <span className="font-bold text-[1.2rem] whitespace-nowrap">
                {" "}
                600 руб.
              </span>{" "}
              с человека. (Минимум 6000 руб. с группы).
            </p>
            <p>
              Для записи на экскурсию необходимо прислать сообщение в WhatsApp
              или Telegram на номер{" "}
              <span className="font-bold text-cyan-600 text-[1.1rem] whitespace-nowrap">
                {" "}
                +7 (928) 384-30-40
              </span>{" "}
              в котором указать даты (числа и месяц) и количество человек.
            </p>
            <p>Трансфер к месту проведения вы осуществляете своими силами.</p>
            <p className={`italic mb-0 pb-5`}>
              Оденьтесь и обуйтесь как следует - вам предстоит провести 1,5 - 2
              часа на улице в горах, на высоте 2070 метров. Термос с горячим
              чаем не помешает.
            </p>
          </div>
        </main>
      </BgCover>
    </MainLayout>
  );
}
