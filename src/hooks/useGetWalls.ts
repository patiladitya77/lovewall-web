import { addWalls } from "@/utils/wallSlice";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetWalls = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const getWalls = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + "api/wall/getallwalls/",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.walls);
      dispatch(addWalls(res.data.walls));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWalls();
  }, []);
};
export default useGetWalls;
