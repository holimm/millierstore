import Link from "next/link";
import { ReactElement } from "react";

interface ListItemTitleModel {
  name: string;
}

interface ListItemModel {
  name: string;
  linkHref: string;
}

const PageFooter = () => {
  function Title(props: ListItemTitleModel) {
    return (
      <h1 className="text-2xl font-sf_pro_text_light font-semibold">
        {props.name}
      </h1>
    );
  }
  function ListItem(props: ListItemModel) {
    return (
      <li className="w-fit mt-5 text-md font-sf_pro_text_light font-thin cursor-pointer hover:text-neutral-800 hover:underline hover:underline-offset-4 ">
        <Link href={props.linkHref}>
          <h1>{props.name}</h1>
        </Link>
      </li>
    );
  }
  return (
    <div className="h-fit w-full text-black bg-gradient-to-r from-neutral-100 to-neutral-200 inline-block">
      {/* from-zinc-800 via-stone-900 to-neutral-900 */}
      <div className="h-full w-11/12 lg:w-3/4 mx-auto mt-10 grid grid-cols-2 md:mt-20 md:grid-cols-3">
        <div className="h-full w-full">
          <Title name="About Us" />
          <ul>
            <ListItem name="About Millier" linkHref="/about" />
            <ListItem name="Contact Us" linkHref="/contact" />
            <ListItem name="Blog" linkHref="/blogs" />
            <ListItem name="Privacy" linkHref="/" />
          </ul>
        </div>
        <div className="h-full w-full">
          <Title name="Support" />
          <ul>
            <ListItem name="Product Support" linkHref="/" />
            <ListItem name="Contact Support" linkHref="/" />
            <ListItem name="Refund Policy" linkHref="/" />
            <ListItem name="Warranty" linkHref="/" />
            <ListItem name="Shipping Information" linkHref="/" />
          </ul>
        </div>
        <div className="h-full w-full hidden md:block">
          <Title name="Millier Store" />
          <ul className="flex justify-start items-center">
            {/* <ListItemSocialMedia image="../assets/icon/social_media/facebook.svg"/>
                        <ListItemSocialMedia image="../assets/icon/social_media/youtube.svg"/>
                        <ListItemSocialMedia image="../assets/icon/social_media/instagram.svg"/>
                        <ListItemSocialMedia image="../assets/icon/social_media/twitter.svg"/> */}
          </ul>
        </div>
      </div>
      <div className="h-full w-11/12 mx-auto mt-10 block md:hidden">
        <Title name="Millier Store" />
        <ul className="flex justify-start items-center">
          {/* <ListItemSocialMedia image="../assets/icon/social_media/facebook.svg"/>
                    <ListItemSocialMedia image="../assets/icon/social_media/youtube.svg"/>
                    <ListItemSocialMedia image="../assets/icon/social_media/instagram.svg"/>
                    <ListItemSocialMedia image="../assets/icon/social_media/twitter.svg"/> */}
        </ul>
      </div>
      <hr className="h-full w-11/12  mx-auto my-6 border-black lg:w-10/12 md:mt-14 lg:mb-10"></hr>
      <div className="h-full w-11/12 lg:w-10/12 mx-auto pb-10">
        <p className="text-center lg:text-start">
          Copyright © 2024 Millier - All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PageFooter;
