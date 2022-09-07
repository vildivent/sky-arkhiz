import { MainLayout } from "../components/MainLayout";

export default function WeatherInArkhyz() {
  const SRC =
    "https://rp5.ru/htmla.php?id=13590&lang=ru&um=00000&bg=%2308af9c&ft=%23ffffff&fc=%231c1c1c&c=%23000000&f=Arial&s=12&sc=4";
  return (
    <MainLayout title={"Погода в Архызе"}>
      <main className={`lg:w-[80%] w-[90%] mx-auto mt-24`}>
        <h1
          className={`text-center font-h1 sm:text-[4.5rem] text-[2.8rem] sm:mt-24 pt-8`}
        >
          Погода в Архызе
        </h1>
        <div className={`flex flex-col justify-center mb-10 `}>
          <div
            className={`mx-auto`}
            dangerouslySetInnerHTML={{
              __html: `<table cellpadding=0 cellspacing=0 width=194 style="border:solid 1px #1c1c1c;font-family:Arial;font-size:12px;background-color:#08af9c"><tr><td><table width=100% cellpadding=0 cellspacing=0><tr><td width=8 height=30 background="https://rp5.ru/informer/htmlinfa/topshl.png"  bgcolor=#1c1c1c> </td><td width=* align=center background="https://rp5.ru/informer/htmlinfa/topsh.png" bgcolor=#1c1c1c><a style="color:#ffffff; font-family:Arial;font-size: 12px;" href="https://rp5.ru/13590/ru"><b>Нижний Архыз (обсерватория)</b></a></td><td width=8 height=30 background="https://rp5.ru/informer/htmlinfa/topshr.png" bgcolor=#1c1c1c> </td></tr></table></td></tr><tr><td valign=top style="padding:0;"><iframe src="https://rp5.ru/htmla.php?id=13590&lang=ru&um=00000&bg=%2308af9c&ft=%23ffffff&fc=%231c1c1c&c=%23000000&f=Arial&s=12&sc=4" width=100% height=263 frameborder=0 scrolling=no style="margin:0;"></iframe></td></tr></table>`,
            }}
          />
          <a
            className={`mx-auto text-cyan-500 hover:text-white`}
            href="https://rp5.ru/docs/xml/ru?id=13590"
          >
            XML экспорт прогнозов погоды
          </a>
        </div>
      </main>
    </MainLayout>
  );
}
