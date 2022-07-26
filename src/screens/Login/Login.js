import { Link } from "react-router-dom";
import { Menu } from "antd";
import Loginvalidation from "./LoginValidation";
export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <div className="h-screen flex bg-gray-bg1">
          <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-5">
            <div className="text-xl font-medium text-primary text-center pb-6 px-7">
              Buyer App Login
            </div>
            <div className="px-5">
              <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">Login</Menu.Item>
                <Menu.Item key="2">
                  <Link to="/register">Sign up</Link>
                </Menu.Item>
              </Menu>
            </div>
            <div className="py-4">
              <Loginvalidation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
