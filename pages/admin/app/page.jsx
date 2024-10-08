"use client";

import CourseProgress from "../components/Cards/CourseProgress.jsx";
import CurrentProject from "../components/Cards/CurrentProject.jsx";
import Bookings from "../components/Cards/Bookings.jsx";
import Reviews from "../components/Cards/Reviews.jsx";
import TopProperty from "../components/Cards/TopProperty.jsx";
import UserList from "../components/Cards/UserList.jsx";
import TraningAnalysis from "../components/Cards/TraningAnalysis";
import Sidebar from "../components/Sidebar";
import Listing from "../api/Listing";
import MetaTag from "../hook/Metatag";

import AdminLayout from "../AdminLayout";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarChange = (value) => {
    setIsSidebarOpen(value);
  };

  const [record, setRecord] = useState([]);



  const fetchData = (signal) => {
    const main = new Listing();
    main
      .statistics()
      .then((r) => {
        setRecord(r?.data);
        setLoading(false);

      })
      .catch((error) => {
        if (signal.aborted) {
          console.log("Fetch aborted");
        } else {
          console.log("Error fetching data:", error);
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => controller.abort();
  }, []);

  return (
    <>
      <MetaTag />
      <AdminLayout>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${isSidebarOpen ? "overflow-hidden" : ""} h-screen`}
        >
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsSidebarOpen(false)}
                className="bg-black/60 absolute top-0 left-0 md:hidden w-full h-screen z-20"
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
                className="absolute md:hidden z-30 top-0 left-0"
              >
                <Sidebar />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex">
            <div className="w-full ">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                <div>
                  <div className="break-inside-avoid-column mb-4">
                    <CourseProgress />
                  </div>
                  <div className="break-inside-avoid-column mb-4">
                    <TopProperty property_count={record?.property} />
                  </div>
                  <div className="break-inside-avoid-column mb-4">
                    <CurrentProject />
                  </div>
                  <div className="break-inside-avoid-column mb-4">
                    <Bookings />
                  </div>
                </div>
                <div>
                  <div className="break-inside-avoid-column mb-4">
                    <Reviews />
                  </div>
                  <div className="break-inside-avoid-column mb-4">
                  <UserList totaluser={record?.user?.total_user} />
                </div>
                </div>
                
                

               

                
              </div>
            </div>
          </div>
        </motion.div>
      </AdminLayout>
    </>
  );
}

export default Home;
