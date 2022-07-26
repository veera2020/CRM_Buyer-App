import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFields from "../../components/controls/InputFields";
import FormikErrorMessage from "../../components/controls/FormikErrorMessage";
import axios from "../../axios";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate;
  const [otp, setotp] = useState(false);
  const [optvalue, setoptvalue] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [id, setId] = useState("");
  const initialvalue = {
    phoneno: "",
    newpassword: "",
    cpassword: "",
  };
  //formik validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: Yup.object().shape({
      phoneno: Yup.number().min(8).required("Enter Phone Number"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const data = {
        mobileNumber: values.phoneno,
      };
      axios
        .post("/v1/supplier/forgot/password", data)
        .then((res) => {
          console.log(res.data, "submit");
          setotp(true);
          formik.resetForm();
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            seterrorMessage(error.response.data.message);
          }
        });
    },
  });
  const formik1 = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: Yup.object().shape({
      newpassword: Yup.string().required("Enter New Password"),
      cpassword: Yup.string().oneOf(
        [Yup.ref("newpassword"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
      const data = {
        password: values.cpassword,
      };
      axios
        .put(`/v1/supplier/updatePassword/afterOtp/${id}`, data)
        .then((res) => {
          onClose();
          navigate("/");
          formik.resetForm();
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            seterrorMessage(error.response.data.message);
          }
        });
    },
  });
  //verifyotp
  const verifyotp = () => {
    console.log(optvalue);
    const data = {
      otp: optvalue,
    };
    axios
      .post("/v1/supplier/otpVerification/password-change", data)
      .then((res) => {
        console.log(res.data, "submit");
        onOpen();
        setId(res.data._id);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          seterrorMessage(error.response.data.message);
        }
      });
  };
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <div className="h-screen flex bg-gray-bg1">
          <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-5">
            <div className="text-xl font-medium text-primary text-center pb-6 px-7">
              Forgot Password
            </div>
            {errorMessage && (
              <div className="pb-5">
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            {!otp && (
              <>
                <div className="flex flex-col gap-2 px-2">
                  <label className="font-semibold">
                    Enter Your Phone Number or Recovery Account
                    <span className="text-secondary pb-2">*</span>
                  </label>
                  <InputFields
                    type="number"
                    name="phoneno"
                    placeholder="Enter Phone No"
                    value={formik.values.phoneno || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.phoneno && formik.errors.phoneno
                        ? "input-primary ring-2 ring-secondary border-none"
                        : "input-primary"
                    }
                  />
                </div>
                {formik.touched.phoneno && formik.errors.phoneno ? (
                  <FormikErrorMessage>
                    {formik.errors.phoneno}
                  </FormikErrorMessage>
                ) : null}
                <div className="py-3 text-right">
                  <Button onClick={formik.handleSubmit} colorScheme="blue">
                    Next
                  </Button>
                </div>
              </>
            )}
            {otp && (
              <>
                <div className="flex flex-col gap-2 px-2 pt-2">
                  <label className="font-semibold">
                    Enter OTP
                    <span className="text-secondary pb-2">*</span>
                  </label>
                  <InputFields
                    // type="number"
                    // name="otp"
                    placeholder="Enter OTP"
                    //value={formik.values.otp || ""}
                    onChange={(e) => setoptvalue(e.target.value)}
                    onBlur={formik.handleBlur}
                    className="input-primary"
                  />
                </div>
                <div className="py-3 text-right">
                  <Button onClick={() => verifyotp()} colorScheme="blue">
                    verify
                  </Button>
                </div>
              </>
            )}
            <Modal isOpen={isOpen} onClose={onClose} size="xs">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="flex flex-col gap-2 px-2">
                    <label className="font-semibold">
                      New Password
                      <span className="text-secondary pb-2">*</span>
                    </label>
                    <InputFields
                      type="string"
                      name="newpassword"
                      placeholder="Enter New Password"
                      value={formik1.values.newpassword || ""}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                      className={
                        formik1.touched.newpassword &&
                        formik1.errors.newpassword
                          ? "input-primary ring-2 ring-secondary border-none"
                          : "input-primary"
                      }
                    />
                  </div>
                  {formik1.touched.newpassword && formik1.errors.newpassword ? (
                    <FormikErrorMessage>
                      {formik1.errors.newpassword}
                    </FormikErrorMessage>
                  ) : null}
                  <div className="flex flex-col gap-2 px-2 pt-2">
                    <label className="font-semibold">
                      Confirm Password
                      <span className="text-secondary pb-2">*</span>
                    </label>
                    <InputFields
                      type="string"
                      name="cpassword"
                      placeholder="Enter Confirm Password"
                      value={formik1.values.cpassword || ""}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                      className={
                        formik1.touched.cpassword && formik1.errors.cpassword
                          ? "input-primary ring-2 ring-secondary border-none"
                          : "input-primary"
                      }
                    />
                  </div>
                  {formik1.touched.cpassword && formik1.errors.cpassword ? (
                    <FormikErrorMessage>
                      {formik1.errors.cpassword}
                    </FormikErrorMessage>
                  ) : null}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={formik1.handleSubmit} colorScheme="twitter">
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
