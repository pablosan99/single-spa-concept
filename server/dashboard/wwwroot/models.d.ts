export declare type DevicePropertyChangedModel = {
    Id: string;
    Payload: DeviceDiffModel[];
    Type: string;
};
export declare type DeviceDescription = {
    DeviceInstanceId: number;
    Sequence: number;
    DetailsSequence: number;
    Device: {
        Firmware: {
            Interface: string;
            Version: string;
            Progress: null;
            State: string;
            LastFirmwareUpdateImageId: number | null;
            Error: {
                ErrorMessage: string | null;
                ErrorCode: string | null;
            };
        };
        Warnings: [];
        Name: string;
        Serial: string;
        State: string;
        PairingProgress: string | null;
        Autolock: boolean;
        MuteSwitchActive: boolean;
        DisplayBrightness: number;
        Location: string;
    };
    Product: {
        Type: string;
        Vendor: string;
        Family: string;
        Model: string;
    };
    Connection: {
        Established: boolean;
        LastOnline: string;
        DataValid: boolean;
    };
    Channels: {
        Id: number;
        Name: string;
        Banks: string | null;
        Frequency: string | null;
        ActiveBankIndex: string | null;
        ActiveChannelIndex: string | null;
        PilotTone: boolean;
        Squelch: string | null;
        Firmware: {
            Version: string | null;
            State: string;
            Progress: string | null;
        };
        State: string;
        Type: string;
        Active: boolean;
        RfPowerMode: string;
        RfQuality: number;
        WalkTest: boolean;
        RfSync: {
            Rfpi: string;
            SyncState: string;
            Master: {
                DeviceInstanceId: number;
                DeviceName: string;
                LocationName: string;
                Rfpi: string;
                ConnectionEstablished: boolean;
                SyncState: string;
            };
            Followers: number[];
            Mode: string;
        };
        Warnings: string[];
        Battery: string | null;
        CapsuleType: string;
        Audio: {
            EqualizerSettings: {
                EqualizerCustom: number[];
                EqualizerPreset: string;
            };
            Label: [string];
            LevelDb: number;
            LowCut: boolean;
            OutputGain: number;
            EffectsReset: string | null;
            Mute: boolean;
            AutomaticGainControl: string;
            MuteMode: string;
            LocationBasedMute: string | null;
        };
        PowerLock: boolean;
        PairLock: boolean;
        AutoPowerOff: string;
    }[];
};
export declare type DeviceId = {
    DeviceId: number;
    DeviceType: string;
};
export declare type DeviceDiffModel = {
    IsFast: boolean;
    Payload: {
        Channels: {
            Id: number;
            RfQuality: number;
        }[];
        DetailsSequence: number;
        DeviceInstanceId: number;
        Sequence: number;
    };
} & DeviceId;
export declare const emptyDeviceDiffModel: DeviceDiffModel;
