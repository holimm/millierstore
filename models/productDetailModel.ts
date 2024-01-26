import { Variants } from "framer-motion";

export interface ProductDetailType {
  _id?: string;
  name?: string;
  name_lower?: string;
  description?: {
    label: string;
    type: string;
    content: {
      text: string;
      image: string;
    }[];
  }[];
  specs?: {
    label: string;
    key: string;
    content: string;
  }[];
  images?: {
    [key: string]: string[];
  };
  colors?: {
    label: string;
    lowercase: string;
    color: string;
  }[];
  storage?: {
    capacity: number;
    unit: string;
    price: number;
  }[];
}

export interface ProductColorType {
  color?: string;
  label?: string;
  image?: string;
  lowercase?: string;
}

export interface ProductStorageType {
  capacity?: number;
  unit?: string;
  price?: number;
}

export const productDescriptionImageVariants: Variants = {
  offscreen: {
    backgroundSize: "150%",
  },
  onscreen: {
    backgroundSize: "100%",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

export const productDescriptionVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};
