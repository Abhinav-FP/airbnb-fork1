import React, { useEffect, useState } from "react";
import Link from "next/link";
import Tiptop1 from "../../public/images/tip-top-1.jpg";
import Image from "next/image";
import axios from "axios";
import { PostBody } from "../../components";

export default function Card() {
  const [categories, setCategories] = useState({
    loading: true,
    data: [],
  });

  const [listings, setListings] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    (async () => {
      setListings({ loading: true, data: [] });
      setCategories({ loading: true, data: [] });
      const { data } = await axios("/api/listings");
      setListings({ loading: false, data: data.data });
      const { data: categoryData } = await axios("/api/categories");
      setCategories({ loading: false, data: categoryData.data });
    })();
  }, []);

  return (
    <div className="tip-top-sec">
      <div className="container">
        <h2>Explore Top-tier Places</h2>
        {/* <div className="row">
          <div className="col-4">
            <div className="banipark-box">
              <Image src={Tiptop1} />
              <div className="flat-info">
                <h5>Golden Oak, Banipark, Jaipur </h5>
                <h3>Banipark Apartment </h3>
                <p>2 bedrooms · 2 bathrooms</p>
                <h4>
                  From <span>₹7,350</span> /night
                </h4>
              </div>
              <div className="explor-btn">
                <Link href="">
                  Explore{" "}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.6069 1.9997L0 10.6066L1.41421 12.0208L10.0211 3.41391V10.9998H12.0208V0H1.02106L1.02106 1.9997H8.6069Z"
                      fill="#DCAC81"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="banipark-box">
              <Image src={Tiptop1} />
              <div className="flat-info">
                <h5>Golden Oak, Banipark, Jaipur </h5>
                <h3>Banipark Apartment </h3>
                <p>2 bedrooms · 2 bathrooms</p>
                <h4>
                  From <span>₹7,350</span> /night
                </h4>
              </div>
              <div className="explor-btn">
                <Link href="">
                  Explore{" "}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.6069 1.9997L0 10.6066L1.41421 12.0208L10.0211 3.41391V10.9998H12.0208V0H1.02106L1.02106 1.9997H8.6069Z"
                      fill="#DCAC81"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="banipark-box">
              <Image src={Tiptop1} />
              <div className="flat-info">
                <h5>Golden Oak, Banipark, Jaipur </h5>
                <h3>Banipark Apartment </h3>
                <p>2 bedrooms · 2 bathrooms</p>
                <h4>
                  From <span>₹7,350</span> /night
                </h4>
              </div>
              <div className="explor-btn">
                <Link href="">
                  Explore{" "}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.6069 1.9997L0 10.6066L1.41421 12.0208L10.0211 3.41391V10.9998H12.0208V0H1.02106L1.02106 1.9997H8.6069Z"
                      fill="#DCAC81"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div> */}

        <PostBody data={listings} />
        <div className="load-more-btn">
          <Link href=" ">Load More</Link>
        </div>
      </div>
    </div>
  );
}