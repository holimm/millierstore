import { CustomText } from "@/components/homePage/common";
import { ProductDetailType } from "@/models/productDetailModel";

export default function SpecificationTab({
  checkProductExist,
  productDetail,
  productCode,
}: {
  checkProductExist: boolean;
  productDetail: ProductDetailType;
  productCode: string;
}) {
  return (
    <table className="w-full table-auto">
      <tbody className="[&>*:nth-child(odd)]:bg-neutral-100 [&>*:nth-child(even)]:bg-inherit">
        {checkProductExist &&
          productDetail[productCode].specs.map((item) => (
            <tr>
              <td className="pl-4 pr-10">
                <CustomText
                  type="paragraph"
                  extraClass="!text-black !text-lg !font-semibold"
                >
                  {item.label}
                </CustomText>
              </td>
              <td className="py-4">
                <CustomText
                  type="paragraph"
                  extraClass="!text-black !text-lg !font-sf_pro_text_light"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  ></div>
                </CustomText>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
