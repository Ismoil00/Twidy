interface CorsOptions {
  origin: (
    origin: string,
    callback: (error: Error | null, allow: boolean) => void
  ) => void;
  optionsSuccessStatus: number;
  methods: string;
  preflightContinue: boolean;
  credentials: boolean;
}

export { CorsOptions };
