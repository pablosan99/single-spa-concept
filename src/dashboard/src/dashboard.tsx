import React, { useState } from "react";
import { DeviceDescription } from "./models";
import { useRecoilValue } from "recoil";
import { deviceSelector } from "./dashboard-state";
// import styles from "./dashboard.module.css";

type Props = {
  onStreamStart: () => Promise<void>;
  onStreamStop: () => Promise<void>;
  error?: string;
  devicesConfiguration?: DeviceDescription[];
};

export function Dashboard(props: Props) {
  const { onStreamStart, onStreamStop, error, devicesConfiguration } = props;

  const [isOn, setIsOn] = useState(false);

  const handleFire = () => {
    onStreamStart().then(
      () => {
        setIsOn(true);
      },
      () => {
        console.log("rejected");
      }
    );
  };

  const handleStreamOff = () => {
    onStreamStop().then(() => {
      setIsOn(false);
    });
  };

  return (
    <div className="root">
      <section className="header">
        <h1 className={"title"}>Dashboard</h1>
        <button
          className={"button"}
          onClick={() => (isOn ? handleStreamOff() : handleFire())}
        >
          {isOn ? "OFF" : "ON"}
        </button>
      </section>
      {error && <section className="error">{error}</section>}
      <div className="dashboard">
        <div className="dashboardInner">
          {devicesConfiguration?.map((item, idx) => (
            <DeviceRenderer key={idx} id={idx + 1} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

type ItemRendererProps = {
  id: number;
  item: DeviceDescription;
};

const DeviceRenderer = (props: ItemRendererProps) => {
  const key = `${
    props.item.DeviceInstanceId
  }-${props.item.Product.Model.toUpperCase()}`;
  const data = useRecoilValue(deviceSelector(key));
  // const [data2, setData2] = useRecoilState(deviceItemState(key));

  return (
    <div key={props.id} className="item">
      <div>{props.item.DeviceInstanceId}</div>
      <div>
        {data && data.Payload ? (
          <DisplayDeviceCard {...data.Payload} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

const DisplayDeviceCard = (props: {
  Channels: {
    Id: number;
    RfQuality: number;
  }[];
  DetailsSequence: number;
  DeviceInstanceId: number;
  Sequence: number;
}) => {
  return (
    <div>
      <div>DetailsSequence: {props.DetailsSequence}</div>
      <div>DeviceInstanceId: {props.DeviceInstanceId}</div>
      <div>
        {props.Channels.map((channel, idx) => {
          return (
            <div key={idx}>
              <div>ChannelId: {channel.Id}</div>
              <div>RfQuality: {channel.RfQuality}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
