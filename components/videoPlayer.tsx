import { useEffect, useState } from "react";

export const VideoPlayer = ({ urlVideo }: { urlVideo: string }) => {
  return (
    <>
      <video
        className="scale-[4.2] sm:scale-[3] md:scale-[2.3] lg:scale-[1.6] xl:scale-100 "
        controls
        muted
        loop
        autoPlay
      >
        <source src={urlVideo} type="video/mp4" />
        Your browser doesn't support HTML5 video tag.
      </video>
    </>
  );
};
