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
        Your browser doesn't support HTML5 video tag.
      </video>
    </>
  );
};
