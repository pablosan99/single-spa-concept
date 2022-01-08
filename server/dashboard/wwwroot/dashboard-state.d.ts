import { DeviceDescription, DeviceDiffModel } from "./models";
export declare const devicesState: import("recoil").RecoilState<Map<string, DeviceDiffModel>>;
export declare const devicesDescriptionsSelector: import("recoil").RecoilValueReadOnly<DeviceDescription[]>;
export declare const deviceItemState: (param: string) => import("recoil").RecoilState<DeviceDiffModel>;
export declare const deviceSelector: (param: string) => import("recoil").RecoilValueReadOnly<DeviceDiffModel>;
export declare const devicesSelector: import("recoil").RecoilState<DeviceDiffModel[]>;
