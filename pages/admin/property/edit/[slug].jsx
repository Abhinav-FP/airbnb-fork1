import React, { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import Property from "../add/Property"
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import { RiDoorLockBoxLine } from "react-icons/ri";
import { MdOutlineFreeBreakfast, MdOutlineKeyboardAlt, MdPhonelinkLock } from "react-icons/md";
import { House, Add } from "iconsax-react";
import {
  FaBuilding,
  FaHome,
  FaWarehouse,
  FaDoorOpen,
  FaHotel,
  FaBed,
  FaCouch,
} from "react-icons/fa";
import Guest from "../add/Guest";
import CancelPolicy from "../add/CancelPolicy";
import HouseRules from "../add/HouseRules";
import Amenities from "../add/Amenities";
import Checkout from "../add/Checkout";
import axios from "axios";

const propertyTypes = [
  { value: "flat", label: "Flat & Apartment" },
  { value: "house", label: "House" },
  { value: "unique_space", label: "Unique Space" },
  { value: "guest_house", label: "Guest House" },
  { value: "hotel", label: "Hotel" },
  { value: "single_room", label: "Single Room" },
  { value: "boutique_hotel", label: "Boutique Hotel" },
  { value: "farm", label: "Farm" },
  { value: "breakfast", label: "Bed & Breakfast" },
];

export default function Edit() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [editguide, setEditguide] = useState("space");
  const [record, setRecord] = useState({
    loading: true,
    data: {},
  });

  console.log("record", record)

  const fetchProperty = async (slug) => {
    if (slug) {
      setLoading(true);
      const main = new Listing();
      try {
        const response = await main.viewproperty(slug || "");
        setRecord({
          loading: false,
          data: response?.data?.data,
        });
      } catch (err) {
        setRecord({
          loading: true,
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProperty(slug);
  }, [slug]);

  function stringToArray(inputString) {
    return inputString.split(",");
  }
  console.log("record", record);

  const useExistingImages = true;
  const isEdit = true;
  useEffect(() => {
    if (!record.loading) {
      setItem({
        Guests: record?.data?.guests || "",
        name: record?.data?.name || "",
        about: record?.data?.description || "",
        propertytype: record?.data?.property_type || "flat",
        customLink: record?.data?.custom_link || "",
        price: record?.data?.price || "",
        discount: record?.data?.discount_offer || "",
        Direction: record?.data?.property_rule?.direction || "",
        wifi: record?.data?.property_rule?.wifi_username || "",
        additonalrule: record?.data?.property_rule?.additional_rules || "",
        wifiPassword: record?.data?.property_rule?.wifi_password || "",
        housemanual: record?.data?.property_rule?.house_manuals || "",
        location: record?.data?.address || "",
        extra_guest: record?.data?.extra_guest_fee || "",
        pet: record?.data?.pet_fee || "",
        cleaning: record?.data?.cleaning_fee || ""
      });
      setImagesproperty(record?.data?.property_image || [])
      setGuests(record?.data?.guests || 1)
      setBeds(record?.data?.beds || 1)
      setBeds(record?.data?.beds || 1)
      setBathrooms(record?.data?.bathrooms || 0.5)
      setBedrooms(record?.data?.bedrooms || 1)
      setPType(record?.data?.property_type || "flat");
      setSelectedPolicy(record?.data?.property_rule?.standard_policy)
      setPetsAllowed(record?.data?.property_rule?.pet_allowed || 0);
      setEventsAllowed(record?.data?.property_rule?.events_allowed || 0);
      setSmokingAllowed(record?.data?.property_rule?.smoking_allowed || 0);
      setQuietHours(record?.data?.property_rule?.quiet_hours_allowed || 0);
      setPhotographyAllowed(record?.data?.property_rule?.photography_allowed || 0);
      setPets(record?.data?.property_rule?.pet_allowed || 0);
      setLongTermPolicy(record?.data?.property_rule?.long_term_policy);
      setCheckinStart(record?.data?.check_in || "00:00");
      setCheckinquiet(record?.data?.property_rule?.quite_hours_in_time || "00:00")
      setCheckoutquiet(record?.data?.property_rule?.quite_hours_out_time || "00:00")
      setSelectedAmenity(record?.data?.amenities ? (stringToArray(record?.data?.amenities)) : []);
      setstandoutAmenity(record?.data?.standout_amenity ? (stringToArray(record?.data?.standout_amenity)) : [])
      setAmenity(record?.data?.safety_amenity ? (stringToArray(record?.data?.safety_amenity)) : [])
      setCheckinEnd(record?.data?.flexible_check_in || "flexible");
      setCheckout(record?.data?.check_out || "00:00");
      setSelectedMethod(record?.data?.check_in_method || "smartlock");
      setcheckdescrtion(record?.data?.check_in_description || "");
      setselecbhktype(record?.data?.bhk_type || null);
      setTypeHere(record?.data?.type || "entire_place");
      setSelectedOption(record?.data?.status || 0);
    }
  }, [record]);
  const [typeHere, setTypeHere] = useState();

  const [selectedOption, setSelectedOption] = useState();
  const handleOptionChange = (event) => {
    const option = parseInt(event.target.value, 10);
    setSelectedOption(selectedOption === option ? "" : option);
  };
  const [selectedInstruction, setSelectedInstruction] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [text, setText] = useState("");
  const [selectedMethod, setSelectedMethod] = useState();
  const [checkdescrtion, setcheckdescrtion] = useState();
  const [checkoutInstructions, setCheckoutInstructions] = useState([]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setcheckdescrtion("");
  };

  const handlecheckChange = (e) => {
    setcheckdescrtion(e.target.value);
  };

  const [item, setItem] = useState({
    about: "",
    propertytype: "",
    name: "",
    Guests: "",
    Beds: "",
    Bedrooms: "",
    Bathrooms: "",
    customLink: '',
    discount: '',
    price: '',
    Direction: "",
    wifi: "",
    wifiPassword: "",
    housemanual: "",
    cleaning: "",
    pet: "",
    extra_guest: ""
  });
  console.log("location",record?.data?.location )
  const lstring = record?.data?.location ? JSON.parse(record?.data?.location?.replace('/\\/g', '"')) : null;
  console.log("lstring",lstring)
  
  const l = JSON.parse(lstring);
  console.log("l",l)


  const [address, setAddress] = useState({
    street_address: l?.street_address,
    flat_house: l && l.flat_house ? l.flat_house : "",
    district: l && l.district ? l.district : "",
    nearby: l && l.nearby ? l.nearby : "",
    city: l && l.city ? l.city : "",
    state: l && l.state ? l.state : "",
    pin: l && l.pin ? l.pin : "",
    location: l && l.location ? l.location : "",
    latitude: l && l.latitude ? l.latitude : "",
    longitude: l && l.longitude ? l.longitude : "",
  });

  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  const [locationupdate, setLocationupdate] = useState([]);
  const getNavigator = () => {
    if (typeof navigator !== "undefined") {
      return navigator;
    } else {
      console.error("navigator is not available");
      return null;
    }
  };
  const [loadinglocation, setLoadinglocation] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [locationName, setLocationName] = useState("");
  const [infoWindow, setInfoWindow] = useState(null); // For handling InfoWindow instance
  const [map, setMap] = useState(null);


  const fetchLocationData = async () => {
    if (loadinglocation) {
      return;
    }
    setLoadinglocation(true);
    const navigatorObj = getNavigator();

    if (navigatorObj && navigatorObj.geolocation) {
      navigatorObj.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            let locationData;
            if (!isEdit) {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              locationData = response.data;
            } else {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${address?.latitude}&lon=${address?.longitude}&format=json`
              );
              locationData = response.data;
              setLocationupdate(locationData?.address);
            }
            setAddress({
              location: locationData.display_name,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
              street_address:
                locationData?.address?.road || locationupdate?.road,
              district:
                locationData?.address?.state_district ||
                locationupdate?.state_district,
              nearby: locationData?.address?.suburb || locationupdate?.suburb,
              city: locationData?.address?.city || locationupdate?.city,
              state: locationData?.address?.state || locationupdate?.state,
              pin: locationData?.address?.postcode || locationupdate?.postcode,
            });
            setMarkerPosition({
              lat: latitude,
              lng: longitude,
            });
            setCenter({
              lat: latitude,
              lng: longitude,
            });
            setLocationName(locationData.display_name);
            setLoadinglocation(false);
          } catch (error) {
            setLoadinglocation(false);
            console.log("Error fetching data:", error);
          }
        },
        () => {
          setLoadinglocation(false);
          console.log("Geolocation failed");
        }
      );
    }
  };

  const fetchLocation = async () => {
    const formattedAddress = `${address.street_address}, ${address.nearby}, ${address.district}, ${address.city}, ${address.state}, ${address.pin}`;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formattedAddress
        )}&key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58`
      );
      const { results } = response.data;
      if (results && results.length > 0) {
        setMarkerPosition({
          lat: results[0]?.geometry?.location?.lat,
          lng: results[0]?.geometry?.location?.lng,
        });
        setCenter({
          lat: results[0]?.geometry?.location?.lat,
          lng: results[0]?.geometry?.location?.lng,
        });
        setAddress({
          ...address,
          location: results[0]?.formatted_address,
          latitude: results[0]?.geometry?.location?.lat,
          longitude: results[0]?.geometry?.location?.lng,
        });
        setLocationName(results[0].formatted_address);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [markerPosition]);

  const initializeMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 16, // Higher zoom level
      center: markerPosition,
    });

    const marker = new window.google.maps.Marker({
      position: markerPosition,
      map: map,
      draggable: true,
    });

    // Initialize InfoWindow
    const infoWindow = new window.google.maps.InfoWindow({
      content: locationName,
    });

    // Set InfoWindow instance to state
    setInfoWindow(infoWindow);

    // Show location info when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(locationName);
      infoWindow.open(map, marker);
    });

    // Update marker position and address on drag end
    window.google.maps.event.addListener(marker, "dragend", function (event) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      setMarkerPosition({ lat: newLat, lng: newLng });
      setCenter({ lat: newLat, lng: newLng });

      // Fetch the new address
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?lat=${newLat}&lon=${newLng}&format=json`
        )
        .then((response) => {
          const locationData = response.data;
          setAddress((prev) => ({
            ...prev,
            location: locationData.display_name,
            latitude: newLat,
            longitude: newLng,
            street_address: locationData?.address?.road || "",
            district: locationData?.address?.state_district || "",
            nearby: locationData?.address?.suburb || "",
            city: locationData?.address?.city || "",
            state: locationData?.address?.state || "",
            pin: locationData?.address?.postcode || "",
          }));
          setLocationName(locationData.display_name); // Update the location name
          infoWindow.setContent(locationData.display_name); // Update the info window content
        })
        .catch((error) => {
          console.error("Error fetching new address:", error);
        });
    });
  };

  const options = [
    {
      item: "smartlock",
      data: "Guests will use a code or app to open a wifi-connected lock.",
      icon: <MdPhonelinkLock size={24} />,
    },
    {
      item: "keypad",
      data: "Guests will use the code you provide to open an electronic lock.",
      icon: <MdOutlineKeyboardAlt size={24} />,
    },
    {
      item: "lockbox",
      data: "Guests will use a code you provide to open a small safe that has a key inside.",
      icon: <RiDoorLockBoxLine size={24} />,
    },
    {
      item: "staff",
      data: "Someone will be available 24 hours a day to let guests in.",
      icon: <GrUserWorker size={24} />,
    },
  ];
  const [selectedAmenity, setSelectedAmenity] = useState();
  // 
  const [checkinEnd, setCheckinEnd] = useState();
  // 
  const [checkout, setCheckout] = useState();


  const [Amenity, setAmenity] = useState();
  const [standoutAmenity, setstandoutAmenity] = useState();
  const [Guests, setGuests] = useState();
  const [Beds, setBeds] = useState();
  const [Bathrooms, setBathrooms] = useState();

  const [Bedrooms, setBedrooms] = useState();
  const [pets, setPets] = useState();
  const [checkinStart, setCheckinStart] = useState();
  const [checkinquet, setCheckinquiet] = useState(
  );
  const [checkoutquet, setCheckoutquiet] = useState(
  );

  const [PType, setPType] = useState(record?.data?.property_type || "flat");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const [selectbooking, setSelectedbooking] = useState('instant');
  const handleBookingChange = (option) => {
    setSelectedbooking(option);
  };

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [longTermPolicy, setLongTermPolicy] = useState(null);
  const [showFlexible, setShowFlexible] = useState(true);
  const [showFirm, setShowFirm] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(

  );
  const [eventsAllowed, setEventsAllowed] = useState(
  );
  const [smokingAllowed, setSmokingAllowed] = useState(
  );
  const [quietHours, setQuietHours] = useState(
  );
  const [PhotographyAllowed, setPhotographyAllowed] = useState(
  );
  
 
  const baseurl = "https://quant-stay.vercel.app/properties/";
  const fulllink = baseurl + item?.customLink;
  const handleFileChange = async (e) => {
    let files = Array.from(e?.target?.files);
    setImages([...images, ...files]);
  };

  const removeImage = (f) => {
    const filteredImages = images.filter((file) => file !== f);
    setImages(filteredImages);
  };

  const moveImageToFront = (index) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages?.splice(index, 1);
    updatedImages?.unshift(movedImage);
    setImages(updatedImages);
  };

  const moveImageBackward = (index) => {
    if (index < images?.length - 1) {
      const updatedImages = [...images];
      [updatedImages[index], updatedImages[index + 1]] = [
        updatedImages[index + 1],
        updatedImages[index],
      ];
      setImages(updatedImages);
    }
  };

  const moveImageForward = (index) => {
    if (index > 0) {
      const updatedImages = [...images];
      [updatedImages[index], updatedImages[index - 1]] = [
        updatedImages[index - 1],
        updatedImages[index],
      ];
      setImages(updatedImages);
    }
  };

  const handleAction = (action, index) => {
    if (action === "remove") removeImage(images[index]);
    if (action === "makeCover") moveImageToFront(index);
    if (action === "moveForward") moveImageForward(index);
    if (action === "moveBackward") moveImageBackward(index);
  };
  const [images, setImages] = useState([]);

  const handleDrag = (ev) => {
    setDragId(ev?.currentTarget?.id);
  };
  const copyToClipboard = () => {
    const textToCopy = `${baseurl}${item?.customLink}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => { })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleTabClick = (value) => {
    setEditguide(value);
  };

  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? 0 : index);
  };

  const handleOver = (ev) => {
    ev.preventDefault();
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragImage = images?.find((image) => image.name === dragId);
    const dropImage = images?.find(
      (image) => image.name === ev.currentTarget.id
    );
    const dragIndex = images?.indexOf(dragImage);
    const dropIndex = images?.indexOf(dropImage);
    const updatedImages = [...images];
    updatedImages?.splice(dragIndex, 1);
    updatedImages?.splice(dropIndex, 0, dragImage);
    setImages(updatedImages);
  };

  const [imageproperty, setImagesproperty] = useState();

  const deletePropertyImage = (recordUUID, itemUUID) => {
    const main = new Listing();
    main
      .propertyImagedelete(recordUUID, itemUUID)
      .then((response) => {
        toast.success(response.data.message);
        setImagesproperty(
          imageproperty.filter((item) => item.uuid !== itemUUID)
        );
        property_image.filter((item) => item.uuid !== itemUUID);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const DropdownMenu = ({ index, isFirst, isLast }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleActionClick = (action) => {
      handleAction(action, index);
      setIsOpen(false);
    };

    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-white text-xl text-black rounded-lg px-2 py-1 mx-1 mt-1 shadow-lg"
        >
          <BsThreeDotsVertical />
        </button>
        {isOpen && (
          <ul className="absolute text-sm right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <li
              className="cursor-pointer px-2 py-2 hover:bg-gray-200"
              onClick={() => handleActionClick("remove")}
            >
              Remove
            </li>
            {!isFirst && (
              <>
                <li
                  className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                  onClick={() => handleActionClick("makeCover")}
                >
                  Make Cover
                </li>
                <li
                  className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                  onClick={() => handleActionClick("moveForward")}
                >
                  Move Forward
                </li>
              </>
            )}
            {!isLast && (
              <li
                className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                onClick={() => handleActionClick("moveBackward")}
              >
                Move Backward
              </li>
            )}
          </ul>
        )}
      </div>
    );
  };

  useEffect(() => { }, [images]);

  const [selecbhktype, setselecbhktype] = useState();

  const handleselecbhktype = (option) => {
    setselecbhktype(option);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const main = new Listing();
    const formData = new FormData();
    formData.append("type", typeHere);
    formData.append("properties_type", PType);
    formData.append("name", item?.name);
    formData.append("no_of_pet_allowed", pets);
    formData.append("description", item?.about);
    formData.append("price", item?.price);
    formData.append("bedrooms", Bedrooms);
    formData.append("bathrooms", Bathrooms);
    formData.append("guests", Guests);
    formData.append("beds", Beds);
    formData.append("custom_link", item?.customLink);
    formData.append("address", JSON.stringify(address));
    formData.append("amenities", selectedAmenity);
    formData.append("standout_amenity", standoutAmenity);
    formData.append("safety_amenity", Amenity);
    formData.append("cleaning_fee", item?.cleaning);
    formData.append("extra_guest_fee", item?.extra_guest);
    formData.append("pet_fee", item?.pet);
    formData.append("flexible_check_in", checkinEnd);
    formData.append("check_in", checkinStart);
    formData.append("bhk_type",selecbhktype)
    formData.append("check_out", checkout);
    formData.append("status", selectedOption);
    formData.append("standard_policy", selectedPolicy);
    formData.append("wifi_username", item?.wifi);
    formData.append("wifi_password", item?.wifiPassword);
    formData.append("long_term_policy", longTermPolicy);
    formData.append("house_manuals", item?.housemanual);
    formData.append("pet_allowed", petsAllowed);
    formData.append("events_allowed", eventsAllowed);
    formData.append("direction", item?.Direction);
    formData.append("smoking_allowed", smokingAllowed);
    formData.append("quiet_hours_allowed", quietHours);
    formData.append("photography_allowed", PhotographyAllowed);
    formData.append("additional_rules", item?.additonalrule);
    formData.append("quite_hours_in_time", checkinquet);
    formData.append("quite_hours_out_time", checkoutquet);
    formData.append("check_in_description", checkdescrtion);
    formData.append("check_in_method", selectedMethod);
    formData.append(
      "check_out_instruction",
      JSON.stringify(checkoutInstructions)
    );
    formData.append("discount_offer", item?.discount);

    images.forEach((image, index) => {
      formData.append("property_image[]", image);
    });
    const response =
      main.propertyedit(slug, formData)
    response
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message);
           fetchProperty();
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        ("error", error);
      });
  }


  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            {loading ? (
              <div className="flex justify-center">
                <p>Loading...</p>
              </div>
            ) : (
              <>
                {/* <Property
                  fetchProperties={() => fetchProperty(slug)}
                  isEdit={true}
                  stepdata={false}
                  p={record.data}
                /> */}
                <div className="container mx-auto flex">
                  <div className="w-1/3">
                    <div className="flex items-left space-x-2" onClick={() => { router.back(-1) }}>
                      <IoArrowBack />
                      <h2>Listing Editor</h2>
                    </div>
                    <div className="flex justify-left space-x-4 my-4">
                      <button
                        id="tab--navigation-tabs--0"
                        value={"space"}
                        onClick={() => handleTabClick("space")}
                        className={`py-2 px-4 rounded-lg focus:outline-none ${editguide === "space"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                          }`}
                        role="tab"
                        aria-selected={editguide === "space"}
                      >
                        Your space
                      </button>
                      <button
                        id="tab--navigation-tabs--1"
                        value={"guide"}
                        onClick={() => handleTabClick("guide")}
                        className={`py-2 px-4 rounded-lg focus:outline-none ${editguide === "guide"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                          }`}
                        role="tab"
                        aria-selected={editguide === "guide"}
                      >
                        Arrival guide
                      </button>
                    </div>

                    {editguide === "guide" && (
                      <>
                        <div className=" p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 0 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(0)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Time Management</h3>
                            <p className="font-normal text-sm">Add Deatils</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 1 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(1)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2 ">Direction</h3>
                            <p className="font-normal text-sm capitalize ">Add Details </p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 2 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(2)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Wifi  </h3>
                            <p className="font-normal text-sm">Wifi details </p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 3 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(3)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Check-in Method </h3>
                            <p className="font-normal text-sm line-clamp-3">Add Details</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 4 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(4)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">House Rules   </h3>
                            <p className="font-normal text-sm capitalize"> Add Details</p>
                          </div>


                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 5 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(5)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">House Manual   </h3>
                            <p className="font-normal text-sm capitalize"> Add Details</p>
                          </div>


                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 6 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(6)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">checkout instructions   </h3>
                            <p className="font-normal text-sm capitalize"> Add Details</p>
                          </div>
                        </div>
                        <div className="w-0.5 bg-gray-300"></div>
                      </>
                    )}
                    {editguide === "space" && (
                      <>
                        <div className=" p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 0 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(0)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Title</h3>
                            <p className="font-normal text-sm">{item?.name}</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 1 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(1)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2 ">Property Type</h3>
                            <p className="font-normal text-sm capitalize ">{typeHere?.replace("_", " ")} {PType} </p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 2 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(2)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2"> Pricing  </h3>
                            <p className="font-normal text-sm">{item?.price}</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 3 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(3)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Number of Guests  </h3>
                            <p className="font-normal text-sm">{Guests}</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 4 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(4)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Description </h3>
                            <p className="font-normal text-sm line-clamp-3">{item?.about}</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 5 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(5)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Booking System  </h3>
                            <p className="font-normal text-sm capitalize"> {selectbooking} Book</p>
                          </div>


                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 6 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(6)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Cancel Policy  </h3>
                            <p className="font-normal text-sm capitalize"> {longTermPolicy || selectedPolicy}</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 7 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(7)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Custom Link  </h3>
                            <p className="font-normal text-sm">
                              {item?.customLink || "Add Details"}
                            </p>
                          </div>


                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 8 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(8)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Location </h3>
                            <p className="font-normal text-sm capitalize">{address?.location} </p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 9 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(9)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Aminites </h3>
                            <p className="font-normal text-sm capitalize">Add Details </p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 10 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(10)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Image </h3>
                            <p className="font-normal text-sm capitalize">Add Details </p>
                          </div>

                        </div>
                        <div className="w-0.5 bg-gray-300"></div>
                      </>
                    )}


                  </div>

                  {editguide === "space" && (
                    <div className="w-2/3 mt-4  ">
                      <div className="">
                        {expandedIndex === 0 && (
                          <div className="p-4">
                            <h1>
                              Proprety Name
                            </h1>
                            <textarea
                              required
                              id="about"
                              name="name"
                              minCol={"5"}
                              minRow={"5"}
                              value={item?.name}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                            />
                            <div className="flex flex-wrap justify-between">
                              <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                                {item?.name ? (
                                  <span>{item?.name.length}/32 characters</span>
                                ) : (
                                  <span>0/32 characters</span>
                                )}
                              </label>
                              <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                                Minimum 32 words.
                              </label>
                            </div>
                          </div>
                        )}

                        {expandedIndex === 1 && (
                          <div className="p-4">
                            <h2 className="text-black font-bold capitalize text-2xl mt-2 mb-2 ">
                              Property type
                            </h2>

                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                              {propertyTypes &&
                                propertyTypes.map((p, i) => (
                                  <div key={i} className="">
                                    <div
                                      onClick={() => setPType(p?.value)}
                                      className={`property-type-wrap cursor-pointer p-4 hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px] ${p?.value === PType
                                        ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700"
                                        : ""
                                        }`}
                                    >
                                      {p.value === "flat" && (
                                        <FaBuilding
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "house" && (
                                        <FaHome
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "unique_space" && <House size={30} />}
                                      {p.value === "guest_house" && (
                                        <FaDoorOpen
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "hotel" && (
                                        <FaHotel
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "single_room" && (
                                        <FaBed
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "boutique_hotel" && (
                                        <FaCouch
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "breakfast" && (
                                        <MdOutlineFreeBreakfast size={30} />
                                      )}
                                      {p.value === "farm" && (
                                        <FaWarehouse style={{ fontSize: "30px" }} />
                                      )}
                                      <h2
                                        className={`text-[16px] mt-[10px] font-normal ${p.value === PType
                                          ? "text-[#222222]"
                                          : "text-[#222222]"
                                          }`}
                                      >
                                        {p.label}
                                      </h2>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                        {expandedIndex === 2 && (
                          <div className="p-4">
                            <h1 className="uppercase text-lg sm:text-sm">
                              Proprety Pricing
                            </h1>

                            <p className="text-sm capitalize ">
                              These settings apply to all nights, unless you customise them by date.
                            </p>

                            <div className="flex flex-col mb-2">
                              <h1 className="capitalize text-lg font-bold my-4">
                                Nightly price
                              </h1>

                              <input
                                required
                                type="number"
                                name="price"
                                placeholder="Property Price Per Night"
                                id="name"
                                className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                                min="0"
                                value={item?.price}
                                onChange={handleInputChange}
                              />
                            </div>


                            <div className="flex flex-col mb-2">
                              <h1 className="capitalize text-lg font-bold my-4">
                                Discount offer (%){" "}
                              </h1>
                              <label className="flex items-center space-x-2 text-xl font-normal">
                                <input
                                  className="p-4 py-2 w-36 md:w-full mt-1 block text-[16px] md:text-lg border border-[#ccc] rounded-md"
                                  placeholder="% Discount offer"
                                  type="number"
                                  name="discount"
                                  value={item?.discount}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                            <h2 className="text-xl md:text-2xl lg:text-3xl capitalize text-center mt-4 font-bold md:mb-8 mb-4">
                              Please enter the following details
                            </h2>
                            <div className="w-full px-1 ">
                              <div className="flex flex-col w-full md:mb-0 mb-2">
                                <label>Cleaning Fees ( Per Day Fees) </label>
                                <input
                                  required
                                  type="number"
                                  name="cleaning"
                                  placeholder="Cleaning Fees Per Day"
                                  id="cleaning"
                                  className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                                  value={item?.cleaning}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="w-full px-1 ">
                              <div className="flex flex-col w-full md:mb-0 mb-2">
                                <label>Pet Fees (Per Pet Fees)</label>
                                <input
                                  type="number"
                                  name="pet"
                                  placeholder="Per Pet Fees"
                                  id="pet"
                                  className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                                  value={item?.pet}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="w-full px-1 ">
                              <div className="flex flex-col w-full md:mb-0 mb-2">
                                <label>Extra Guest Fees (Per Guest)</label>
                                <input
                                  required
                                  type="number"
                                  name="extra_guest"
                                  placeholder="Extra Guest Fees per Guest"
                                  id="guest"
                                  className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                                  value={item?.extra_guest}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {expandedIndex === 3
                          && (
                            <Guest
                              Guests={Guests}
                              setGuests={setGuests}
                              Beds={Beds}
                              setBeds={setBeds}
                              Bedrooms={Bedrooms}
                              setBedrooms={setBedrooms}
                              Bathrooms={Bathrooms}
                              setBathrooms={setBathrooms}
                            />
                          )}

                        {expandedIndex === 4 && (
                          <div className="p-4">
                            <div className="flex flex-col items-start space-y-2" style={{ animationDelay: '400ms' }}>
                              <h1 className="text-2xl font-bold" tabIndex="-1">description</h1>
                            </div>
                            <textarea
                              required
                              id="about"
                              name="description"
                              value={item?.about}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                            />
                            <div className="flex flex-wrap justify-between">
                              <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                                {item?.about ? (
                                  <span>{item?.about.length}/500 characters</span>
                                ) : (
                                  <span>0/500 characters</span>
                                )}
                              </label>
                              <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                                Minimum 500 words.
                              </label>
                            </div>
                          </div>
                        )}

                        {expandedIndex === 5
                          && (

                            <>
                              <div className="transition-opacity duration-600">
                                <div className="space-y-4">
                                  <div className="flex flex-col items-start space-y-2" style={{ animationDelay: '400ms' }}>
                                    <h1 className="text-2xl font-bold" tabIndex="-1">Decide how you’ll confirm reservations</h1>
                                  </div>
                                  <div className="space-y-4">
                                    <div className="flex flex-col space-y-4" role="radiogroup">
                                      <div className="flex items-center space-x-4" style={{ '--list_animation-delay': '400ms' }}>
                                        <button
                                          className={`flex items-center space-x-4 p-4 border rounded-lg ${selectbooking === 'instant' ? 'border-black' : 'border-gray-300'}`}
                                          type="button"
                                          role="radio"
                                          aria-checked={selectbooking === 'instant'}
                                          onClick={() => handleBookingChange('instant')}
                                        >
                                          <div className="flex flex-col space-y-1">
                                            <h2 className="text-lg font-semibold">Use Instant Book</h2>
                                            <div className="text-gray-600">Guests can book automatically.</div>
                                          </div>
                                          <div className="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="h-8 w-8 fill-current text-black">
                                              <path d="M17.16 1.46L6.19 17.42l-.1.17c-.05.12-.06.18-.08.4l.04.13c.19.65.23.67.97.88H13v10.97l.04.22c.05.28.1.33.4.61l.27.09c.51.16.59.1 1.13-.35l10.97-15.96.1-.18c.05-.11.06-.17.08-.39l-.04-.13c-.19-.66-.23-.67-.97-.88H19V2.03l-.04-.22c-.05-.28-.1-.33-.4-.61l-.27-.09c-.51-.16-.59-.1-1.13.35zM17 5.22V15h6.1L15 26.78V17H8.9L17 5.22z"></path>
                                            </svg>
                                          </div>
                                        </button>
                                      </div>
                                      <div className="flex items-center space-x-4" style={{ '--list_animation-delay': '449.7412007086385ms' }}>
                                        <button
                                          className={`flex items-center space-x-4 p-4 border rounded-lg ${selectbooking === 'request' ? 'border-black' : 'border-gray-300'}`}
                                          type="button"
                                          role="radio"
                                          aria-checked={selectbooking === 'request'}
                                          onClick={() => handleBookingChange('request')}
                                        >
                                          <div className="flex flex-col space-y-1">
                                            <h2 className="text-lg font-semibold">Approve or decline requests</h2>
                                            <div className="text-gray-600">Guests must ask if they can book.</div>
                                          </div>
                                          <div className="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="h-8 w-8 fill-current text-black">
                                              <path d="M26 1a5 5 0 0 1 5 4.78v10.9a5 5 0 0 1-4.78 5H26a5 5 0 0 1-4.78 5h-4l-3.72 4.36-3.72-4.36H6a5 5 0 0 1-4.98-4.56L1 21.9 1 21.68V11a5 5 0 0 1 4.78-5H6a5 5 0 0 1 4.78-5H26zm-5 7H6a3 3 0 0 0-3 2.82v10.86a3 3 0 0 0 2.82 3h4.88l2.8 3.28 2.8-3.28H21a3 3 0 0 0 3-2.82V11a3 3 0 0 0-3-3zm-1 10v2H6v-2h14zm6-15H11a3 3 0 0 0-3 2.82V6h13a5 5 0 0 1 5 4.78v8.9a3 3 0 0 0 3-2.82V6a3 3 0 0 0-2.82-3H26zM15 13v2H6v-2h9z"></path>
                                            </svg>
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>


                              <div className="max-w-[100%] m-auto w-full md:mt-10 mt-4">
                                <h2 className="text-xl md:text-2xl lg:text-3xl text-center mt-2 font-bold md:mb-8 mb-4 capitalize">
                                  please select Property Status
                                </h2>
                                <div className="flex items-center space-x-4 md-4 md:mb-8">
                                  <label className="flex items-center space-x-2 sm:text-[1.15rem] text-[17px] font-normal   ">
                                    <input
                                      type="radio"
                                      value={1}
                                      checked={selectedOption === 1}
                                      onChange={handleOptionChange}
                                      className="form-radio"
                                    />
                                    <span className="">List Property</span>
                                  </label>
                                  <label className="flex items-center space-x-2 sm:text-[1.15rem] text-[17px] font-normal">
                                    <input
                                      type="radio"
                                      value={0}
                                      checked={selectedOption === 0}
                                      onChange={handleOptionChange}
                                      className="form-radio "
                                    />
                                    <span>Unlist Property</span>
                                  </label>
                                </div>
                              </div>
                            </>
                          )}

                        {expandedIndex === 6 &&
                          <CancelPolicy
                            showFirm={showFirm}
                            setShowFirm={setShowFirm}
                            setShowFlexible={setShowFlexible}
                            selectedPolicy={selectedPolicy}
                            setSelectedPolicy={setSelectedPolicy}
                            showFlexible={showFlexible}
                            longTermPolicy={longTermPolicy}
                            setLongTermPolicy={setLongTermPolicy}
                          />
                        }

                        {expandedIndex === 7 && (
                          <div className="flex flex-col mb-2">
                            <h1
                              htmlFor="customLink"
                              className="text-[20px] md:text-2xl font-bold"
                            >
                              Custom Link
                            </h1>
                            <div className="relative mt-2 mb-4">
                              <div className="flex w-full">
                                <span className="inline-block bg-gray-200 p-2 rounded-l flex-shrink-0">
                                  {baseurl}
                                </span>
                                <textarea
                                  rows={5}
                                  cols={5}
                                  type="text"
                                  className="form-control flex-1 py-2 px-4 border border-l-0 rounded-r"
                                  id="customLink"
                                  name="customLink"
                                  aria-describedby="basic-addon3"
                                  placeholder="Enter your custom link here"
                                  value={item.customLink}
                                  onChange={handleInputChange}
                                />
                                <svg
                                  onClick={copyToClipboard}
                                  className="cursor-pointer h-7 w-7 absolute right-2 top-2"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />
                                </svg>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                {baseurl.length + item.customLink.length}/{100}
                              </div>
                            </div>
                          </div>
                        )}

                        {expandedIndex === 8 && (
                                    <>
                                    <div className="mb-8">
                            <h2 className="text-xl md:text-2xl capitalize lg:text-3xl text-center mt-4 font-bold md:mb-8 mb-4">
                              Where's your place located?
                            </h2>
                            <p className="text-normal text-center text-gray-500 mb-8">
                              Your address is only shared with guests after they’ve made a
                              reservation.
                            </p>
                            <div className="table w-full m-auto space-y-2  md:space-y-4 text-center">
                              <p>{address?.location}</p>
                              <div class="w-full mt-2 md:mt-4">
                                <button
                                  className="btn sort w-full"
                                  onClick={fetchLocationData}
                                >
                                  {loadinglocation ? ".... " : "Use Current Location"}
                                </button>
                              </div>
                              <div class="flex items-center justify-center space-x-4">
                                <div class="font-semibold text-gray-400 py-3 text-center">
                                  OR
                                </div>
                              </div>
                              <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                                <input
                                  value={address.flat_house}
                                  name="flat_house"
                                  onChange={handleAddress}
                                  type="text"
                                  placeholder="Flat, house, etc. (if applicable)"
                                  className="w-full border border-gray-300 rounded-0 border-t-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                                />
                                <input
                                  onBlur={fetchLocation}
                                  value={address.street_address}
                                  name="street_address"
                                  onChange={handleAddress}
                                  type="text"
                                  placeholder="Street Address"
                                  className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                                />
                                <input
                                  onBlur={fetchLocation}
                                  value={address.nearby}
                                  name="nearby"
                                  onChange={handleAddress}
                                  type="text"
                                  placeholder="Nearby Landmark (if applicable)"
                                  className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                                />
                                <input
                                  onBlur={fetchLocation}
                                  value={address.district}
                                  name="district"
                                  onChange={handleAddress}
                                  type="text"
                                  placeholder="District/Locality"
                                  className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                                />
                                <input
                                  onBlur={fetchLocation}
                                  value={address.city}
                                  name="city"
                                  onChange={handleAddress}
                                  type="text"
                                  placeholder="City/Town"
                                  className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                                />
                                <input
                                  onBlur={fetchLocation}
                                  value={address.state}
                                  name="state"
                                  onChange={handleAddress}
                                  type="text"
                                  placeholder="State"
                                  className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                                />
                                <input
                                  onBlur={fetchLocation}
                                  value={address.pin}
                                  name="pin"
                                  onChange={handleAddress}
                                  type="text"
                                  placeholder="PIN Code"
                                  className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            {address?.location && (
                              <>
                                <h2 className="text-xl capitalize md:text-2xl lg:text-3xl text-center mt-4 font-bold md:mb-8 mb-4">
                                  Show your specific location
                                </h2>
                                <p className="text-normal capitalize text-center text-gray-500 mb-8 mt-4">
                                  Make it clear to guests where your place is located.
                                  We'll only share your address after they've made a
                                  reservation
                                </p>
                                <div>
                                  <div
                                    id="map"
                                    style={{ width: "100%", height: "450px" }}
                                  ></div>
                                </div>
                              </>
                            )}
                          </div>
                                    </>
                        )}
                        {expandedIndex === 9 && (
                          <div className="p-4">

                            <Amenities
                              selectedAmenity={selectedAmenity}
                              standoutAmenity={standoutAmenity}
                              Amenity={Amenity}
                              setAmenity={setAmenity}
                              setstandoutAmenity={setstandoutAmenity}
                              setSelectedAmenity={setSelectedAmenity}
                            />
                          </div>
                        )}

                        {expandedIndex === 10 && (
                          <>
                            <h2 className="text-xl md:text-2xl  capitalize lg:text-3xl text-center mt-4 font-bold md:mb-8 mb-4">
                              Add some photos of your{" "}
                              {PType ? PType.replace("_", " ") : "house"}
                            </h2>
                            <p className="text-[16px] text-center text-gray-500 mb-8">
                              You'll need 5 photos to get started. You can add more or make
                              changes later.
                            </p>

                            <div className={"max-w-[600px] m-auto"}>
                              <div className="flex items-center justify-center w-full mt-5 mb-4 justify-center">
                                <label
                                  htmlFor="dropzone-file"
                                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                                >
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Add size="100" color="#ccc" />
                                    <p className="mb-2 text-lg text-gray-500 text-gray-400">
                                      <span className="font-semibold">Click to upload</span>
                                    </p>
                                    <p className="text-normal text-gray-500 text-gray-400">
                                      Choose at least 5 images
                                    </p>
                                    <p className="text-normal text-gray-500 px-2 text-gray-400">
                                      (jpg, jpeg, png, gif, bmp, tif, tiff, svg, webp, avif)
                                    </p>
                                  </div>
                                  <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                                    onChange={handleFileChange}
                                    name="images"
                                    required
                                    multiple
                                  />
                                </label>
                              </div>

                              <div className="flex flex-wrap  mt-2">
                                {useExistingImages === false || isEdit === true ? (
                                  <> </>
                                ) : (
                                  images &&
                                  images.length > 0 && (
                                    <>
                                      <div
                                        key={0}
                                        id={images[0].name}
                                        draggable
                                        onDragStart={handleDrag}
                                        onDragOver={handleOver}
                                        onDrop={handleDrop}
                                        className="relative w-full p-1 cursor-move"
                                      >
                                        <Image
                                          src={URL.createObjectURL(images[0])}
                                          width={200}
                                          height={200}
                                          alt={`Preview 0`}
                                          className="image-preview h-full object-cover border min-h-[170px] max-h-[250px] w-full max-w-full rounded-lg"
                                          onLoad={() => URL.revokeObjectURL(images[0])}
                                        />
                                        <div className="absolute left-2 top-2 bg-white p-2 rounded shadow">
                                          <p className="text-xs text-gray-700">
                                            Cover Photo
                                          </p>
                                        </div>
                                        <div className="absolute right-2 top-2">
                                          <DropdownMenu
                                            index={0}
                                            isFirst={true}
                                            isLast={images.length === 1}
                                          />
                                        </div>
                                      </div>
                                      {images.slice(1).map((file, index) => (
                                        <div
                                          key={index + 1}
                                          id={file.name}
                                          draggable
                                          onDragStart={handleDrag}
                                          onDragOver={handleOver}
                                          onDrop={handleDrop}
                                          className="relative w-1/2 md:w-1/3 p-1 cursor-move"
                                        >
                                          <Image
                                            src={URL.createObjectURL(file)}
                                            width={200}
                                            height={200}
                                            alt={`Preview ${index + 1}`}
                                            className="image-preview h-full object-cover border min-h-[120px] sm:min-h-[150px]  max-h-[200px] w-full max-w-full rounded-lg"
                                            onLoad={() => URL.revokeObjectURL(file)}
                                          />
                                          {index + 1 === 0 && (
                                            <div className="absolute left-2 top-2 bg-white p-2 rounded shadow">
                                              <p className="text-xs text-gray-700">
                                                Cover Photo
                                              </p>
                                            </div>
                                          )}
                                          <div className="absolute right-2 top-2">
                                            <DropdownMenu
                                              index={index + 1}
                                              isFirst={false}
                                              isLast={index + 1 === images.length - 1}
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  )
                                )}

                                {useExistingImages === false ? (
                                  images &&
                                  images.length > 0 && (
                                    <>
                                      <div
                                        key={0}
                                        id={images[0].name}
                                        draggable
                                        onDragStart={handleDrag}
                                        onDragOver={handleOver}
                                        onDrop={handleDrop}
                                        className="relative w-full  p-1"
                                      >
                                        <Image
                                          src={URL.createObjectURL(images[0])}
                                          width={200}
                                          height={200}
                                          alt={`Preview 0`}
                                          className="image-preview h-full object-cover border min-h-[170px] max-h-[250px] w-full max-w-full rounded-lg"
                                          onLoad={() => URL.revokeObjectURL(images[0])}
                                        />
                                        <div className="absolute left-2 top-2 bg-white p-2 rounded shadow">
                                          <p className="text-xs text-gray-700">
                                            Cover Photo
                                          </p>
                                        </div>
                                        <div className="absolute right-2 top-2">
                                          <DropdownMenu
                                            index={0}
                                            isFirst={true}
                                            isLast={images.length === 1}
                                          />
                                        </div>
                                      </div>
                                      {images.slice(1).map((file, index) => (
                                        <div
                                          key={index + 1}
                                          id={file.name}
                                          draggable
                                          onDragStart={handleDrag}
                                          onDragOver={handleOver}
                                          onDrop={handleDrop}
                                          className="relative w-1/2 md:w-1/3 p-1"
                                        >
                                          <Image
                                            src={URL.createObjectURL(file)}
                                            width={200}
                                            height={200}
                                            alt={`Preview ${index + 1}`}
                                            className="image-preview h-full object-cover border min-h-[120px] sm:min-h-[150px]  max-h-[200px] w-full max-w-full rounded-lg"
                                            onLoad={() => URL.revokeObjectURL(file)}
                                          />
                                          {index + 1 === 0 && (
                                            <div className="absolute left-2 top-2 bg-white p-2 rounded shadow">
                                              <p className="text-xs text-gray-700">
                                                Cover Photo
                                              </p>
                                            </div>
                                          )}
                                          <div className="absolute right-2 top-2">
                                            <DropdownMenu
                                              index={index + 1}
                                              isFirst={false}
                                              isLast={index + 1 === images.length - 1}
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  )
                                ) : (
                                  <> </>
                                )}
                              </div>

                              <div className="flex flex-wrap  mt-2">
                                {isEdit === true ? (
                                  images &&
                                  images.map((file, index) => (
                                    <div
                                      key={index}
                                      className="relative w-1/2 md:w-1/3 p-1"
                                    >
                                      <Image
                                        src={URL.createObjectURL(file)}
                                        width={200}
                                        height={200}
                                        alt={`Preview ${index}`}
                                        className="image-preview h-full object-cover border min-h-[120px] sm:min-h-[150px]  max-h-[200px] w-full max-w-full rounded-lg"
                                        onLoad={() => URL.revokeObjectURL(file)}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeImage(file)}
                                        className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  ))
                                ) : (
                                  <> </>
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                              {useExistingImages === true || isEdit === true ? (
                                imageproperty?.map((item, index) => (
                                  <div key={index} className="relative isedits">
                                    <Image
                                      className="image-preview object-cover border min-h-[150px] max-h-[200px] h-full w-full max-w-full rounded-lg"
                                      src={item?.image_url || ""}
                                      width={200}
                                      height={200}
                                      alt={`Preview ${index}`}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => deletePropertyImage(uuid, item?.uuid)}
                                      className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <> </>
                              )}
                            </div>
                          </>
                        )}


                        <div className="border-t-[7px]">
                          <div className="flex justify-end fixed  z-50 bottom-4 right-4 border-t-[7px]">
                            <button
                              type="submit"
                              onClick={handleSubmit}
                              className=" mx-2 py-2 rounded-xl px-8 hover:bg-[#fff] bg-[#c48b58] text-[#fff] hover:text-[#c48b58] border-2 bg-color-[#c48b58] border-[#c48b58]  "
                            >
                              {loading ? "processing.. " : "Submit"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>)}


                  {editguide === "guide" && (
                    <div className="w-2/3 mt-4  ">
                      <div className="">

                        {expandedIndex === 0 && (

                          <>
                            <div className="max-w-[100%] m-auto w-full md:mt-10 mt-4 ">
                              <h2 className="text-xl md:text-2xl lg:text-3xl text-center mt-4 font-bold md:mb-8 mb-4 capitalize">
                                Check-in & checkout times
                              </h2>
                              <div className=" mt-4 text-sm font-medium text-gray-700 ">
                                <div className="w-full  mb-2 pr-2">
                                  <label className="block mb-2 font-semibold">
                                    Check-in window
                                  </label>
                                  <div className=" space-x-2">
                                    <div className="relative">
                                      <label className="absolute -top-1 left-1 text-xs text-gray-500">
                                        Start time
                                      </label>
                                      <select
                                        value={checkinStart}
                                        onChange={(e) => setCheckinStart(e.target.value)}
                                        className="block w-full px-3 py-3 border bg-white rounded-xl shadow-sm sm:text-sm mt-3"
                                      >
                                        <option value="00:00:00">12:00 AM</option>
                                        <option value="01:00:00">01:00 AM</option>
                                        <option value="02:00:00">02:00 AM</option>
                                        <option value="03:00:00">03:00 AM</option>
                                        <option value="04:00:00">04:00 AM</option>
                                        <option value="05:00:00">05:00 AM</option>
                                        <option value="06:00:00">06:00 AM</option>
                                        <option value="07:00:00">07:00 AM</option>
                                        <option value="08:00:00">08:00 AM</option>
                                        <option value="09:00:00">09:00 AM</option>
                                        <option value="10:00:00">10:00 AM</option>
                                        <option value="11:00:00">11:00 AM</option>
                                        <option value="12:00:00">12:00 PM</option>
                                        <option value="13:00:00">01:00 PM</option>
                                        <option value="14:00:00">02:00 PM</option>
                                        <option value="15:00:00">03:00 PM</option>
                                        <option value="16:00:00">04:00 PM</option>
                                        <option value="17:00:00">05:00 PM</option>
                                        <option value="18:00:00">06:00 PM</option>
                                        <option value="19:00:00">07:00 PM</option>
                                        <option value="20:00:00">08:00 PM</option>
                                        <option value="21:00:00">09:00 PM</option>
                                        <option value="22:00:00">10:00 PM</option>
                                        <option value="23:00:00">11:00 PM</option>
                                      </select>
                                    </div>
                                    <div className="relative">
                                      <label className="absolute -top-1 left-1 text-xs text-gray-500">
                                        End time
                                      </label>
                                      <select
                                        value={checkinEnd}
                                        onChange={(e) => setCheckinEnd(e.target.value)}
                                        className="block w-full px-3 py-3 border  bg-white rounded-xl shadow-sm sm:text-sm mt-3"
                                      >
                                        <option value="flexible">Flexible</option>
                                        <option value="00:00">12:00 AM</option>
                                        <option value="01:00">01:00 AM</option>
                                        <option value="02:00">02:00 AM</option>
                                        <option value="03:00">03:00 AM</option>
                                        <option value="04:00">04:00 AM</option>
                                        <option value="05:00">05:00 AM</option>
                                        <option value="06:00">06:00 AM</option>
                                        <option value="07:00">07:00 AM</option>
                                        <option value="08:00">08:00 AM</option>
                                        <option value="09:00">09:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="13:00">01:00 PM</option>
                                        <option value="14:00">02:00 PM</option>
                                        <option value="15:00">03:00 PM</option>
                                        <option value="16:00">04:00 PM</option>
                                        <option value="17:00">05:00 PM</option>
                                        <option value="18:00">06:00 PM</option>
                                        <option value="19:00">07:00 PM</option>
                                        <option value="20:00">08:00 PM</option>
                                        <option value="21:00">09:00 PM</option>
                                        <option value="22:00">10:00 PM</option>
                                        <option value="23:00">11:00 PM</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full">
                                  <label className="block mb-2 font-semibold sm:mb-[20px]">
                                    Check-out time
                                  </label>
                                  <select
                                    value={checkout}
                                    onChange={(e) => setCheckout(e.target.value)}
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-xl shadow-sm sm:text-sm mt-2"
                                  >
                                    <option value="00:00:00">12:00 AM</option>
                                    <option value="01:00:00">01:00 AM</option>
                                    <option value="02:00:00">02:00 AM</option>
                                    <option value="03:00:00">03:00 AM</option>
                                    <option value="04:00:00">04:00 AM</option>
                                    <option value="05:00:00">05:00 AM</option>
                                    <option value="06:00:00">06:00 AM</option>
                                    <option value="07:00:00">07:00 AM</option>
                                    <option value="08:00:00">08:00 AM</option>
                                    <option value="09:00:00">09:00 AM</option>
                                    <option value="10:00:00">10:00 AM</option>
                                    <option value="11:00:00">11:00 AM</option>
                                    <option value="12:00:00">12:00 PM</option>
                                    <option value="13:00:00">01:00 PM</option>
                                    <option value="14:00:00">02:00 PM</option>
                                    <option value="14:00:00">02:00 PM</option>
                                    <option value="15:00:00">03:00 PM</option>
                                    <option value="16:00:00">04:00 PM</option>
                                    <option value="17:00:00">05:00 PM</option>
                                    <option value="18:00:00">06:00 PM</option>
                                    <option value="19:00:00">07:00 PM</option>
                                    <option value="20:00:00">08:00 PM</option>
                                    <option value="21:00:00">09:00 PM</option>
                                    <option value="22:00:00">10:00 PM</option>
                                    <option value="23:00:00">11:00 PM</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                              <div className="flex flex-col items-start space-y-2" style={{ animationDelay: '400ms' }}>
                                <h1 className="text-2xl font-bold" tabIndex="-1">Select Proerty Type (BHK)</h1>
                              </div>
                              <div className="flex space-x-4">
                                {[1, 2, 3, 4].map((option) => (
                                  <label key={option} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      value={option}
                                      checked={selecbhktype === option}
                                      onChange={() => handleselecbhktype(option)}
                                      className="form-radio text-blue-600"
                                    />
                                    <span>{option} BHK</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </>

                        )}

                        {expandedIndex === 1 && (
                          <div className="flex flex-col mb-4">
                            <label
                              htmlFor="directions"
                              className="capitalize text-lg font-bold my-1"
                            >
                              Directions
                            </label>
                            <textarea
                              id="directions"
                              name="Direction"
                              rows={5}
                              className="shadow-sm p-4 py-2 w-4/5 mt-1 block w-full sm:text-sm border rounded-xl"
                              placeholder="Enter directions here..."
                              value={item?.Direction}
                              onChange={handleInputChange}
                            />
                          </div>
                        )}

                        {expandedIndex === 2
                          && (
                            <div className="flex flex-col  ">
                              <h1 className="capitalize text-lg font-bold my-4">
                                Please enter your wifi details
                              </h1>
                              <label
                                htmlFor="directions"
                                className="block font-medium text-gray-700 my-2"
                              >
                                Wifi Name
                              </label>
                              <input
                                id="wifi"
                                name="wifi"
                                type="text"
                                className="shadow-sm p-4 py-2 w-full mt-1 block sm:text-sm border rounded-xl"
                                placeholder="Enter your wifi name..."
                                value={item?.wifi}
                                onChange={handleInputChange}
                              />
                              <label
                                htmlFor="directions"
                                className="block font-medium text-gray-700 my-2"
                              >
                                Wifi Password
                              </label>
                              <input
                                id="wifiPassword"
                                name="wifiPassword"
                                type="text"
                                className="shadow-sm p-4 py-2 w-full mt-1 block text-[16px] md:text-lg border rounded-xl"
                                placeholder="Enter your wifi Password here..."
                                value={item?.wifiPassword}
                                onChange={handleInputChange}
                              />
                            </div>
                          )}

                        {expandedIndex === 3 && (
                          <div className="flex flex-col mb-2">
                            <div className="flex flex-col md:flex-row ">
                              <div className="md:w-1/2 pr-2 flex flex-col mb-3">
                                <div className=" items-center">
                                  <h2 className="text-[20px] md:text-2xl font-bold capitalize">
                                    Select a check-in method
                                  </h2>
                                </div>
                                <div className="space-y-4 mt-4 w-full">
                                  {options &&
                                    options.map((item, index) => (
                                      <div
                                        key={index}
                                        className={`p-4 border rounded-lg cursor-pointer ${selectedMethod === item?.item
                                          ? "border-indigo-600"
                                          : "border-gray-300"
                                          }`}
                                        onClick={() => handleMethodSelect(item?.item)}
                                      >
                                        {item?.icon}
                                        <span className="my-4 text-xl font-semibold capitalize">
                                          {item?.item}
                                        </span>
                                        <p className="text-gray-500">{item?.data}</p>
                                      </div>
                                    ))}
                                </div>
                              </div>
                              {/* Right Panel */}
                              <div className="md:w-1/2 pl-2">
                                <h2 className="text-[20px] md:text-2xl font-bold mb-2 sm:mb-4 capitalize">
                                  Add {selectedMethod} details
                                </h2>
                                <textarea
                                  className="w-full p-2 border border-gray-300 rounded-lg"
                                  rows="10"
                                  name="checkdescrtion"
                                  value={checkdescrtion}
                                  onChange={handlecheckChange}
                                  placeholder={`Add any important details for getting inside your place. This info will be shared with guests 24-48 hours before check-in.`}
                                />
                                <div className="flex justify-between items-center ">
                                  <p className="text-gray-500">
                                    Shared 48 hours before check-in
                                  </p>
                                  <div></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {expandedIndex === 4
                          && (
                            <HouseRules
                              petsAllowed={petsAllowed}
                              setPetsAllowed={setPetsAllowed}
                              quietHours={quietHours}
                              pets={pets}
                              setPets={setPets}
                              checkinTime={checkinquet}
                              setCheckinTime={setCheckinquiet}
                              checkoutTime={checkoutquet}
                              setCheckoutTime={setCheckoutquiet}
                              setEventsAllowed={setEventsAllowed}
                              setQuietHours={setQuietHours}
                              eventsAllowed={eventsAllowed}
                              PhotographyAllowed={PhotographyAllowed}
                              setPhotographyAllowed={setPhotographyAllowed}
                              smokingAllowed={smokingAllowed}
                              setSmokingAllowed={setSmokingAllowed}
                            />
                          )}

                        {expandedIndex === 5 &&
                          <div className="flex flex-col mb-4">
                            <label
                              htmlFor="directions"
                              className="capitalize text-lg font-bold my-1"
                            >
                              House Manual
                            </label>
                            <textarea
                              id="manual"
                              name="housemanual"
                              rows={5}
                              className="shadow-sm p-4 py-2 w-full mt-1 block sm:text-sm border rounded-xl"
                              placeholder="Enter some instructions for your guest..."
                              value={item?.housemanual}
                              onChange={handleInputChange}
                            />
                          </div>
                        }




                        {expandedIndex === 6 && (
                          <div className="flex  flex-col mb-2">
                            <Checkout
                              // handleSubmit={handleSubmit}
                              selectedInstruction={selectedInstruction}
                              isEdit={true}
                              // checkoutdata={check_out_instruction}
                              setShowTextArea={setShowTextArea}
                              showTextArea={showTextArea}
                              text={text}
                              setText={setText}
                              setSelectedInstruction={setSelectedInstruction}
                              setShowInstructions={setShowInstructions}
                              setCheckoutInstructions={setCheckoutInstructions}
                              checkoutInstructions={checkoutInstructions}
                              showInstructions={showInstructions}
                            />
                          </div>
                        )}

                        <div className="border-t-[7px]">
                          <button
                            type="submit"
                            onClick={handleSubmit}
                            className=" mx-2 py-2 rounded-xl px-8 hover:bg-[#fff] bg-[#c48b58] text-[#fff] hover:text-[#c48b58] border-2 bg-color-[#c48b58] border-[#c48b58]  "
                          >
                            {loading ? "processing.. " : "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}



                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


