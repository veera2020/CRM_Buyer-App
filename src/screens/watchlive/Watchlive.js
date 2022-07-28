// import { useState } from "react";
// import {
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper,
//   Button,
// } from "@chakra-ui/react";
// import { Badge } from "antd";
// import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import Header from "../../components/Layout/Header";
// import Livestreaming from "./Livestreaming"
import { useState, useEffect } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { Badge } from "antd";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Livestreaming from "./Livestreaming";
import axios from "../../axios";
const Watchlive = () => {
  const [data, setdata] = useState("");
  // const [cartcount, setcartcount] = useState(0);
  // const navigate = useNavigate();
  // const wishlist = () => {
  //   setwishlistcount(wishlistcount + 1);
  // };

  // const addcart = () => {
  //   let count = 0;
  //   setcartcount(cartcount);
  //   console.log(cartcount);
  // };
  // const [data, setdata] = useState("");
  // const [id, setid] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const a = Cookies.get("UserId");
    // axios
    //   .get(`/v1/liveStream/getAll/token/approved/supplierData/${a}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setdata(res.data);
    //   });
    axios.get(`/v1/liveStream/getAll/token/approved/buyer/${a}`).then((res) => {
      console.log(res.data);
      setdata(res.data);
    });
  }, []);
  const routeChange = (props) => {
    let path = `newPath/${props}`;
    navigate(path);
  };
  const golive = (props) => {
    const data = {
      streaming: "Online",
    };
    axios.put(`/v1/liveStream/${props}`, data).then((res) => {
      routeChange(props);
      console.log(res.data);
    });
  };
  return (
    <>
      <Header />
      {data.length === 0 && (
        <div className="p-4">Products are Not matched for live streaming</div>
      )}
      <div className="grid grid-cols-5 p-4 gap-3">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="col-span-1 h-24 bg-gray-500 rounded-lg flex flex-col justify-center items-center"
              onClick={() => {
                golive(item._id);
              }}
            >
              <span className="">
                {item.product} - {item.expectedQnty}Kg
              </span>
              <div className="">{item.liveStreamDate}</div>
              <div className="">{item.liveStreamTime}</div>
            </div>
          ))}
      </div>
      {/* <div className="p-4">
        <div className="border border-gray-800 mt-5 rounded-md ">
          <div className="grid grid-cols-3">
            <div className="col-span-1 border-r border-gray-800 p-2">
              <div className="font-semibold text-sm">Live Chatting</div>
            </div>
            <div className="col-span-1 border-r border-gray-800 p-2">
              <div className="font-semibold text-sm">
                <Livestreaming />
              </div>
            </div>
            <div className="col-span-1 p-5">
              <div className="flex gap-2">
                <div className="font-semibold text-sm flex-auto">
                  <Badge count={wishlistcount}>
                    <AiOutlineHeart size="20" />
                  </Badge>
                </div>
                <div className="font-semibold text-sm">
                  <Badge count={cartcount}>
                    <AiOutlineShoppingCart size="20" />
                  </Badge>
                </div>
              </div>
              <div className="p-2">
                <NumberInput defaultValue={0} min={0} max={200}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => navigate("/wallet")}
              >
                Pay
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-4 py-2">
          <Button size="sm" colorScheme="blue" onClick={() => wishlist()}>
            I'm Interested
          </Button>
          <Button size="sm" colorScheme="teal" onClick={() => addcart()}>
            Add Cart
          </Button>
        </div>
      </div> */}
    </>
  );
};
export default Watchlive;
