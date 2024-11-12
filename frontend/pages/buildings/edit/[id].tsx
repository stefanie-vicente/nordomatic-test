import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_BUILDING } from "@/graphql/buildingQueries";
import BuildingForm from "@/components/BuildingForm";
import { Loading, Error, NoDataFound } from "@/components/helpers";

const EditBuilding = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_BUILDING, {
    variables: { id: Number(id) },
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!data?.building) return <NoDataFound />;

  return <BuildingForm type={"update"} building={data?.building} />;
};

export default EditBuilding;
