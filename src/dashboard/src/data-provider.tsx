import { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from "@microsoft/signalr";
import {
  devicesDescriptionsSelector,
  devicesSelector
} from "./dashboard-state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DeviceDescription, DevicePropertyChangedModel } from "./models";

type ChildrenProps = {
  error?: string;
  devicesConfiguration?: DeviceDescription[];
  onStreamStart: () => Promise<void>;
  onStreamStop: () => Promise<void>;
};

type Props = {
  url: string;
  children: (childrenProps: ChildrenProps) => JSX.Element;
};

class DataHub {
  private connection: HubConnection;

  constructor(
    url: string,
    handleDevicePropertyChangedFn: (data: [DevicePropertyChangedModel]) => void
  ) {
    this.connection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Information)
      .build();
    this.connection.on(
      "DevicePropertyChangedEvent",
      handleDevicePropertyChangedFn
    );
  }

  start(): Promise<void> {
    return this.connection!.start();
  }

  stop() {
    return this.connection!.stop();
  }
}

export const DataProvider = (props: Props) => {
  const { url, children } = props;
  const devicesConfiguration = useRecoilValue(devicesDescriptionsSelector);
  const [error, setError] = useState<string>();
  const setDevice = useSetRecoilState(devicesSelector);
  const [dataHub, setDataHub] = useState<DataHub | null>(null);

  useEffect(() => {
    const _dataHub = new DataHub(url, handleDevicePropertyChanged);
    setDataHub(_dataHub);
    return () => {
      _dataHub.stop();
    };
    // eslint-disable-next-line
  }, []);

  const handleDevicePropertyChanged = (data: [DevicePropertyChangedModel]) => {
    setDevice(data[0].Payload);
  };

  const handleStartStream = (): Promise<void> => {
    setError("");
    return dataHub!.start().catch((err: TypeError) => {
      setError(err.message);
      return Promise.reject();
    });
  };

  const handleStopStream = (): Promise<void> => {
    return dataHub!.stop();
  };

  if (!devicesConfiguration) {
    return null;
  }

  return children({
    onStreamStart: handleStartStream,
    onStreamStop: handleStopStream,
    error,
    devicesConfiguration
  });
};
