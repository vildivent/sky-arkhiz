import { MainLayout } from "../components/MainLayout";
import Hero from "../components/Hero";
import { bg } from "../public/assets";

export default function Home() {
  return (
    <MainLayout title={"Главная"}>
      <main>
        <Hero bg={bg}>
          <h1 className={`text-center text-[72px] mt-20 font-h1 `}>
            Ночные экскурсии
          </h1>
        </Hero>

        <div className="font-p text-[21px] text-justify mb-10 lg:w-[40%] sm:w-[70%] w-[90%] mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sint
          voluptate laboriosam saepe earum officiis fuga excepturi, rerum ea,
          consequuntur fugit? In nihil illo quisquam similique maiores dolor
          beatae! Odit! Ad tempora impedit, modi quibusdam quis magnam! Nisi
          beatae aliquam ad ipsa consectetur facilis similique doloremque magnam
          aut sunt nihil veniam, iusto perferendis, rem sed maxime, odio non
          ratione quaerat. Provident reprehenderit, veniam veritatis labore
          natus officia? Eum inventore adipisci quas deleniti aut rerum saepe
          labore! Molestias, consectetur qui. Veritatis, blanditiis. Culpa et
          iusto ex quod placeat quae libero? Quos? Iure suscipit, tenetur harum
          itaque ullam praesentium! Eligendi repudiandae accusantium asperiores
          eius eos nisi tenetur debitis aliquam ut possimus recusandae, quidem
          placeat cumque, veniam tempora velit nemo, sit alias odio. Amet et rem
          officiis quasi modi id culpa dolorum ipsa, illum magni? Expedita quos
          commodi aut, neque cupiditate esse nobis pariatur nemo similique modi
          fugit atque doloremque minus, cum accusamus? Ab esse corporis dicta
          suscipit eligendi quisquam rem ipsum, labore sequi distinctio iste
          incidunt magni nulla maxime expedita alias et eum laudantium ducimus
          fugiat obcaecati officiis quibusdam, laborum quasi. Nihil. Facere
          labore omnis ea hic assumenda est saepe autem, earum repellendus
          inventore ut porro sapiente, in odit quos officiis doloribus atque
          deserunt rerum deleniti ab minima. Adipisci maiores distinctio illum.
          Voluptate vero esse, nemo corrupti excepturi modi nihil consequatur
          quam magnam, at a blanditiis obcaecati debitis facere eius dolorum
          accusantium libero atque dignissimos laboriosam natus praesentium.
          Laudantium deserunt voluptate explicabo.
        </div>
      </main>
    </MainLayout>
  );
}
