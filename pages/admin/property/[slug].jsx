import { useContext, useEffect, useState } from "react";
import {SingleListingBody} from "../../../components/index.js"
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../layout/Layout.js";
import ThingsToKnow from "../../property/ThingsToKnow.js";
import Listing from "../api/Listing.js"

// {listingData,listingID}
const Listings = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [overlay, setOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const [headerSearch, setHeaderSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [record, setrecord] = useState({
    loading: true,
    data: {},
  });

  useEffect(() => {
    if (slug) {
      setLoading(true);
      const main = new Listing();
      main
        .viewproperty(slug || "")
        .then((r) => {
          console.log("r?.data?.data",r?.data?.data)
          setrecord({
            loading: false,
            data: r?.data?.data,
          });
          setLoading(false);
        })
        .catch((err) => {
          setrecord({
            loading: true,
          });
          console.log(err);
          setLoading(false);
        });
    }
  }, [slug]);

  // useEffect(() => {
  //   if (listingData) {
  //     setrecord(listingData);
  //   }
  // }, [listingData]);

  return (
    <>
      <Layout>
        <Head>
          <title>
            House rent in {record?.loading ? "..." : record?.data?.name} -
            QS Jaipur
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
        <SingleListingBody isAdmin={true} loading={loading} listing={record} />
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

export default Listings;

// export async function getServerSideProps(context) {
//   const { listingID } = context.query;
//   const main = new Listings();
//   const listingData = await main.PropertyDetail(listingID);
//   return {
//     props: {
//       listingData: listingData?.data?.data || null,
//       listingID,
//     },
//   };
// }