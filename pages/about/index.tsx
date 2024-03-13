import { CustomText } from "@/components/homePage/common";
import { motion } from "framer-motion";
import { Card, Carousel, Divider, Flex, Typography } from "antd";
import { isEmpty } from "lodash";
import { ReactNode } from "react";

export default function Home() {
  const AboutUsText = ({
    children,
    topClass,
    extraClass,
  }: {
    children: ReactNode;
    topClass?: string;
    extraClass?: string;
  }) => {
    return (
      <CustomText
        type="paragraph"
        topClass={!isEmpty(topClass) ? topClass : ""}
        extraClass={`!text-black !text-lg ${!isEmpty(
          extraClass && extraClass
        )}`}
      >
        {children}
      </CustomText>
    );
  };

  const OurMissionCard = ({
    label,
    content,
  }: {
    label: string;
    content: string;
  }) => {
    return (
      <Card className="border-0 lg:border-2" hoverable>
        <AboutUsText topClass="!font-bold">{label}</AboutUsText>
        <AboutUsText>{content}</AboutUsText>
      </Card>
    );
  };

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full py-12 bg-gradient-to-r from-neutral-200 to-neutral-100">
        <div className="h-fit w-11/12 lg:w-3/4 mx-auto py-20 bg-white rounded-lg shadow-lg px-10">
          <div className="h-fit w-full">
            <Typography.Title className="text-center">
              <span className="!font-sf_pro !text-black">Millier</span>
              <br />
              <span className="!text-3xl !font-sf_pro !text-neutral-500">
                BY A THOUSAND
              </span>
            </Typography.Title>
            <AboutUsText topClass="!text-center">
              Founded in 2012, Millier has been dedicated to providing
              cutting-edge technology solutions to our customers since our
              inception. From our humble beginnings to our present-day
              operations, we have remained committed to delivering excellence in
              everything we do.
            </AboutUsText>
            <AboutUsText topClass="!text-center">
              Since 2012, we have continued to grow and evolve, expanding our
              product offerings and enhancing our services to meet the
              ever-changing needs of our valued customers.
            </AboutUsText>
          </div>
          <Divider className="my-10" />
          <div className="h-fit w-full lg:grid lg:grid-cols-3 relative">
            <motion.div
              className="h-[20em] lg:h-auto w-full bg-cover bg-center bg-no-repeat rounded-xl"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/6044829/pexels-photo-6044829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
                backgroundSize: "100%",
              }}
              whileHover={{ backgroundSize: "105%" }}
              transition={{ ease: "easeInOut" }}
            ></motion.div>
            {/* <Image
              src="https://images.pexels.com/photos/7652184/pexels-photo-7652184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              preview={false}
            /> */}
            <Flex
              className="h-fit lg:col-span-2"
              justify="center"
              align="center"
            >
              <div className="h-fit w-full mt-10 lg:mt-0 lg:pl-10">
                <Typography.Title className="text-start">
                  <span className="!font-sf_pro !text-black">About Us</span>
                </Typography.Title>
                <AboutUsText>
                  Welcome to Millier, your ultimate destination for cutting-edge
                  technology and premium accessories. Established with a passion
                  for innovation and customer satisfaction, we pride ourselves
                  on offering the latest smartphones, laptops, and accessories
                  to meet your tech needs.
                </AboutUsText>
                <AboutUsText>
                  At Millier, we believe in providing our customers with the
                  best in technology, ensuring that every product we offer is of
                  the highest quality and reliability. Whether you're looking
                  for the newest smartphone with groundbreaking features or a
                  sleek, powerful laptop for work or play, we have you covered.
                </AboutUsText>
                <AboutUsText>
                  Our commitment to excellence extends beyond our products; it's
                  ingrained in every aspect of our business. From our
                  knowledgeable and friendly staff to our seamless online
                  shopping experience, we strive to make your journey with us as
                  smooth and enjoyable as possible.
                </AboutUsText>
                <AboutUsText>
                  With a focus on customer satisfaction and innovation, we're
                  constantly evolving to bring you the latest advancements in
                  technology. Whether you're a tech enthusiast, a professional,
                  or someone in between, you can trust Millier to provide you
                  with the tools you need to stay connected, productive, and
                  entertained.
                </AboutUsText>
              </div>
            </Flex>
          </div>
          <Divider className="my-10" />
          <div className="h-fit w-full lg:grid lg:grid-cols-3 relative">
            <motion.div
              className="h-[20em] w-full bg-cover bg-center bg-no-repeat rounded-xl block lg:hidden"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/4065885/pexels-photo-4065885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
                backgroundSize: "100%",
              }}
              whileHover={{ backgroundSize: "105%" }}
              transition={{ ease: "easeInOut" }}
            ></motion.div>
            <Flex
              className="h-fit lg:col-span-2"
              justify="center"
              align="center"
            >
              <div className="h-fit w-full mt-10 lg:mt-0 lg:pr-10">
                <Typography.Title className="text-start">
                  <span className="!font-sf_pro !text-black">Our Story</span>
                </Typography.Title>
                <AboutUsText>
                  It all started with a shared belief that technology has the
                  power to transform lives and empower individuals. From the
                  very beginning, we set out to create a company that not only
                  offered cutting-edge products but also provided exceptional
                  service and support to our customers.
                </AboutUsText>
                <AboutUsText>
                  Driven by our passion for innovation, we embarked on a mission
                  to curate a selection of the finest smartphones, laptops, and
                  accessories, carefully handpicked to meet the diverse needs of
                  our customers. We believe that everyone deserves access to the
                  latest technology, and we're committed to making that a
                  reality for all.
                </AboutUsText>
                <AboutUsText>
                  As our company grew, so did our commitment to our customers.
                  We listened to your feedback, adapted to your changing needs,
                  and continually strived to exceed your expectations. Today,
                  Millier is not just a destination for tech enthusiasts; it's a
                  trusted partner for individuals and businesses alike,
                  providing the tools they need to thrive in an ever-evolving
                  digital world.
                </AboutUsText>
                <AboutUsText>
                  But our story doesn't end here. We're constantly looking
                  ahead, exploring new opportunities, and pushing the boundaries
                  of what's possible. As we continue to innovate and grow, we
                  remain steadfast in our commitment to delivering exceptional
                  products and experiences that inspire and empower our
                  customers.
                </AboutUsText>
              </div>
            </Flex>
            <motion.div
              className="h-auto w-full bg-cover bg-center bg-no-repeat rounded-xl hidden lg:block"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/4065885/pexels-photo-4065885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
                backgroundSize: "100%",
              }}
              whileHover={{ backgroundSize: "105%" }}
              transition={{ ease: "easeInOut" }}
            ></motion.div>
          </div>
          <Divider className="my-10" />
          <div className="h-fit w-full">
            <Typography.Title className="text-start">
              <span className="!font-sf_pro !text-black">Our Mission</span>
            </Typography.Title>
            <AboutUsText>
              At Millier, our mission is simple: to empower individuals and
              businesses with the latest technology and innovative solutions. We
              strive to be more than just a provider of products; we aim to be a
              trusted partner, guiding our customers towards success in an
              increasingly digital world.
            </AboutUsText>
            <AboutUsText>
              Our mission is anchored in three core principles:
            </AboutUsText>
            <div className="block lg:hidden mt-6">
              <Carousel draggable>
                <OurMissionCard
                  label="Innovation"
                  content="We are committed to staying at the forefront of technological
                  advancements, continuously seeking out new ideas and solutions
                  to meet the evolving needs of our customers. By embracing
                  innovation, we empower our customers to stay ahead of the
                  curve and unlock new opportunities for growth and success."
                />
                <OurMissionCard
                  label="Quality"
                  content="We believe in offering only the highest quality products and
                  services to our customers. From smartphones and laptops to
                  accessories and support, we ensure that every aspect of our
                  business meets the highest standards of excellence."
                />
                <OurMissionCard
                  label="Empowerment"
                  content="Our ultimate goal is to empower our customers to achieve their
                  full potential. Whether it's providing the tools they need to
                  work more efficiently, stay connected with loved ones, or
                  pursue their passions, we are dedicated to enabling
                  individuals and businesses to thrive in an increasingly"
                />
              </Carousel>
            </div>
            <div className="hidden lg:block">
              <div className="h-fit w-full mt-6 grid grid-cols-3 gap-5">
                <OurMissionCard
                  label="Innovation"
                  content="We are committed to staying at the forefront of technological
                  advancements, continuously seeking out new ideas and solutions
                  to meet the evolving needs of our customers. By embracing
                  innovation, we empower our customers to stay ahead of the
                  curve and unlock new opportunities for growth and success."
                />
                <OurMissionCard
                  label="Quality"
                  content="We believe in offering only the highest quality products and
                  services to our customers. From smartphones and laptops to
                  accessories and support, we ensure that every aspect of our
                  business meets the highest standards of excellence."
                />
                <OurMissionCard
                  label="Empowerment"
                  content="Our ultimate goal is to empower our customers to achieve their
                  full potential. Whether it's providing the tools they need to
                  work more efficiently, stay connected with loved ones, or
                  pursue their passions, we are dedicated to enabling
                  individuals and businesses to thrive in an increasingly"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
