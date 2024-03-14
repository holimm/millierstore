import { isEmpty } from "lodash";

export const VideoPlayer = ({
  urlVideo,
  extraClass,
}: {
  urlVideo: string;
  extraClass?: string;
}) => {
  return (
    <>
      <video
        className={`${
          !isEmpty(extraClass) && extraClass
        } scale-[4.2] sm:scale-[3] md:scale-[2.3] lg:scale-[1.6] xl:scale-100`}
        controls={false}
        muted
        loop
        autoPlay
      >
        <source src={urlVideo} type="video/mp4" />
        Your browser doesn&apos;t support HTML5 video tag.
      </video>
    </>
  );
};

export const VideoPlayerYoutube = ({
  urlVideo,
  extraClass,
}: {
  urlVideo: string;
  extraClass?: string;
}) => {
  return (
    <iframe
      className={`aspect-video ${!isEmpty(extraClass) && extraClass}`}
      width="100%"
      height="100%"
      src={urlVideo}
    ></iframe>
  );
};
