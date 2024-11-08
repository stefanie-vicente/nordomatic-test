import { useQuery } from "@apollo/client";
import { GET_BUILDING } from "@/graphql/buildingQueries";

const Building = () => {
  const { data, loading, error } = useQuery(GET_BUILDING, {
    variables: { id: 6 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Building</h2>
      <p>{data.building.address}</p>
    </div>
  );
};

export default Building;
