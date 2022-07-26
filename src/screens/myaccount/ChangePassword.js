/*
 *  Document    : index.js
 *  Author      : Uyarchi
 *  Description : Set New Password
 */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
// Component
import Buttons from "../../components/controls/Buttons";
import Forms from "../../components/controls/Forms";
import axios from "../../axios";
import Header from "../../components/Layout/Header";

const ChangePassword = () => {
  // let UserId = Cookies.get("UserId");
  //usestate
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();
  //Formik InitialValue
  const initialvalue = {
    oldPassword: "",
    newPassword: "",
  };
  //formik validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required("Enter Old Password"),
      newPassword: Yup.string().required("Enter New Password"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      console.log(data);
      axios
        .put(`/v1/supplier/changePassword/data/${Cookies.get("UserId")}`, data)
        .then((res) => {
          console.log(res.data);
          // setLoading(false);
          navigate("/home");
        })
        .catch((error) => {
          if (error.response) {
            setLoading(false);
            seterrorMessage(error.response.data.message);
          }
        });
    },
  });
  return (
    <>
      <Header />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex justify-center">
            Set New Password
          </h1>
        </div>
      </header>
      {errorMessage && (
        <div className="pb-5">
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* <!-- Replace with your content --> */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg ">
              <div className="px-2 py-2">
                <Forms onSubmit={formik.handleSubmit}>
                  <div className="p-4">
                    <label className="font-semibold mb-2">
                      Old Password
                      <span className="text-secondary">*</span>
                    </label>
                    <input
                      name="oldPassword"
                      // autoComplete="on"
                      placeholder="Enter Old Password"
                      // className="input-primary mt-2"
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.touched.oldPassword && formik.errors.oldPassword
                          ? "input-primary ring-2 ring-secondary border-none"
                          : "input-primary"
                      }
                    />
                  </div>
                  <div className="p-4">
                    <label className="font-semibold mb-2">
                      New Password
                      <span className="text-secondary">*</span>
                    </label>
                    <input
                      name="newPassword"
                      // autoComplete="on"
                      placeholder="Enter New Password"
                      // className="input-primary mt-2"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.touched.newPassword && formik.errors.newPassword
                          ? "input-primary ring-2 ring-secondary border-none"
                          : "input-primary"
                      }
                    />
                  </div>
                  <div className="p-4">
                    <Buttons
                      type="submit"
                      className="w-full h-12 rounded-xl bg-primary text-whitecolor font-semibold "
                    >
                      Save
                    </Buttons>
                  </div>
                </Forms>
              </div>
            </div>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </>
  );
};
export default ChangePassword;
