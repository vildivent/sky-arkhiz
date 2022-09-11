import Image from "next/image";

import { MainLayout } from "../../layouts/MainLayout";
import { bta1, bta2, ratan600 } from "../../public/assets";

export default function ToursToTheObservatory() {
  return (
    <MainLayout title={"Экскурсии в обсерваторию"}>
      <h2 className={`font-h2 text-center text-5xl pt-5`}>
        Телескопы: оптический БТА и радиотелескоп РАТАН-600
      </h2>
      <div className={`text-justify`}>
        <p>
          У вас есть возможность посетить уникальные объекты Специальной
          астрофизической обсерватории Российской академии наук (САО РАН) -
          Большой Телескоп Альт-Азимутальный (БТА) и РадиоТелескоп Академии Наук
          (РАТАН 600).
        </p>
        <div>
          <div>
            <Image
              src={bta1}
              alt="Фото БТА"
              layout="responsive"
              placeholder="blur"
            />
          </div>

          <p>
            <span className={`font-bold text-cyan-500`}>БТА</span> с диаметром
            зеркала 6 метров, является крупнейшим в Евразии оптическим
            телескопом. Он установлен в 17 км от поселка Нижний Архыз на Верхней
            Научной Площадке САО РАН у подножья горы Пастухова на высоте 2070 м
            над уровнем моря.
          </p>
          <p>
            Экскурсии на БТА проводятся{" "}
            <span className={`font-bold text-cyan-500`}>с 9:00 до 15:00</span>
          </p>
        </div>
        <div>
          <div>
            <Image
              src={bta2}
              alt="Фото БТА холл"
              layout="responsive"
              placeholder="blur"
            />
          </div>

          <p className={`font-bold text-cyan-500`}>
            В штатном режиме без согласования:
          </p>
          <p>
            с 1 мая до 6 ноября по пятницам, субботам и воскресеньям и
            календарным праздничным дням. С 6 ноября по 1 мая по субботам,
            воскресеньям и календарным праздничным дням. На протяжении
            календарных новогодних и майских праздников, осенних и весенних
            школьных каникул в соответствии с классическим расписанием по
            четвертям.
          </p>
          <p>
            Свое посещение{" "}
            <span className={`font-bold text-cyan-500`}>
              в дни весенних и осенних каникул согласовывайте
            </span>{" "}
            по телефонам:{" "}
            <a
              href="tel:+78787846100"
              rel="nofollow"
              className={`whitespace-nowrap text-cyan-500 hover:text-white`}
            >
              +7 (878) 784-61-00
            </a>
            ,{" "}
            <a
              href="tel:+78782293392"
              rel="nofollow"
              className={`whitespace-nowrap text-cyan-500 hover:text-white`}
            >
              +7 (878) 229-33-92
            </a>
            .
          </p>
          <p className={`font-bold text-cyan-500`}>
            В будние дни по согласованию:
          </p>
          <p>
            организованные группы от 10 человек и более по согласованию по
            телефону:{" "}
            <a
              href="tel:+79380384552"
              rel="nofollow"
              className={`whitespace-nowrap text-cyan-500 hover:text-white`}
            >
              +7 (938) 038-45-52
            </a>
            .
          </p>
          <p>Продолжительность экскурсии около 40 минут.</p>
          <p className={`font-bold text-cyan-500`}>
            31 декабря и 1 января - не экскурсионные дни.
          </p>
        </div>
        <div>
          <div>
            <Image
              src={ratan600}
              alt="Фото Ратан-600"
              layout="responsive"
              placeholder="blur"
            />
          </div>

          <p>
            РАТАН-600 - радиотелескоп с диаметром главного зеркала 576 метров,
            является крупнейшим радиотелескопом в мире, находится в станице
            Зеленчукской в 25 км от поселка Нижний Архыз, на высоте 970 метров
            над уровнем моря.
          </p>
          <p>
            Экскурсии на РАТАН-600 проводятся ежедневно по договоренности,
            согласовывайте Ваше посещение заранее по телефону:{" "}
            <a
              href="tel:+79187110271"
              rel="nofollow"
              className={`whitespace-nowrap text-cyan-500 hover:text-white`}
            >
              +7 (918) 711-02-71
            </a>
            ,{" "}
            <a
              href="tel:+79380384552"
              rel="nofollow"
              className={`whitespace-nowrap text-cyan-500 hover:text-white`}
            >
              +7 (938) 038-45-52
            </a>
            .
          </p>
          <p>
            Продолжительность экскурсии около 60 минут. 31 декабря и 1 января -
            не экскурсионные дни.
          </p>
        </div>
        <ul>
          <li>Стоимость билета экскурсии на БТА или РАТАН-600:</li>
          <li className={`list-inside list-disc pl-5`}>
            300 рублей для взрослого,
          </li>
          <li className={`list-inside list-disc pl-5`}>
            150 рублей для школьника.
          </li>
          <li>Дети дошкольного возраста посещают экскурсии бесплатно.</li>
          <li>
            Стоимость может отличаться от пердставленной на сайте. Точную
            стоимость уточняйте по телефону.
          </li>
        </ul>
        <p>
          Руководители групп освобождаются от оплаты в том случае, если на
          одного руководителя приходится не менее 10 детей.
        </p>
        <p>
          Родители и руководители групп обязаны следить за тем, чтобы дети не
          мешали проведению экскурсий.
        </p>
        <ul>
          <li>
            <a
              href="tel:+78782293392"
              rel="nofollow"
              className={`whitespace-nowrap text-cyan-500 hover:text-white`}
            >
              +7 (878) 229-33-92
            </a>
          </li>
          <li>
            <a
              href="tel:+78787846100"
              rel="nofollow"
              className={`whitespace-nowrap text-cyan-500 hover:text-white`}
            >
              +7 (878) 784-61-00
            </a>
          </li>
          <li>
            <a
              href="tel:+79283949139"
              rel="nofollow"
              className={`whitespace-nowrap text-cyan-500 hover:text-white`}
            >
              +7 (928) 394-91-39
            </a>
          </li>
          <li>
            <a
              href="tel:+79380384552"
              rel="nofollow"
              className={`whitespace-nowrap text-cyan-500 hover:text-white`}
            >
              +7 (938) 038-45-52
            </a>
          </li>
        </ul>
        <p>
          <a
            className={`text-cyan-500 hover:text-white`}
            href={`https://www.sao.ru/excursion/`}
            target="_blank"
            rel="noreferrer"
          >
            www.sao.ru
          </a>
        </p>
      </div>
    </MainLayout>
  );
}
