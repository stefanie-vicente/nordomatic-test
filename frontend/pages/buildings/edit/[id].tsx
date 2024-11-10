import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_BUILDING } from "@/graphql/buildingQueries";
import BuildingForm from "@/components/BuildingForm";

const EditBuilding = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_BUILDING, {
    variables: { id: Number(id) },
  });

  return <BuildingForm type={"update"} building={data?.building} />;
};

export default EditBuilding;
