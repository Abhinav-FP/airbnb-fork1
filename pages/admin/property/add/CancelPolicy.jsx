import { useState } from "react";

function CancelPolicy({ showFirm, setShowFirm, showFlexible, setShowFlexible, selectedPolicy, setSelectedPolicy, longTermPolicy, setLongTermPolicy }) {

    const handlePolicyChanges = (policy) => {
        setLongTermPolicy(longTermPolicy === policy ? "" : policy);
    };

    const handlePolicyChange = (policy) => {
        setSelectedPolicy(selectedPolicy === policy ? "" : policy);
    };

    const policies = [
        {
            policy: 'Flexible',
            description: 'Guests get a full refund if they cancel up to a day before check-in.'
        },
        {
            policy: 'Moderate',
            description: 'Guests get a full refund if they cancel up to 5 days before check-in.'
        },
        {
            policy: 'Firm',
            description: 'Guests get a full refund if they cancel up to 30 days before check-in, except in certain cases.'
        },
        {
            policy: 'Strict',
            description: 'Guests get a full refund if they cancel within 48 hours of booking and at least 14 days before check-in.'
        }
    ];

    const toggleFlexible = () => {
        setShowFlexible(true);
        setShowFirm(false);
    };

    const toggleFirm = () => {
        setShowFirm(true);
        setShowFlexible(false);
    };

    return (
        <div className="container mx-auto p-4 flex">
            <div className="w-1/2 pr-2">
                <h2 className="text-center font-bold text-2xl text-slate-900 mt-3 mb-4">Cancellation policy</h2>
                <div className="p-4 mb-5 mt-3 ">
                    <p className="text-center font-normal text-lg text-slate-700 mt-3 mb-4">Standard policy</p>
                    <p className="text-center font-normal text-sm text-slate-500 mt-3 mb-4">Applies to any stays under 28 nights.</p>
                    <div
                        onClick={toggleFlexible}
                        className={`flex flex-col border-2 p-3 cursor-pointer ${showFlexible === true ? "border-black" : "border-gray-200"}`}
                    >

                        <label className="flex items-center cursor-pointer mx-auto text-center">Flexible</label>
                        <p className="text-gray-500">
                            First 30 days are non-refundable. Full refund up to 30 days before check-in.
                        </p>
                    </div>
                </div>
                <div className="p-4 mb-5 mt-3 ">
                    <p className="text-center font-normal text-lg text-slate-700 mt-3 mb-4">Long-term stay policy</p>
                    <p className="text-center font-normal text-sm text-slate-500 mt-3 mb-4">Applies to stays 28 nights or longer.</p>

                    <div
                        onClick={toggleFirm}
                        className={`flex flex-col border-2 p-3 cursor-pointer ${showFirm === "firm" ? "border-black" : "border-gray-200"}`}
                    >
                        <label className="flex items-center cursor-pointer mx-auto text-center">Firm</label>
                        <p className="text-gray-500">
                            Full refund up to 30 days before check-in. After that, the first 30 days of the stay are non-refundable.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 pl-2">
                {showFlexible && (
                    <div className="p-4 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-semibold mb-4">Choose your standard policy</h2>
                        <p className="text-gray-500 mb-4">
                            To understand the full policies, go to the{" "}
                            <span className="underline font-semibold cursor-pointer">Help Centre.</span>
                        </p>
                        <div className="flex flex-wrap -mx-2">
                            {policies.map(({ policy, description }) => (
                                <div
                                    key={policy}
                                    className={`flex justify-center mb-4 p-4 items-center border-2 w-full md:w-full cursor-pointer ${selectedPolicy === policy ? "border-black" : "border-gray-200"
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <label className="flex items-center cursor-pointer mx-auto text-center">
                                            {policy}
                                            <input
                                                type="checkbox"
                                                name={policy}
                                                value={policy}
                                                checked={selectedPolicy === policy}
                                                onChange={() => handlePolicyChange(policy)}
                                                className="ml-2 w-4 h-4 cursor-pointer"
                                            />
                                        </label>
                                        <p className="text-gray-500">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {showFirm && (
                    <div className="p-4 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-semibold mb-4">Choose your long-term stay policy</h2>
                        <p className="text-gray-500 mb-4">
                            To understand the full policies, visit the{" "}
                            <span className="underline font-semibold cursor-pointer">Help Centre.</span>
                        </p>
                        <div className="">
                            <div
                                className={`flex justify-center mb-4 p-4 items-center border-2 cursor-pointer ${longTermPolicy === "Flexible" ? "border-black" : "border-gray-200"
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <label className="flex items-center cursor-pointer mx-auto text-center">Flexible</label>
                                    <p className="text-gray-500">
                                        First 30 days are non-refundable. Full refund up to 30 days before check-in.
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    name="longTermPolicy"
                                    value="Flexible"
                                    checked={longTermPolicy === "Flexible"}
                                    onChange={() => handlePolicyChanges("Flexible")}
                                    className="ml-2 w-4 h-4 cursor-pointer"
                                />
                            </div>
                            <div
                                className={`flex justify-center p-4 mb-4 items-center border-2 cursor-pointer ${longTermPolicy === "Strict" ? "border-black" : "border-gray-200"
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <label className="flex items-center cursor-pointer mx-auto text-center">Strict</label>
                                    <p className="text-gray-500 ml-4">
                                        Full refund if canceled within 48 hours of booking and at least 28 days before check-in. After that, the first 30 days of the stay are non-refundable.
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    name="longTermPolicy"
                                    value="Strict"
                                    checked={longTermPolicy === "Strict"}
                                    onChange={() => handlePolicyChanges("Strict")}
                                    className="mr-2 w-4 h-4 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CancelPolicy;
