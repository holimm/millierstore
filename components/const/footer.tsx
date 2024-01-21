import { ReactElement } from "react";

interface ListItemModel {
  name: string;
}

const PageFooter = () => {
  function Title(props: ListItemModel) {
    return <h1 className="text-2xl font-semibold">{props.name}</h1>;
  }
  function ListItem(props: ListItemModel) {
    return (
      <li className="mt-5 text-md font-thin cursor-pointer hover:text-neutral-800 hover:underline hover:underline-offset-4 ">
        <h1>{props.name}</h1>
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
            <ListItem name="About Raijin" />
            <ListItem name="Contact Us" />
            <ListItem name="Blog" />
            <ListItem name="Privacy" />
          </ul>
        </div>
        <div className="h-full w-full">
          <Title name="Support" />
          <ul>
            <ListItem name="Product Support" />
            <ListItem name="Contact Support" />
            <ListItem name="Refund Policy" />
            <ListItem name="Warranty" />
            <ListItem name="Shipping Information" />
          </ul>
        </div>
        <div className="h-full w-full hidden md:block">
          <Title name="Raijin Limited" />
          <ul className="flex justify-start items-center">
            {/* <ListItemSocialMedia image="../assets/icon/social_media/facebook.svg"/>
                        <ListItemSocialMedia image="../assets/icon/social_media/youtube.svg"/>
                        <ListItemSocialMedia image="../assets/icon/social_media/instagram.svg"/>
                        <ListItemSocialMedia image="../assets/icon/social_media/twitter.svg"/> */}
          </ul>
        </div>
      </div>
      <div className="h-full w-11/12 mx-auto mt-10 block md:hidden">
        <Title name="Raijin Limited" />
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
          Copyright © 2022 Raijin Limited - All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PageFooter;
