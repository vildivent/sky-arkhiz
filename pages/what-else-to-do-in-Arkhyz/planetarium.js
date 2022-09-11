import Image from "next/image";
import { MainLayout } from "../../layouts/MainLayout";
import { planetarium } from "../../public/assets";

export default function Planetarium() {
  return (
    <MainLayout title={"Планетарий САО РАН"}>
      <div className={`text-justify`}>
        <p>
          Приглашаем посетить планетарий САО РАН{" "}
          <a
            className={`text-cyan-500 hover:text-white`}
            href={`https://www.planetarium-sao.ru/`}
            target="_blank"
            rel="noreferrer"
          >
            www.planetarium-sao.ru
          </a>
          .
        </p>
        <div>
          <Image
            src={planetarium}
            alt="Планетарий"
            layout="responsive"
            quality={70}
            placeholder="blur"
          />
        </div>
        <ul className="my-4">
          <li>Время работы планетария: ежедневно с 13:00 до 18:00.</li>
          <li>Принимаются группы от 5 человек и более.</li>
          <li>Продолжительность сеансов 25-35 минут.</li>
        </ul>
        <ul>
          <li>Стоимость билета:</li>
          <li className={`list-disc list-inside pl-5`}>
            300 рублей для взрослого,
          </li>
          <li className={`list-disc list-inside pl-5`}>
            150 рублей для школьника.
          </li>
          <li>Дети дошкольного возраста посещают планетарий бесплатно.</li>
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
          мешали проведению сеанса.
        </p>
        <p>
          Запись по телефону:{" "}
          <a
            href="tel:+79380384552"
            rel="nofollow"
            className={`whitespace-nowrap text-cyan-500 hover:text-white`}
          >
            +7 (938) 038-45-52
          </a>{" "}
          (Марина Анатольевна).
        </p>
      </div>
    </MainLayout>
  );
}
