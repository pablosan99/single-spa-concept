/// <reference types="react" />
import { DeviceDescription } from "./models";
declare type ChildrenProps = {
    error?: string;
    devicesConfiguration?: DeviceDescription[];
    onStreamStart: () => Promise<void>;
    onStreamStop: () => Promise<void>;
};
declare type Props = {
    url: string;
    children: (childrenProps: ChildrenProps) => JSX.Element;
};
export declare const DataProvider: (props: Props) => JSX.Element;
export {};
