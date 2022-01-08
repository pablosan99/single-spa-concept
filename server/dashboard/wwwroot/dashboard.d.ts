/// <reference types="react" />
import { DeviceDescription } from "./models";
declare type Props = {
    onStreamStart: () => Promise<void>;
    onStreamStop: () => Promise<void>;
    error?: string;
    devicesConfiguration?: DeviceDescription[];
};
export declare function Dashboard(props: Props): JSX.Element;
export {};
