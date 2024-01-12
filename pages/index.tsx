import { VideoPlayer } from "@/components/videoPlayer";
import { Card, Image, Typography } from "antd";

export default function Home() {
  const renderProductCard = () => {
    return (
      <Card
        className="!p-0 border-neutral-500/20"
        cover={
          <div className="pl-3 pr-3 pt-3">
            <Image
              className="rounded-xl !rounded-b-xl"
              src="https://images.pexels.com/photos/18245913/pexels-photo-18245913/free-photo-of-microphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        }
      >
        <Typography className="text-lg">Razer</Typography>
        <Typography className="text-xl font-bold mt-1">
          Razer Seiren X
        </Typography>
        <Typography className="text-lg mt-2">25$</Typography>
      </Card>
    );
  };
  return (
    <main className={`h-fit w-full bg-slate-50`}>
      <div className="h-[80vh] w-full relative bg-slate-500">
        <div className="h-full w-full absolute">
          <div className="h-full w-full">
            <div className="h-full w-full relative object-fill overflow-hidden">
              <VideoPlayer urlVideo="./assets/videos/homepage_video.mp4" />
            </div>
          </div>
          <div className="h-full w-full bg-black/50 absolute top-0"></div>
        </div>
      </div>

      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto pt-24">
          <Typography.Title className="text-center">
            Explore Categories
          </Typography.Title>
          <div className="h-fit w-full mx-auto mt-10 grid grid-cols-3 gap-20">
            <div className="h-48 w-full bg-slate-500 rounded-xl"></div>
            <div className="h-48 w-full bg-slate-500 rounded-xl"></div>
            <div className="h-48 w-full bg-slate-500 rounded-xl"></div>
          </div>
        </div>
        <div className="h-fit w-3/4 mx-auto py-20">
          <Typography.Title className="text-center">
            Featured Products
          </Typography.Title>
          <Typography.Paragraph className="text-center text-lg">
            Discover our latest collection of high-quality products
          </Typography.Paragraph>
          <div className="h-full w-full py-10 grid grid-cols-4 gap-10">
            {renderProductCard()}
            {renderProductCard()}
            {renderProductCard()}
            {renderProductCard()}
            {renderProductCard()}
          </div>
        </div>
        <div className="h-60 w-full bg-slate-500"></div>
        <div className="h-fit w-3/4 mx-auto pt-20 pb-10">
          <Typography.Title className="text-center">
            New Arrival
          </Typography.Title>
          <Typography.Paragraph className="text-center text-lg">
            Introducing our latest collection
          </Typography.Paragraph>
          <div className="h-full w-full py-10 grid grid-cols-4 gap-10">
            {renderProductCard()}
            {renderProductCard()}
            {renderProductCard()}
            {renderProductCard()}
            {renderProductCard()}
          </div>
        </div>
        <div className="h-fit w-3/4 mx-auto pb-32">
          <div className="h-fit w-full grid grid-cols-2 gap-10">
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
          </div>
          <div className="h-fit w-full grid grid-cols-3 gap-20 mt-10">
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
