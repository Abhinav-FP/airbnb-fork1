import gsap from "gsap";
import { useEffect, useRef } from "react";
import { AllApartmentLoading } from "../../Loading/ListingsLoading";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";
import NoData from "../../../pages/elements/NoData";
import List from "./List";

const PostBody = ({ listings, loading }) => {
  const child = useRef([]);

  useEffect(() => {
    if (!listings && listings && listings?.length > 0) {
      if (child && child.current) {
        let tl = gsap.timeline();

        tl.fromTo(
          child?.current,
          {
            opacity: 0,
          },
          { opacity: 1, stagger: 0.005 }
        );
      }
    }
  }, [listings]);

  return (
    <div>
      <ul className="lg:flex flex-wrap">
        {loading
          ? Array(4)
              .fill("_")
              .map(() => <AllApartmentLoading />)
          : listings && listings?.length > 0
          ? listings.map((post, i) => (
              <li
                key={post?.id}
                className="w-full mb-5"
                ref={(el) => (child.current[i] = el)}
              >
                {/* <Card /> */}
                <List post={post} />
              </li>
            ))
          : null}
      </ul>
      {/* NoData component outside the flex container */}
      {!loading && (!listings || listings.length === 0) && (
        <div className="w-full">
          <NoData
            Heading={"No Properties Found"}
            content={
              "Sorry for the inconvenience. Click below to go to the home page"
            }
            url={"/"}
          />
        </div>
      )}
    </div>
  );
};

export default PostBody;
