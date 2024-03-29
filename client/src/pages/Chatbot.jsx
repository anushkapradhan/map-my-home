import React, {useEffect} from 'react';
import { Button } from "@material-tailwind/react";
import alanBtn from "@alan-ai/alan-sdk-web";

const apiKey = import.meta.env.VITE_BLOG_API_KEY_3;

const FeatureCard = ({ heading, subheading, buttonText }) => {
  return (
    <center>
      <div className="flex justify-around max-w-sm rounded overflow-hidden shadow-lg m-4">
        <div className="px-6 py-4 h-52">
          <div className="font-bold text-xl mb-2">{heading}</div>
          <p className="text-gray-700 text-base">{subheading}</p>
          <div className="px-6 pt-4 pb-2 ">
          <Button className="flex flex-row items-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {buttonText}{"  "}
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </div>
        </div>
      </div>
    </center>
  );
};

const Chatbot = () => {
  useEffect(() => {
    alanBtn({
      key: apiKey
    });
  }, []);

  return (
    <>
    <p className='text-pretty text-center text-6xl font-bold text-blue3 pt-10 pb-4'> Realtor </p>
    <p className='text-pretty text-center text-2xl font-bold text-gray-700 pb-12'>- AI powered Bot</p>
    <div className="flex justify-center">
      <FeatureCard
        heading="Personalized Property Recommendations"
        subheading="Discover properties tailored to your preferences"
        buttonText="Explore Now"
      />
      <FeatureCard
        heading="Instant Assistance on Demand by bot"
        subheading="Get real-time answers and clear all your questions"
        buttonText="Get Assistance"
      />
      <FeatureCard
        heading="Instant Insights for Properties you want"
        subheading="Receive detailed information about properties instantly"
        buttonText="Get Insights"
      />
    </div>
    </>
  );
};

export default Chatbot;
