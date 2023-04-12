import Image from "next/image";
import { MainLayout } from "../components/layouts/MainLayout";
import { callLink, socialLinks } from "../constants";

const Contacts = () => {
  return (
    <MainLayout title="Контакты">
      <div className="flex flex-col gap-3 mt-5">
        <a
          href={callLink.link}
          rel="nofollow"
          className={`flex gap-5 items-center hover:translate-y-[1px]`}
        >
          <Image
            src={callLink.logo}
            alt={callLink.title}
            width={40}
            height={40}
          />
          <span>
            <span>Тел.: </span>
            <span className="hover:text-cyan-500">+7 (928) 384-30-40</span>
          </span>
        </a>

        {socialLinks.map((socialLink) => (
          <a
            className={`flex gap-5 items-center hover:translate-y-[1px]`}
            key={socialLink.id}
            href={socialLink.link}
            target="_blank"
            rel="noreferrer"
          >
            {socialLink.id === "nowapp" ? (
              <>
                <div className="px-1 py-[1px]">
                  <Image
                    className="rounded-md"
                    src={socialLink.logo}
                    alt={socialLink.title}
                    width={40}
                    height={40}
                  />
                </div>

                <span>{socialLink.title}</span>
              </>
            ) : (
              <>
                <Image src={socialLink.logo} alt={socialLink.title} />
                <span>{socialLink.title}</span>
              </>
            )}
          </a>
        ))}
      </div>
    </MainLayout>
  );
};
export default Contacts;
