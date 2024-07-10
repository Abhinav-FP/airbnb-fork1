import React, { useContext } from "react";
import useWishlist from "../../../hooks/useWishlist";
import { Context } from "../../../pages/_app";
import Link from "next/link";
import Image from "next/image";
import { formatMultiPrice } from "../../../hooks/ValueData";

function List({ post }) {
  const { wishlist } = useContext(Context);
  const [isSaved, changeWishlist] = useWishlist(post, wishlist);
  let record;
  try {
    record = JSON?.parse(JSON?.parse(post?.location));
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  const capitalizeAndReplace = (inputString) => {
    if (!inputString) return "";
    return inputString
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <>
      {post?.uuid ? (
        <Link className="block relative  pb-[20px] h-full" href={`/property/${post?.uuid}`}>

          <div className="bg-white rounded-lg overflow-hidden relative list-gstr overflow-hidden flex">
            <div className="w-4/12 max-h-[300px]">
              {post?.discount_offer ? (
                <div className="absolute bg-[#e0c4c3] -rotate-45 text-white px-2 py-1 w-32 text-center -left-[32px] top-[18px] shadow-[0_0_17px_-5px_#3c3c3c;]">
                  {post?.discount_offer}%  off
                </div>
              ) : (<> </>)}
              <img
                src={post?.property_image[0]?.image_url ? (post?.property_image[0]?.image_url) : ("https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-2000x1333.jpg")}
                alt="Banipark Apartment"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="w-8/12 p-6">
              <div className="flex justify-between">
                  <div>
                    <h2 className="text-[22px] font-[600] text-[#3F2A17] mb-[10px]">  {capitalizeFirstLetter(post?.name)}</h2>
                    
                    <p className="text-[16px] font-[400] text-[#666360] uppercase mb-[15px]"> {record?.location}</p>
                  </div>
                  <div>
                    <h2 className="text-[22px] font-[600] text-[#E0C4C3] mb-[10px]">
                      {formatMultiPrice(post?.price) ? formatMultiPrice(post?.price) : 0}
                      /night
                    </h2>
                  </div>
              </div>
              {/* <div className="price-box">
                <span>{capitalizeAndReplace(post?.type)}</span> 
                <span>{capitalizeAndReplace(post?.properties_type)}</span> 
              </div> */}
              <div className="flex mb-[15px]">
                
                <div className=" mb-2 pr-[20px]">
                  <h3 className="text-[#666360] font-[400] text-[13px]">Bedrooms</h3>
                  <p className="text-[#666360] font-[700] text-[16px]"> {post?.bedrooms} </p>
                </div>
                <div className=" mb-2 pr-[20px] pl-[20px] ml-[20px] border-l">
                  <h3 className="text-[#666360] font-[400] text-[13px]">Bed</h3>
                  <p className="text-[#666360] font-[700] text-[16px]">{post?.beds}  </p>
                </div>
                <div className=" mb-2 pr-[20px] pl-[20px] ml-[20px] border-l">
                  <h3 className="text-[#666360] font-[400] text-[13px]">Guests</h3>
                  <p className="text-[#666360] font-[700] text-[16px]">{post?.guests} </p>
                </div>
                <div className=" mb-2 pr-[20px] pl-[20px] ml-[20px] border-l">
                  <h3 className="text-[#666360] font-[400] text-[13px]">Pets</h3>
                  <p className="text-[#666360] font-[700] text-[16px]">{post?.no_of_pet_allowed} </p>
                </div>
              </div>


              <p className="text-[#666360] text-[16px]">{post?.description}</p>
            </div>
          </div>
        </Link>
      ) : (
        <Link className="block" href={`/properties/${post?.custom_link}`}>

          <div className="bg-white rounded-lg list-gstr overflow-hidden flex">
            <div className="w-4/12 max-h-[300px]">
              {post?.discount_offer ? (
                <div className="absolute bg-[#e0c4c3] -rotate-45 text-white px-2 py-1 w-32 text-center -left-[32px] top-[18px] shadow-[0_0_17px_-5px_#3c3c3c;]">
                  {post?.discount_offer}%  off
                </div>
              ) : (<> </>)}
              <img
                src={post?.property_image[0]?.image_url ? (post?.property_image[0]?.image_url) : ("https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-2000x1333.jpg")}
                alt="Banipark Apartment"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="w-8/12 p-6">
              <h2 className="text-[22px] font-[600] text-[#3F2A17] mb-[10px]">
                {formatMultiPrice(post?.price) ? formatMultiPrice(post?.price) : 0}
                /night
              </h2>
              <h2 className="text-[22px] font-[600] text-[#3F2A17] mb-[10px]">
                {capitalizeFirstLetter(post?.name)}</h2>
              <p className="text-[16px] font-[400] text-[#666360] uppercase mb-[15px]"> {record?.location}</p>

              <div className="flex mb-[15px]">
                <div className=" mb-2 pr-[40px]">
                  <h3 className="text-[#666360] font-[400] text-[13px]">Bedrooms</h3>
                  <p className="text-[#666360] font-[700] text-[16px]"> {post?.bedrooms} </p>
                </div>
                <div className=" mb-2 px-[40px] border-x">
                  <h3 className="text-[#666360] font-[400] text-[13px]">Bed</h3>
                  <p className="text-[#666360] font-[700] text-[16px]">{post?.beds}  </p>
                </div>
                <div className=" mb-2 pl-[40px]">
                  <h3 className="text-[#666360] font-[400] text-[13px]">Guests</h3>
                  <p className="text-[#666360] font-[700] text-[16px]">{post?.guests} </p>
                </div>
                <div className=" mb-2 pl-[40px]">
                  <h3 className="text-[#666360] font-[400] text-[13px]">Pets</h3>
                  <p className="text-[#666360] font-[700] text-[16px]">{post?.no_of_pet_allowed} </p>
                </div>
              </div>

              <p className="text-[#666360] text-[16px]">{post?.description}</p>
            </div>
          </div>
        </Link>
      )}
    </>


  );
}

export default List;