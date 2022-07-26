import { Link } from "react-router-dom";
import { Menu } from "antd";
import Registervalidation from "./RegisterValidation";

const Register = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <div className="h-screen flex bg-gray-bg1">
          <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-5">
            <div className="text-xl font-medium text-primary text-center pb-6 px-7">
              Create New Account
            </div>
            <div className="px-5">
              <Menu mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1">
                  <Link to="/">
                    <a>Login</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">Sign up</Menu.Item>
              </Menu>
            </div>
            <div className="py-4">
              <Registervalidation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
