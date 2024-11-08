import { useQuery } from "@apollo/client";
import { GET_BUILDINGS } from "../graphql/buildingQueries";

const BuildingList = () => {
  const { data, loading, error } = useQuery(GET_BUILDINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Building List</h2>
      <ul>
        {data.buildings.map(
          (building: { id: string; name: string; address: string }) => (
            <li key={building.id}>
              {building.name} - {building.address}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default BuildingList;
