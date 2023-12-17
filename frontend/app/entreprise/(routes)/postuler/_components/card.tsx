"use client";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Cherry } from "lucide-react";
import Toast from "react-hot-toast";

import Modify from "./Modify";

interface CardProps {
  id: string;
  title: string;
  place: string;
  duration: number;
}

const Card = ({ id, title, place, duration }: CardProps) => {
  const deleteOffer = async (offerId: string) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/offre/${offerId}`);
      if (res) {
        Toast.success("Offer deleted Successfully");
      }
    } catch (error) {
      Toast.error("Error");
    }
  };

  return (
    <div
      className="flex flex-row justify-between  items-center h-full px-5 py-4 bg-white
                    w-full xl:w-[60%] 2xl:w-[40%]  rounded-3xl "
    >
      <div className="flex gap-2 ">
        <div className="flex items-center justify-center w-16 bg-[#cbf5a9] p-2 rounded-2xl">
          {/* <Image src="/facebook.png" width="50" height="50" alt="google" /> */}
          <Cherry className="w-6 h-6" />
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{place}</p>
          <p className="text-sm ">{duration}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        
        <Modify 
          id={id}
          title={title}
          place={place}
          duration={duration}
        />
        <Button variant="destructive" onClick={() => deleteOffer(id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;