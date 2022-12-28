import { getSubscriber } from "rempl";

export const remoteSubscriber = getSubscriber();

export const remoteSetEnabled = async (enabled: boolean) => {
  const method = remoteSubscriber.getRemoteMethod("setEnabled");

  if (method.available) {
    return await method(enabled);
  }
};
