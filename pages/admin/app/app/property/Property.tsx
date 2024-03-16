import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Listing from '../../../AdminApi/Listing';


export default function Property() {
    const [step, setStep] = useState(1);
    const [Poperty, setPoperty] = useState({
        guests: '',
        bedrooms: '',
        propertytype: "",
        beds: '',
        bathrooms: '',
        price: "",
        pets: "",
        location: "",
        propertyName: '',
        address: '',
        selectedAmenities: [],
        about: '',
        images: []
    });

    console.log("formdaa", Poperty)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPoperty({
            ...Poperty,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        let filesToAdd = Array.from(e.target.files);
        let newImages = Poperty.images.concat(filesToAdd).slice(0, 6);
        console.log("newImages", newImages)
        setPoperty(prevPoperty => ({
            ...prevPoperty,
            images: newImages,
        }));
    };

    const removeImage = (indexToRemove) => {
        setPoperty(prevPoperty => ({
            ...prevPoperty,
            images: prevPoperty.images.filter((_, index) => index !== indexToRemove),
        }));
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);


    const amenitiesList = [
        "Pool",
        "Wifi",
        "Kitchen",
        "Free Parking",
        "Hot Tub",
        "Air Conditioning or Heating",
        "Washing Machine or Dryer",
        "Self Check-in",
        "TV or Cable",
        "Fireplace"
    ];

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setPoperty(prevData => ({
                ...prevData,
                selectedAmenities: [...prevData.selectedAmenities, value]
            }));
        } else {
            setPoperty(prevData => ({
                ...prevData,
                selectedAmenities: prevData.selectedAmenities.filter(item => item !== value)
            }));
        }
    };


    const fetchLocationData = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const locationData = response.data;
                    setPoperty((prevPoperty) => ({
                        ...prevPoperty,
                        location: locationData.display_name,
                        address: locationData.display_name
                    }));
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }, handleGeolocationError);
        }
    };


    const handleGeolocationError = () => {
        // setError('Geolocation failed');
        console.error('Geolocation failed');
    };


    const handleLocationClick = () => {
        fetchLocationData();
    };

    const handleLocationInputChange = (event) => {
        const { name, value } = event.target;
        setPoperty((prevPoperty) => ({
            ...prevPoperty,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const main = new Listing();
        const formData = new FormData();
        formData.append("name", Poperty.propertyName);
        formData.append("pet_allowed", "1");
        formData.append("no_of_pet_allowed", Poperty.pets);
        formData.append("description", Poperty.about);
        formData.append("price", Poperty.price);
        formData.append("properties_type", Poperty.propertytype);
        formData.append("location", Poperty.location);
        formData.append("bedrooms", Poperty.bedrooms);
        formData.append("beds", Poperty.beds);
        formData.append("bathrooms", Poperty.bathrooms);
        formData.append("latitude", "2222.22588");
        formData.append("longitudes", "2222.22588");
        formData.append("discount_offer", "555");
        formData.append("guests", Poperty.guests);
        formData.append("check_in", " 11:55");
        formData.append("check_out", "12:12");
        formData.append("country_id", "101");
        formData.append("state_id", "101");
        formData.append("city_id", "44");
        formData.append("area_id", "11");
        formData.append("adults", "1");
        formData.append("children", "2");
        formData.append("infants", "1");
        formData.append("free_cancel_time", "11:55");
        formData.append("amenities", Poperty.selectedAmenities.join(','));
        formData.append("property_image", Poperty.images.join(','));



        const response = main.addproperty(formData);
        response
            .then((res) => {
                if (res?.data?.status) {
                    // router.push("/admin")
                    // localStorage && localStorage.setItem("token",res?.data?.token)
                }
            })
            .catch((error) => {
                console.log("error", error);
            });

    };
    return (

        <>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-8">
                <div className="max-w-4xl w-full space-y-8">
                    <div className="bg-white shadow rounded-lg p-8 sm:p-12">
                        <div className="pt-6 flex justify-between">
                            {step > 1 && (
                                <button type="button" onClick={prevStep}
                                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Back
                                </button>
                            )}
                            {step < 10 && (
                                <button type="button" onClick={nextStep}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Next
                                </button>
                            )}
                        </div>


                        {step === 1 && (
                            <div className="space-y-4">
                                <span className="text-0"></span>
                                <div className="flex flex-col text-left">
                                    <div className="flex flex-col space-y-2">
                                        <div>Step 1</div>
                                        <h1 className="text-2xl font-bold">Make your place stand out</h1>
                                        <div>In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then you’ll create a title and description.</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div>
                                            <video className="w-full object-cover" autoPlay crossOrigin="anonymous" playsInline preload="auto">
                                                <source src="https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high" />
                                            </video>
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://a0.muscache.com/4ea/air/v2/pictures/4d3a607e-7a32-4f78-bcb0-8841fdac8773.jpg')" }}>
                                                    <img className="w-full h-full object-cover opacity-0" alt="" src="https://a0.muscache.com/4ea/air/v2/pictures/4d3a607e-7a32-4f78-bcb0-8841fdac8773.jpg" decoding="async" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <>

                                <div className="mt-4">
                                    <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">Property Name</label>
                                    <input type="text" name="propertyName" id="propertyName"
                                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                        value={Poperty.propertyName} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="property-type" className="block text-sm font-medium text-gray-700">Property Type</label>
                                    <select
                                        id="property-type"
                                        name="propertytype"
                                        value={Poperty.propertytype}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Select a property type</option>
                                        <option value="flat">Flat</option>
                                        <option value="house">House</option>
                                        <option value="secondary unit">Secondary Unit</option>
                                        <option value="unique space">Unique Space</option>
                                        <option value="bed and breakfast">Bed and Breakfast</option>
                                        <option value="boutique hotel">Boutique Hotel</option>
                                    </select>
                                </div>
                                <div className="relative text-sm font-medium text-gray-700">
                                    <label htmlFor="location" className="flex-1">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={Poperty.location}
                                        onChange={handleLocationInputChange}
                                        className="pl-3 pr-10 py-2 w-full flex-1 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter Location or Click to Select"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={handleLocationClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4c-2.761 0-5 2.239-5 5 0 3.86 5 11 5 11s5-7.14 5-11c0-2.761-2.239-5-5-5zm0 7a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </div>
                                </div>



                            </>

                        )}
                        {step === 3 && (

                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
                                    <select id="guests" name="guests" autoComplete="guests"
                                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                        value={Poperty.guests} onChange={handleInputChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
                                    <select id="bedrooms" name="bedrooms"
                                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                        value={Poperty.bedrooms} onChange={handleInputChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="beds" className="block text-sm font-medium text-gray-700">Beds</label>
                                    <select id="beds" name="beds" autoComplete="beds"
                                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                        value={Poperty.beds} onChange={handleInputChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
                                    <select id="bathrooms" name="bathrooms" autoComplete="bathrooms"
                                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                        value={Poperty.bathrooms} onChange={handleInputChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="pet" className="block text-sm font-medium text-gray-700">Pets</label>
                                    <select id="pet" name="pets" autoComplete="pet"
                                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                        value={Poperty.pets} onChange={handleInputChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </div>
                            </div>



                        )}

                        {step === 4 && (
                            <div className="max-w-lg mx-auto mt-8">
                                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {amenitiesList.map(amenity => (
                                        <div key={amenity} className="flex items-center">
                                            <input
                                                id={amenity}
                                                name={amenity}
                                                type="checkbox"
                                                value={amenity}
                                                className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
                                                checked={Poperty.selectedAmenities.includes(amenity)}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor={amenity} className="text-lg">{amenity}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {step === 5 && (
                            <>
                                <div className="mt-4">
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">Describe Your Property to Guests</label>
                                    <textarea
                                        id="about"
                                        name="about"
                                        value={Poperty.about} onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                        placeholder="Tell more about your property..."
                                    />
                                </div>
                            </>
                        )}


                        {step === 6 && (
                            <>

                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} name="images" multiple />

                                    </label>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                    {Poperty.images.map((file, index) => (
                                        <div key={index} className="relative">
                                            {/* Overlay Remove Button */}
                                            <button type="button" onClick={() => removeImage(index)}
                                                className="absolute right-0 top-0 bg-red-500 text-white rounded-full p-1 m-1">
                                                &times;
                                            </button>
                                            <img src={URL.createObjectURL(file)} alt={`Preview ${index}`}
                                                className="max-w-xs max-h-44 w-full h-auto gap-5 mr-4" onLoad={() => URL.revokeObjectURL(file)} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {step === 7 && (
                            <>

                                <div className="mt-4">
                                    <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input type="text" name="price" id="propertyName"
                                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                        value={Poperty.price} onChange={handleInputChange} />
                                </div>
                                <button type="button" onClick={handleSubmit}
                                    className=" bg-red-500 text-white rounded-full p-1 m-1">
                                    submit
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

