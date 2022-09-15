/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { MainLayout } from "../layouts/MainLayout";

export default function WeatherInArkhyz() {
  return (
    <MainLayout title={"Погода в обсерватории"}>
      <div className={`flex justify-center mt-5`}>
        <div className={`flex flex-col justify-center mb-5 `}>
          <div
            className={`mx-auto`}
            dangerouslySetInnerHTML={{
              __html: `<table cellpadding=0 cellspacing=0 width=213 style="border:solid 1px #090101;font-family:Verdana;font-size:12px;background-color:#0fb3f5"><tr><td><table width=100% cellpadding=0 cellspacing=0><tr><td width=8 height=30 background="https://rp5.ru/informer/htmlinfa/topshl.png"  bgcolor=#090101> </td><td width=* align=center background="https://rp5.ru/informer/htmlinfa/topsh.png" bgcolor=#090101><a style="color:#ffffff; font-family:Verdana;font-size: 12px;" href="https://rp5.ru/13590/ru"><b>Нижний Архыз (обсерватория)</b></a></td><td width=8 height=30 background="https://rp5.ru/informer/htmlinfa/topshr.png" bgcolor=#090101> </td></tr></table></td></tr><tr><td valign=top style="padding:0;"><iframe src="https://rp5.ru/htmla.php?id=13590&lang=ru&um=00000&bg=%230fb3f5&ft=%23ffffff&fc=%23090101&c=%23000000&f=Verdana&s=12&sc=4" width=100% height=264 frameborder=0 scrolling=no style="margin:0;"></iframe></td></tr></table>`,
            }}
          />

          <a
            className={`mx-auto mt-5`}
            href="https://rp5.ru/13590/ru"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={`mx-auto mt-5 mb-3 font-p text-cyan-500 hover:text-white`}
            >
              Подробнее
            </div>
            <img
              border={0}
              width={88}
              height={31}
              src="https://rp5.ru/informer/88x31x2.php?f=12&id=13590&lang=ru&um=00000"
            />
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
