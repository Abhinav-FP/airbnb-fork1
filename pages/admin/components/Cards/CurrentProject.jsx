import Image from "next/image";
import {
  WalletMoney,
  Clock,
  DocumentText,
  Flash,
  InfoCircle,
} from "iconsax-react";
import AtlassianLogo from "../assets/logos/atlassian.svg";
import Avatar1 from "../assets/avatars/avatar1.png";
import Avatar2 from "../assets/avatars/avatar2.png";
import Avatar3 from "../assets/avatars/avatar3.png";
import Avatar4 from "../assets/avatars/avatar4.png";
import { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import Link from "next/link";
import { formatMultiPrice } from "../../../../hooks/ValueData";
import DashboardNoData from "../../hook/DashboardNoData";

function CurrentProject() {
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(true);
  const [toppayemnt, settoppayment] = useState()

  const fetchData = (signal) => {
    const main = new Listing();
    main
      .Top3Payments()
      .then((r) => {
        setRecord(r?.data?.data);
        settoppayment(r?.data?.total_payment_count);
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
      {loading ? (
        <div className="border bg-gray-100 h-[30vh] w-full p-3 rounded-2xl "></div>
      ) : (
        <div className="border text-gray-500 w-full p-3 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm gap-2">
              <WalletMoney size={18} />
              <p className="text-gray-800 font-medium">Recent Payment</p>
            </div>
            <Link
              href="/admin/payment-history"
              className="border px-2 py-1 rounded-lg text-xs"
            >
              See all ({toppayemnt})
            </Link>
          </div>

          <hr className="bg-gray-400 my-4" />

          <div className="space-y-3">
            {record && record?.length > 0 ?
              record &&
              record?.map((item) => (
                <div className="space-y-3 pb-3 border-b last:border-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 img-book">
                        <img
                          src={item?.propertyImage || "/images/profile-no-image.jpg"}
                          alt="loom"
                          className="rounded-full"
                        />
                        <div className="font-medium">
                          <div className="flex space-x-2 justify-between">
                            <p className="text-xs text-gray-800">
                              {item?.userName}
                            </p>
                          </div>
                          <p className="text-xs text-gray-600 capitalize">
                            {item?.propertyName}{" "}
                          </p>

                          <p className="text-xs text-gray-500">
                            {" "}
                            {formatMultiPrice(item?.price)} ||{" "}
                            {item?.payment_date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              :
              <DashboardNoData />
            }

          </div>
        </div>
      )}
    </>
  );
}

export default CurrentProject;
