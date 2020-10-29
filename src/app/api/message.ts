import { IMessageItem, IResponseGetMessageContent } from "app/models/message";
import request from "./agent";

const messageApi = {
  getListMessage: (): Promise<IMessageItem[]> =>
    request.get("message/getByIdUser"),
  getContentMessage: (
    conversationIid: string
  ): Promise<IResponseGetMessageContent> =>
    request.get("message/getMessageContent?conversationId=" + conversationIid),
};

export default messageApi;
