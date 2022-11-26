import Link from "next/link";
import { MainLayout } from "../../components/layouts/MainLayout";
import { callLink } from "../../constasnts";

const Collaboration = () => {
  return (
    <MainLayout title="Сотрудничество">
      <div className="mt-5">
        <span>
          Если у Вас есть предложения, и Вы хотите сотрудничать, то позвоните по
          номеру телефона
        </span>
        <Link href={"/contacts"}>
          <a
            href={callLink.link}
            rel="nofollow"
            className={`hover:translate-y-[1px] text-cyan-500 hover:text-white mx-2`}
          >
            +7 (928) 384-30-40
          </a>
        </Link>

        <span>или свяжитесь другим</span>
        <Link href={"/contacts"}>
          <a className="text-cyan-500 hover:text-white mx-2">способом.</a>
        </Link>
      </div>
    </MainLayout>
  );
};
export default Collaboration;
