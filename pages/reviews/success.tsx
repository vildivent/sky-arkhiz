import { useRouter } from "next/router";
import { useEffect } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push("/"), 2000);
    return () => clearTimeout(timeout);
  }, [router]);
  return (
    <MainLayout
      title="Ваш отзыв оставлен и находится на проверке!"
      mainProps="h-[50vh] flex items-center justify-center"
    ></MainLayout>
  );
};

export default Success;
