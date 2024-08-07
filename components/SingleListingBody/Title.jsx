import React from "react";
import Heart from "../../public/_svgs/Heart";
import Star from "../../public/_svgs/star";
import Upload from "../../public/_svgs/upload";
import Back from "../common/Back";
import Link from "next/link";
import { useRouter } from "next/router";

const Title = ({ isSaved, listing, loading, isAdmin }) => {
  const router = useRouter();
  const { slug } = router.query;
  function capitalizeFirstLetter(str) {
    // Split the string into words
    const words = str?.split(" ");
    
    // Capitalize the first letter of each word
    const capitalizedWords = words?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1));
  
    // Join the words back together
    return capitalizedWords?.join(" ");
  }

  return (
    <>
      
          <div className="mt-2 flex justify-between flex-wrap ">
            <div className="flex flex-wrap items-center mt-4 sm:mt-0 mb-2">
              <div className="backtag"></div>
              <Back />
              <span className="text-xl sm:text-2xl lg:text-3xl">
                {capitalizeFirstLetter(listing?.data?.name)}
              </span>
            </div>
          

          {isAdmin ? (
              <Link className="filter btn w-auto mb-2 w-36 sm:w-40 hover:bg-[#fff] hover:text-[#efa3a3] border-2 bg-color-[#efa3a3] border-[#efa3a3]"       href={`/admin/property/edit/${slug}`} >
                Edit Property
              </Link>
          ) : null }
          </div>
        </>
  );
};

export default Title;
