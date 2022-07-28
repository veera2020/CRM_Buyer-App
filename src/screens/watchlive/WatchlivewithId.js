import { useState, useEffect } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Input,
} from "@chakra-ui/react";
import { Badge } from "antd";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Header from "../../components/Layout/Header";
import Livestreaming from "./Livestreaming";
import axios from "../../axios";
import FormikErrorMessage from "../../components/controls/FormikErrorMessage";

const WatchlivewithId = () => {
  const [datas, setdatas] = useState("");
  const [pay, setpay] = useState(false);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    axios.get(`/v1/liveStream/${params.id}`).then((res) => {
      console.log(res.data);
      setdatas(res.data);
    });
  }, []);
  const [wishlistcount, setwishlistcount] = useState(0);
  const [cartcount, setcartcount] = useState(0);
  const navigate = useNavigate();
  const wishlist = () => {
    setwishlistcount(wishlistcount + 1);
  };

  const addcart = () => {
    setcartcount(cartcount + 1);
  };
  //initialvalues
  const initialvalue = {
    quantity: "",
    price: "",
  };
  //formik validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: Yup.object().shape({
      price: Yup.string().required("Enter Price"),
      quantity: Yup.string().required("Enter quantity"),
    }),
    onSubmit: (values) => {
      console.log(datas);
      const data = {
        streamFixedPrice: parseInt(values.price),
        streamFixedQuantity: values.quantity,
        streamAddToCart: cartcount,
        streamInterest: wishlistcount,
      };
      console.log(data);
      axios
        .put(
          `/v1/requirementCollectionBS/Supplier/${datas.requirementID}`,
          data
        )
        .then((res) => {
          console.log(res.data);
          navigate("/wallet");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  });
  return (
    <>
      <Header />
      <div className="p-4">
        <div className="px-2 flex">
          <div className="flex-auto">
            {datas.secretName}- {datas.product}
          </div>
          <div className="">
            <label className="font-semibold mr-2">Quantity:</label>
            {datas.expectedQnty}
          </div>
        </div>
        <div className="border border-gray-800 mt-5 rounded-md ">
          <div className="grid grid-cols-3">
            <div className="col-span-1 border-r border-gray-800 p-2">
              <div className="font-semibold text-sm">Live Chatting</div>
            </div>
            <div className="col-span-1 border-r border-gray-800 p-2">
              <div className="font-semibold text-sm">
                <Livestreaming data={datas} />
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
                  {cartcount ? (
                    <Badge count={cartcount}>
                      <AiOutlineShoppingCart
                        size="20"
                        onClick={() => {
                          setpay(true);
                        }}
                      />
                    </Badge>
                  ) : (
                    <Badge count={cartcount}>
                      <AiOutlineShoppingCart size="20" />
                    </Badge>
                  )}
                </div>
              </div>
              {/* <div className="p-2">
                  <InputFields
              type="string"
              name="buyerpname"
              placeholder="Enter Product Name"
              value={formik.values.buyerpname || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.buyerpname && formik.errors.buyerpname
                  ? "input-primary ring-2 ring-secondary border-none"
                  : "input-primary"
              }
            />
          </div>
          {formik.touched.buyerpname && formik.errors.buyerpname ? (
            <FormikErrorMessage>{formik.errors.buyerpname}</FormikErrorMessage>
          ) : null} */}
              {pay && (
                <>
                  <div className="p-2">
                    <input
                      placeholder="Quantity"
                      type="number"
                      min={datas.minimumlot}
                      max={datas.maximumlot}
                      name="quantity"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.quantity || ""}
                      className={
                        formik.touched.quantity && formik.errors.quantity
                          ? "ring-2 ring-secondary border-none border border-gray-200 w-full focus:outline-none"
                          : "border border-gray-200 w-full focus:outline-none"
                      }
                    />
                  </div>
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <FormikErrorMessage>
                      {formik.errors.quantity}
                    </FormikErrorMessage>
                  ) : null}
                  <div className="flex flex-col items-center p-2">
                    <div className="flex">
                      <Input
                        variant="unstyled"
                        name="price"
                        placeholder="Fixed Price"
                        value={formik.values.price || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.price && formik.errors.price
                            ? "ring-2 ring-secondary border-none border border-gray-200 w-full"
                            : "border border-gray-200 w-full"
                        }
                      />
                    </div>
                    {formik.touched.price && formik.errors.price ? (
                      <FormikErrorMessage>
                        {formik.errors.price}
                      </FormikErrorMessage>
                    ) : null}
                  </div>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={formik.handleSubmit}
                  >
                    Pay
                  </Button>
                </>
              )}
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
      </div>
    </>
  );
};
export default WatchlivewithId;
