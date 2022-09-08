import { MainLayout } from "../../components/MainLayout";

export default function Transfer() {
  return (
    <MainLayout title={"Трансфер"}>
      <main className={`lg:w-[80%] w-[90%] mx-auto mt-24`}>
        <h1
          className={`text-center font-h1 sm:text-[4.5rem] text-[2.8rem] sm:mt-24 py-8`}
        >
          Трансфер
        </h1>
        <div className={`flex justify-center mb-4`}>
          <div className={`flex flex-col justify-start`}>
            <p className={`mb-0`}>
              <a
                href="tel:+79286576416"
                rel="nofollow"
                className={`text-cyan-500 hover:text-white mr-5`}
              >
                +7 (928) 657-64-16
              </a>
              Денис (микроавтобус 8 чел.)
            </p>
            <p className={`mb-0`}>
              <a
                href="tel:+79266934744"
                rel="nofollow"
                className={`text-cyan-500 hover:text-white mr-5`}
              >
                +7 (926) 693-47-44
              </a>
              Максим (4 чел.)
            </p>
            <p className={`mb-0`}>
              <a
                href="tel:+79187131727"
                rel="nofollow"
                className={`text-cyan-500 hover:text-white mr-5`}
              >
                +7 (918) 713-17-27
              </a>
              Василий (4 чел.)
            </p>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
