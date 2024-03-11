import { ResponseBEType } from "@/models/common";
import axiosMongo from "@/network/axiosMongo";
import { ContactFormType } from "@/models/contactModel";

const contactService = {
  async createContactNode(
    values: ContactFormType
  ): Promise<ResponseBEType<string>> {
    const result = await axiosMongo.post(`/api/contacts/create`, values);
    return result.data as any;
  },
};

export default contactService;
