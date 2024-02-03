import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

type Reducer = {
  stock: any;
};

const useFetch = (ticker:string|undefined) => {
  const data = useSelector((state: Reducer) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `http://localhost:8080/market?stock=${ticker}`;
        const resData = await fetch(url);
        if (resData.status === 200) {
          const response = await resData.json();
          dispatch({
            type: "SET_STOCK",
            payload: { ticker, response },
          });
        } else {
          dispatch({
            type: "ERROR",
            payload: "An error occurred. Please try again!",
          });
        }
      } catch (err) {
        dispatch({
          type: "ERROR",
          payload: "An error occurred. Please try again!",
        });
      }
    };
    if (data?.ticker !== ticker) {
      dispatch({ type: "none" });
      getData();
    }
  }, [ticker]);
  
  console.log(data);

  return data;
}
 
export default useFetch;