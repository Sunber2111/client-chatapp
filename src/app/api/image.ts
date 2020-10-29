import request from "./agent";

const imageApi = {
  sendImage: (data: string) => request.postForm("image", data),
};

export default imageApi;
