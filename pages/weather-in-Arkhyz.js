import { MainLayout } from "../components/MainLayout";

export default function WeatherInArkhyz() {
  return (
    <MainLayout title={"Погода в Архызе"}>
      <main className={`lg:w-[80%] w-[90%] mx-auto mt-24`}>
        <h1
          className={`text-center font-h1 sm:text-[4.5rem] text-[2.8rem] sm:mt-24 pt-8`}
        >
          Погода в Архызе
        </h1>
        <div className={`flex justify-center`}>
          <div className={`flex flex-col justify-center mb-5 `}>
            <div
              className={`mx-auto`}
              dangerouslySetInnerHTML={{
                __html: `<table cellpadding=0 cellspacing=0 width=213 style="border:solid 1px #090101;font-family:Verdana;font-size:12px;background-color:#0fb3f5"><tr><td><table width=100% cellpadding=0 cellspacing=0><tr><td width=8 height=30 background="https://rp5.ru/informer/htmlinfa/topshl.png"  bgcolor=#090101> </td><td width=* align=center background="https://rp5.ru/informer/htmlinfa/topsh.png" bgcolor=#090101><a style="color:#ffffff; font-family:Verdana;font-size: 12px;" href="https://rp5.ru/13590/ru"><b>Нижний Архыз (обсерватория)</b></a></td><td width=8 height=30 background="https://rp5.ru/informer/htmlinfa/topshr.png" bgcolor=#090101> </td></tr></table></td></tr><tr><td valign=top style="padding:0;"><iframe src="https://rp5.ru/htmla.php?id=13590&lang=ru&um=00000&bg=%230fb3f5&ft=%23ffffff&fc=%23090101&c=%23000000&f=Verdana&s=12&sc=4" width=100% height=264 frameborder=0 scrolling=no style="margin:0;"></iframe></td></tr></table>`,
              }}
            />
            <a
              className={`mx-auto my-5 text-cyan-500 hover:text-white`}
              href="https://rp5.ru/docs/xml/ru?id=13590"
            >
              XML экспорт прогнозов погоды
            </a>

            <a className={`mx-auto`} href="https://rp5.ru/13590/ru">
              <img
                border={0}
                width={88}
                height={31}
                src="https://rp5.ru/informer/88x31x2.php?f=12&id=13590&lang=ru&um=00000"
              />
            </a>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
