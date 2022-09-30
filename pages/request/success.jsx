import { useRouter } from "next/router";
import { useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push("/"), 2000);
    return () => clearTimeout(timeout);
  }, [router]);
  return (
    <MainLayout
      title="Ваша заявка отправлена!"
      mainProps="h-[50vh] flex items-center justify-center"
    ></MainLayout>
  );
};

export default Success;
