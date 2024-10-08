import React, { useState } from 'react';

const HouseRules = ({ petsAllowed, setPetsAllowed, eventsAllowed, pets, setPets, setEventsAllowed, smokingAllowed, quietHours, setQuietHours, setSmokingAllowed, PhotographyAllowed, setPhotographyAllowed,
  checkoutTime, setCheckoutTime,
  checkinTime, setCheckinTime,
}) => {
  const decrements = (Bathrooms) => () =>
    setPets((prev) => Math.max(0, prev - 1))
  const increments = (Bathrooms) => () => setPets((prev) => prev + 1);
  return (
    <div className=''>
      <h2 className="text-left  font-bold text-2xl text-slate-900 mt-3 mb-4">House  Rules</h2>
      <p className="text-left  font-sm text-lg text-slate-500 mt-3 mb-4">
        Guests are expected to follow your rules and may be removed from Airbnb if they don't.
      </p>

      <div className='flex p-4 px-6  justify-between bg-slate-100 rounded-full mb-2'>
        <label className='font-normal  text-right text-[16px] md:text-lg text-slate-600 ' style={{ marginRight: '10px' }}>
          Pets allowed:
        </label>

        <div className='flex'>
          <span className="" onClick={() => setPetsAllowed(1)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '24px', width: '24px', fill: 'currentcolor', marginRight: '15px', borderRadius: '50%', border: petsAllowed ? '3px solid green' : '2px solid transparent' }}>
              <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
            </svg>
          </span>
          <span className="" onClick={() => setPetsAllowed(0)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '22px', width: '22px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !petsAllowed ? '3px solid red' : '2px solid transparent' }}>
              <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
            </svg>
          </span>
        </div>
      </div>
      {petsAllowed ? (
        <div className="flex p-4 px-6  justify-between bg-slate-100 rounded-full mb-2 ">
          <span className="font-normal  text-right text-[16px] md:text-lg text-slate-600 ">Pets</span>
          <div className="flex items-center space-x-2  ">
            <button
              onClick={decrements(setPets)}
              className="rounded-full border  border-black-600 px-2 py-[2px]"
            >
              -
            </button>
            <span>{pets}</span>
            <button
              onClick={increments(setPets)}
              className="rounded-full border border-black-600  px-2 py-[2px]"
            >
              +
            </button>
          </div>
        </div>
      ) : (<> </>)}

      <div className='flex p-4 px-6  justify-between bg-slate-100 rounded-full mb-2'>
        <label className='font-normal  text-right  text-[16px] md:text-lg text-slate-600 ' style={{ marginRight: '10px' }}>

          Events Allowed :
        </label>
        <div className='flex'>
          <span onClick={() => setEventsAllowed(1)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '24px', width: '24px', fill: 'currentcolor', marginRight: '15px', borderRadius: '50%', border: eventsAllowed ? '3px solid green' : '2px solid transparent' }}>
              <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
            </svg>
          </span>
          <span onClick={() => setEventsAllowed(0)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '22px', width: '22px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !eventsAllowed ? '3px solid red' : '2px solid transparent' }}>
              <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
            </svg>
          </span>
        </div>
      </div>

      <div className='flex p-4 px-6  justify-between bg-slate-100 rounded-full mb-2'>
        <label className='font-normal  text-right text-[16px] md:text-lg text-slate-600 ' style={{ marginRight: '10px' }}>

          Quiet Hours:
        </label>
        <div className='flex'>
          <span onClick={() => setQuietHours(1)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '24px', width: '24px', fill: 'currentcolor', marginRight: '15px', borderRadius: '50%', border: quietHours ? '3px solid green' : '2px solid transparent' }}>
              <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
            </svg>
          </span>
          <span onClick={() => setQuietHours(0)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '22px', width: '22px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !quietHours ? '3px solid red' : '2px solid transparent' }}>
              <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
            </svg>
          </span>
        </div>
      </div>
      {quietHours ? (
        <div className=" p-2 px-6  justify-between bg-slate-100 rounded-full mb-2">
         
          <div className="flex justify-between space-x-4">
            <div className="w-1/2">
              <div className="flex justify-between space-x-4">
                <div className="w-full relative">
                  <select
                    value={checkinTime}
                    onChange={(e) => setCheckinTime(e.target.value)}
                    className="block w-full px-3 py-3 border-0 rounded-xl sm:text-sm "
                  >
                    <option value="00:00:00">12:00 AM</option>
                    <option value="01:00:00">1:00 AM</option>
                    <option value="02:00:00">2:00 AM</option>
                    <option value="03:00:00">3:00 AM</option>
                    <option value="04:00:00">4:00 AM</option>
                    <option value="05:00:00">5:00 AM</option>
                    <option value="06:00:00">6:00 AM</option>
                    <option value="07:00:00">7:00 AM</option>
                    <option value="08:00:00">8:00 AM</option>
                    <option value="09:00:00">9:00 AM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="11:00:00">11:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="13:00:00">1:00 PM</option>
                    <option value="14:00:00">2:00 PM</option>
                    <option value="14:00:00">2:00 PM</option>
                    <option value="15:00:00">3:00 PM</option>
                    <option value="16:00:00">4:00 PM</option>
                    <option value="17:00:00">5:00 PM</option>
                    <option value="18:00:00">6:00 PM</option>
                    <option value="19:00:00">7:00 PM</option>
                    <option value="20:00:00">8:00 PM</option>
                    <option value="21:00:00">9:00 PM</option>
                    <option value="22:00:00">10:00 PM</option>
                    <option value="23:00:00">11:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <select
                value={checkoutTime}
                onChange={(e) => setCheckoutTime(e.target.value)}
                className=" block w-full px-3 py-3 border-0 bg-white rounded-xl sm:text-sm "
              >
                <option value="00:00:00">12:00 AM</option>
                <option value="01:00:00">1:00 AM</option>
                <option value="02:00:00">2:00 AM</option>
                <option value="03:00:00">3:00 AM</option>
                <option value="04:00:00">4:00 AM</option>
                <option value="05:00:00">5:00 AM</option>
                <option value="06:00:00">6:00 AM</option>
                <option value="07:00:00">7:00 AM</option>
                <option value="08:00:00">8:00 AM</option>
                <option value="09:00:00">9:00 AM</option>
                <option value="10:00:00">10:00 AM</option>
                <option value="11:00:00">11:00 AM</option>
                <option value="12:00:00">12:00 PM</option>
                <option value="13:00:00">1:00 PM</option>
                <option value="14:00:00">2:00 PM</option>
                <option value="14:00:00">2:00 PM</option>
                <option value="15:00:00">3:00 PM</option>
                <option value="16:00:00">4:00 PM</option>
                <option value="17:00:00">5:00 PM</option>
                <option value="18:00:00">6:00 PM</option>
                <option value="19:00:00">7:00 PM</option>
                <option value="20:00:00">8:00 PM</option>
                <option value="21:00:00">9:00 PM</option>
                <option value="22:00:00">10:00 PM</option>
                <option value="23:00:00">11:00 PM</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}



      <div className='flex p-4 px-6  justify-between bg-slate-100 rounded-full mb-2'>
        <label className='font-normal  text-right  md:text-lg text-[16px] text-slate-600' style={{ marginRight: '10px' }}>
          Smoking Allowed:
        </label>
        <div className='flex'>
          <span onClick={() => setSmokingAllowed(1)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '24px', width: '24px', fill: 'currentcolor', marginRight: '15px', borderRadius: '50%', border: smokingAllowed ? '3px solid green' : '2px solid transparent' }}>
              <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
            </svg>
          </span>
          <span onClick={() => setSmokingAllowed(0)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '22px', width: '22px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !smokingAllowed ? '3px solid red' : '2px solid transparent' }}>
              <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
            </svg>
          </span>
        </div>
      </div>

      <div className='flex p-4 px-6  justify-between bg-slate-100 rounded-full mb-2'>
        <label className='font-normal  text-right  md:text-lg text-[16px] text-slate-600' style={{ marginRight: '10px' }}>

          Photography Allowed :
        </label>
        <div className='flex'>
          <span onClick={() => setPhotographyAllowed(1)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '24px', width: '24px', fill: 'currentcolor', marginRight: '15px', borderRadius: '50%', border: PhotographyAllowed ? '3px solid green' : '2px solid transparent' }}>
              <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
            </svg>
          </span>
          <span onClick={() => setPhotographyAllowed(0)} style={{ cursor: 'pointer' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{padding: '2px', display: 'block', height: '22px', width: '22px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !PhotographyAllowed ? '3px solid red' : '2px solid transparent' }}>
              <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default HouseRules;
