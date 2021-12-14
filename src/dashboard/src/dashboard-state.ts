import { atom, atomFamily, selector, selectorFamily } from "recoil";
import {
  DeviceDescription,
  DeviceDiffModel,
  emptyDeviceDiffModel
} from "./models";

const devicesUrl = "http://192.168.50.228:8181/api/devices";

const getDevices = async () => {
  return await fetch(devicesUrl)
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const devicesState = atom<Map<string, DeviceDiffModel>>({
  key: "devicesState",
  default: new Map()
});

const devicesComparer = (a: DeviceDescription, b: DeviceDescription) => {
  return a.DeviceInstanceId > b.DeviceInstanceId ? 1 : -1;
};

const sort = (devices: DeviceDescription[]) => {
  const copied = [...devices];
  copied.sort(devicesComparer);
  return copied as DeviceDescription[];
};

export const devicesDescriptionsSelector = selector<DeviceDescription[]>({
  key: "devicesDescriptionsSelector",
  get: () =>
    getDevices()
      .then(sort)
      .catch((err) => {
        console.log("getDevices error: ", err);
        return [];
      })
});

export const deviceItemState = atomFamily<DeviceDiffModel, string>({
  key: `deviceItem`,
  default: emptyDeviceDiffModel
});

export const deviceSelector = selectorFamily<DeviceDiffModel, string>({
  key: "deviceSelector",
  get:
    (key) =>
    ({ get }) => {
      const devices = get(devicesState);
      return devices.get(key) as DeviceDiffModel;
    }
});

export const devicesSelector = selector<DeviceDiffModel[]>({
  key: "devicesSelector",
  get: ({ get }) => {
    const mapDevices = get(devicesState);
    return Array.from(mapDevices.values());
  },
  set: ({ get, set }, newValue) => {
    const devices = newValue as DeviceDiffModel[];
    set(devicesState, (prev) => {
      devices.forEach((device) => {
        const key = `${device.DeviceId}-${device.DeviceType}`;
        let found = prev.has(key);
        if (found) {
          const existingDevice = prev.get(key);
          prev.set(key, { ...existingDevice, ...device });
          return;
        }
        prev.set(key, device);
      });
      return new Map(prev);
    });
  }
});
