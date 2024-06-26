import { Types, Schema, model, HydratedDocument } from "mongoose";

export enum ControlType {
  MANUAL = "MANUAL",
  AUTO = "AUTO",
}

interface Record {
  timestamp: Date;
  deviceId: Types.ObjectId;
}

interface TemperatureRecord extends Record {
  temperature: number;
}

interface HumidityRecord extends Record {
  humidity: number;
}

interface LightRecord extends Record {
  lightLevel: number;
}

interface FanRecord extends Record {
  speed: number;
  controlType: ControlType;
  totalTime?: number;
}

interface LedRecord extends Record {
  status: boolean;
  controlType: ControlType;
  description: string;
  totalTime?: number;
}

interface DoorRecord extends Record {
  status: boolean;
}

export type RecordDocument = HydratedDocument<Record>;

const recordSchema = new Schema<Record>(
  {
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
      immutable: true,
    },
    deviceId: {
      type: Schema.Types.ObjectId,
      ref: "Device",
      // required: true,
    },
  },
  {
    discriminatorKey: "type",
  }
);

const RecordModel = model<Record>("Record", recordSchema);

const TemperatureRecordModel = RecordModel.discriminator<TemperatureRecord>(
  "TemperatureRecord",
  new Schema<TemperatureRecord>({
    temperature: {
      type: Number,
      required: true,
    },
  })
);

const HumidityRecordModel = RecordModel.discriminator<HumidityRecord>(
  "HumidityRecord",
  new Schema<HumidityRecord>({
    humidity: {
      type: Number,
      required: true,
    },
  })
);

const LightRecordModel = RecordModel.discriminator<LightRecord>(
  "LightRecord",
  new Schema<LightRecord>({
    lightLevel: {
      type: Number,
      required: true,
    },
  })
);

const FanRecordModel = RecordModel.discriminator<FanRecord>(
  "FanRecord",
  new Schema<FanRecord>({
    speed: {
      type: Number,
      required: true,
    },
    controlType: {
      type: String,
      required: true,
      default: ControlType.MANUAL,
    },
    totalTime: {
      type: Number,
    },
  })
);

const LedRecordModel = RecordModel.discriminator<LedRecord>(
  "LedRecord",
  new Schema<LedRecord>({
    status: {
      type: Boolean,
      required: true,
    },
    controlType: {
      type: String,
      required: true,
      default: ControlType.MANUAL,
    },
    description: {
      type: String,
      required: true,
    },
    totalTime: {
      type: Number,
    },
  })
);

const DoorRecordModel = RecordModel.discriminator<DoorRecord>(
  "DoorRecord",
  new Schema<DoorRecord>({
    status: {
      type: Boolean,
      required: true,
    },
  })
);

export {
  RecordModel,
  TemperatureRecordModel,
  HumidityRecordModel,
  LightRecordModel,
  FanRecordModel,
  LedRecordModel,
  DoorRecordModel,
};
