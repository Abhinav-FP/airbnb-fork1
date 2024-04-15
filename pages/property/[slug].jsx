import { Header, SingleListingBody } from "../../components/index.js";
import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { Context } from "../_app.js";
import Wishlist from "../../components/Wishlist.jsx";
import Layout from "../layout/Layout.js";
import ThingsToKnow from "./ThingsToKnow.js";
import Listings from "../api/laravel/Listings.js";
import Heading from "../elements/Heading.js";

const Listing = ({ record }) => {
  const { wishlist, setWishlist } = useContext(Context);
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(record.loading);
  }, [record.loading]);

  return (
    <>
      <Layout>
        <Head>
          <title>
            House rent in {loading ? "..." : record?.data?.title} -
            Airbnb Clone
          </title>
        </Head>
        {/* <Header
        header="relative"
        width="max-w-[1120px] hidden lg:flex"
        setOverlay={setOverlay}
        selection={selection}
        setSelection={setSelection}
        headerSearch={headerSearch}
        setHeaderSearch={setHeaderSearch}
      /> */}
        <SingleListingBody loading={loading} listing={record} />
        <ThingsToKnow guests={record?.data?.guests} />
        {/* <Footer /> */}
        {overlay && (
          <div
            className="overlayFixed fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-40"
            onClick={() => {
              setSelection(null);
              setOverlay(false);
              setHeaderSearch(false);
            }}
          ></div>
        )}
        {/* {wishlist && <Wishlist setWishlist={setWishlist} />} */}
      </Layout>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  let record = {
    loading: true,
    data: {},
  };

  if (slug) {
    try {
      const main = new Listings();
      const response = await main.PropertyDetail(slug);
      record = {
        loading: false,
        data: response?.data?.data,
      };
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {
      record,
    },
  };
}

export default Listing;
