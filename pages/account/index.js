import React, { useContext } from "react";
import Heading from "../elements/Heading";
import Button from "../elements/Button";
import Link from "next/link";
import AuthLayout from "../layout/AuthLayout";
import { Context } from "../_app";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";

export default function Index() {
  const { setAuth } = useContext(Context);
  const router = useRouter();

  const handleLogout = () => {
    localStorage && localStorage.removeItem("token");
    setAuth(null);
    toast.success("Logout Successfully !!");
    router.push("/login");
  };

  return (
    <AuthLayout>
      <Head>
        <title>My Account - Quaint Spaces Jaipur</title>
      </Head>

      <div className="container mx-auto account-btn ">
        <div className="flex justify-between items-center pt-12">
          <div className="flex sm:pe-3 flex-wrap items-center">
            <div className="flex items-center ">
              <div
                className="flex cursor-pointer justify-center items-center h-10 w-10 rounded-full border border-gray-800"
                style={{ color: "#000" }}
                onClick={() => { router.back(-1); }}
              >
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ color: "#000" }}
                  role="presentation"
                  focusable="false"
                  className="h-5 w-5 stroke-current"
                >
                  <g fill="none">
                    <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136L20 4"></path>
                  </g>
                </svg>
              </div>
              <h2
                className="sm:text-3xl text-lg font-medium ml-4 text-bold"
                style={{ color: "#3F2A17" }}
              >
                Account
              </h2>
            </div>
          </div>
          <Button
            text={"Logout"}
            onClick={handleLogout}
            design={
              "font-inter text-base font-medium leading-tight text-center w-52 p-4 rounded-full uppercase bg-[#efa3a3] text-[#fff] border border-[#efa3a3] hover:text-[#efa3a3] hover:bg-[#ffffff00]"
            }
          />
        </div>
      </div>
      <div className="container mx-auto mb-6">
        {[
          { title: "My Booking", description: "Manage all your booking here", href: "/booking-history" },
          { title: "My Profile", description: "Manage your profile here", href: "/profile" },
          { title: "Security", description: "Manage your password here", href: "/security" },
        ].map((item, index) => (
          <div key={index} className="border-b border-gray-200 py-6 sm:py-10 md:py-14">
            <div className="flex flex-col sm:flex-row justify-between booking-more">
              <div className="flex items-center text-left">
                <svg
                  width="34px"
                  height="34px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#efa3a3] stroke-current"
                >
                  <path
                    d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                    stroke="#efa3a3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="ml-5 booking-manage-box text-left">
                  <h1 className="text-lg font-semibold">{item.title}</h1>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex-shrink-0 self-end sm:self-start">
                <Link href={item.href} className="flex items-center border-b-2 border-[#efa3a3] text-sm text-[#efa3a3] hover:text-[#d17575]">
                  <p className="mr-2">View More</p>
                  
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.95032 6.364L0.000320435 11.314L1.41432 12.728L7.77832 6.364L1.41432 -3.8147e-06L0.000320435 1.414L4.95032 6.364Z"
                      fill="#efa3a3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AuthLayout>
  );
}
