/*
 *  Document    : Layout.js
 *  Author      : Uyarchi
 *  Description : Layout for Admin
 */
import { useRouter } from "next/router";
import Navbar from "./Navbar";
const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <div className="">
        {router.pathname !== "/" &&
        router.pathname !== "/register" &&
        router.pathname !== "/forgotpassword" ? (
          <>
            <main className="">
              <div className="">
                <Navbar path={router.route} />
              </div>
              <div className="flex-grow scrollbar-hide">{children}</div>
            </main>
          </>
        ) : (
          <main>
            <div className="flex-grow scrollbar-hide">{children}</div>
          </main>
        )}
      </div>
    </>
  );
};
export default Layout;
