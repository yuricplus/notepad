import { useParams } from "react-router-dom";

function useQuery() {
  return useParams();
}

export { useQuery };