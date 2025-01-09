type UUID = string;

interface UserDeviceInfo {
  browser: string | undefined;
  version: string | undefined;
  os: string | undefined;
  platform: string | undefined;
  origin: string | undefined;
}

interface NewSession {
  userId: UUID;
  refreshToken: string;
  ip: string | string[] | undefined;
  device: UserDeviceInfo;
}

export { NewSession };
