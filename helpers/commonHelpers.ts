import { CartType } from "@/models/cartModel";
import { Breakpoint, message, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

export function NumberToDollarFormat(number: number | undefined) {
  let usd;
  if (number !== undefined)
    usd = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  return usd;
}

interface dataMessageNotificationType {
  type: "success" | "error" | "info" | "warning" | "loading";
  content: string;
  onClose?: Function;
}

export function notificationMessage(data: dataMessageNotificationType) {
  switch (data.type) {
    case "success":
      message.success(data.content);
      break;
    case "error":
      message.error(data.content);
      break;
    case "info":
      message.info(data.content);
      break;
    case "warning":
      message.warning(data.content);
      break;
    case "loading":
      message.loading(data.content);
      break;
  }
}

export const calculateCartTotal = (cartList: CartType[]) => {
  let total = 0;
  cartList.map((item: CartType) => {
    total += item.price * item.quantity;
  });
  return total;
};

export const generateUUIDToken = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getTotalCarouselSlide = (
  screenSize: Partial<Record<Breakpoint, boolean>>
) => {
  if (screenSize.xl) return 4;
  if (screenSize.lg) return 3;
  if (screenSize.md) return 3;
  if (screenSize.sm) return 2;
  if (screenSize.xs) return 2;
};
