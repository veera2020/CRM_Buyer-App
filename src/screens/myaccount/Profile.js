/*
 *  Document    : Home.js
 *  Author      : Uyarchi
 *  Description : View Single users
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Header from "../../components/Layout/Header";

//components
import axios from "../../axios";
//function init
const Home = (props) => {
  //useState
  const [user, setuser] = useState("");
  const [reload, setreload] = useState(false);
  //router
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    let id = Cookies.get("UserId");
    console.log(id);
    axios
      .get(`/v1/supplier/${id}`)
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="border border-graycolor cursor-pointer py-3">
        <div className="grid grid-cols-5 px-4 p-1">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Secret Name
          </div>
          <div className="col-span-3 p-1">{user.secretName}</div>
        </div>
        <div className="grid grid-cols-5 px-4 p-1">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Trade Name
          </div>
          <div className="col-span-3 p-1">{user.tradeName}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Company Type
          </div>
          <div className="col-span-3 p-1">{user.companytype}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Primary Contact Name
          </div>
          <div className="col-span-3 p-1">{user.primaryContactName}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Primary Contact Number
          </div>
          <div className="col-span-3 p-1">{user.primaryContactNumber}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Secondary Contact Name
          </div>
          {user.secondaryContactName === "" ? (
            <div className="col-span-3 p-1">null</div>
          ) : (
            <div className="col-span-3 p-1">{user.secondaryContactName}</div>
          )}
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Secondary Contact No
          </div>
          {user.secondaryContactNumber === "" ? (
            <div className="col-span-3 p-1">null</div>
          ) : (
            <div className="col-span-3 p-1">{user.secondaryContactNumber}</div>
          )}
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Email
          </div>
          <div className="col-span-3 p-1">{user.email}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            GST No
          </div>
          <div className="col-span-3 p-1">{user.gstNo}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Address
          </div>
          <div className="col-span-3 p-1">{user.RegisteredAddress}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Country
          </div>
          <div className="col-span-3 p-1">{user.countries}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            State
          </div>
          <div className="col-span-3 p-1">{user.state}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            District
          </div>
          <div className="col-span-3 p-1">{user.district}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Pincode
          </div>
          <div className="col-span-3 p-1">{user.pinCode}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Location
          </div>
          <div className="col-span-3 p-1">{user.gpsLocat}</div>
        </div>
        <div className="grid grid-cols-5 px-4 border-t border-graycolor">
          <div className="col-span-2 text-blue-500 text-semibold border-r border-graycolor p-1">
            Products Dealing With
          </div>
          <div className="col-span-3 p-1">{user.productDealingWith}</div>
        </div>
      </div>
    </>
  );
};
export default Home;
