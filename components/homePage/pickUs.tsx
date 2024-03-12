import { ReactNode } from "react";
import { CustomText } from "./common";
import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import { BsShop } from "react-icons/bs";

export const PickUs = () => {
  const renderPickUsItem = (objectText: {
    icon: ReactNode;
    title: string;
    description: string;
  }) => {
    return (
      <div className="h-[20em] w-full flex justify-start items-center shadow-md rounded-xl p-5 hover:scale-[1.01] transition-all">
        <div className="h-fit w-fit">
          {objectText.icon}
          <CustomText type="title" level={2} topClass="mt-4">
            {objectText.title}
          </CustomText>
          <CustomText type="paragraph" extraClass="!text-black !text-xl">
            {objectText.description}
          </CustomText>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="h-fit w-full grid grid-cols-3 gap-10 pb-20">
        {renderPickUsItem({
          icon: <CiCreditCard1 size={60} />,
          title: `Pay over time, interest-free.`,
          description: `Flexible payments, zero interest. Shop now and pay over time
            hassle-free.`,
        })}
        {renderPickUsItem({
          icon: <CiDeliveryTruck size={58} />,
          title: `Get flexible delivery and easy pickup.`,
          description: `Flexible delivery, convenient pickup options for seamless shopping experience.`,
        })}
        {renderPickUsItem({
          icon: <BsShop size={46} />,
          title: `Explore a shopping experience designed around you.`,
          description: `Discover a shopping journey crafted to match your unique preferences.`,
        })}
      </div>
    </>
  );
};
