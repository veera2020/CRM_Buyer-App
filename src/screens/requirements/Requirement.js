/*
 *  Document    : Users.js
 *  Author      : uyarchi
 *  Description : User details
 */
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
//components
import Header from "../../components/Layout/Header";
import axios from "../../axios";
//useTable
const useTable = () => {
  const [Loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLimit, setShowLimit] = useState(10);
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  return {
    currentPage,
    showLimit,
    Loading,
    gridApi,
    rowData,
    setCurrentPage,
    setLoading,
    setShowLimit,
    setGridApi,
    setRowData,
  };
};

//function init
const Requirement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //usestate
  const [reload, setreload] = useState(false);
  const [buyerDetails, setbuyerDetails] = useState("");
  //table
  const EmployeeTable = useTable();
  //get employees
  const fetchdata = async (page = 1) => {
    const id = Cookies.get("UserId");
    console.log(id);
    EmployeeTable.setLoading(true);
    const response = await axios.get(
      `/v1/requirementCollectionBS/Buyer/product/data/${id}`
    );
    if (response.status === 200 && response.data) {
      console.log(response.data);
      EmployeeTable.setRowData(response.data);
    } else {
      EmployeeTable.setRowData([]);
    }
  };
  //useEffect
  useEffect(() => {
    fetchdata(EmployeeTable.currentPage, EmployeeTable.showLimit);
  }, [reload, EmployeeTable.currentPage, EmployeeTable.showLimit]);
  const viewproduct = (props) => {
    console.log(props);
    onOpen();
    axios
      .get(`/v1/requirementCollectionBS/Buyer/${props}`)
      .then((res) => setbuyerDetails(res.data[0]));
  };
  return (
    <>
      <Header />
      <div className="p-4 ">
        <div className="flex items-center pb-4">
          <span className="flex-auto text-sky-500 text-xl">
            My Requirements
          </span>
        </div>
        <div className="border-gray-500 scroll-smooth border overflow-y-scroll">
          <Table
            size="sm"
            scaleY="44"
            variant="striped"
            colorScheme="whatsapp"
            className="overflow-auto"
          >
            <Thead className="bg-headergreen">
              <Tr>
                <Th textAlign="center">S.No</Th>
                <Th textAlign="center">Product</Th>
                <Th textAlign="center">Quantity</Th>
                <Th textAlign="center">Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {EmployeeTable.rowData != "" ? null : (
                <Tr>
                  <Td
                    style={{ textAlign: "center" }}
                    className="font-semibold"
                    colSpan="6"
                  >
                    No Data Found
                  </Td>
                </Tr>
              )}
              {EmployeeTable.rowData &&
                EmployeeTable.rowData.map((item, index) => (
                  <Tr key={index}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textAlign="center">
                      <Button
                        variant="link"
                        onClick={() => viewproduct(item._id)}
                      >
                        {item.product}
                      </Button>
                    </Td>
                    <Td textAlign="center">{item.maxrange}</Td>
                    <Td textAlign="center">{item.maxprice}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
        {/* <Pagination
          totalRecord={totalEmp ? totalEmp : 0}
          rowLength={EmployeeTable.rowData ? totalEmp : 0}
          {...EmployeeTable}
        /> */}
        <Modal isOpen={isOpen} onClose={onClose} sixe="xs">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="border border-graycolor cursor-pointer">
                <div className="grid grid-cols-5 px-4">
                  <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
                    Product Name
                  </div>
                  <div className="col-span-4 p-1">{buyerDetails.product}</div>
                </div>
                <div className="grid grid-cols-5 px-4 border-t border-graycolor">
                  <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
                    Quantity Range
                  </div>
                  <div className="col-span-4 p-1">
                    {buyerDetails.minrange} to {buyerDetails.maxrange}
                  </div>
                </div>
                <div className="grid grid-cols-5 px-4 border-t border-graycolor">
                  <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
                    Landing Price
                  </div>
                  <div className="col-span-4 p-1">
                    {buyerDetails.minprice} to {buyerDetails.maxprice}
                  </div>
                </div>
                <div className="grid grid-cols-5 px-4 border-t border-graycolor">
                  <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
                    Stock (Product Delivery)
                  </div>
                  <div className="col-span-4 p-1">
                    {buyerDetails.deliverylocation}
                  </div>
                </div>
                <div className="grid grid-cols-5 px-4 border-t border-graycolor">
                  <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
                    Estimated Delivery Date
                  </div>
                  <div className="col-span-4 p-1">
                    {buyerDetails.deliveryDate}
                  </div>
                </div>
                <div className="grid grid-cols-5 px-4 border-t border-graycolor">
                  <div className="col-span-1 text-blue-500 text-semibold border-r border-graycolor p-1">
                    Estimated Delivery Time
                  </div>
                  <div className="col-span-4 p-1">
                    {buyerDetails.deliveryTime}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
export default Requirement;
