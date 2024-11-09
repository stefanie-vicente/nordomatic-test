import { useRouter } from "next/router";
import Building from "@/components/Building";

const BuildingPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Building id={Number(id)} />;
};

export default BuildingPage;
