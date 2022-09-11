const isLoggingEnabled = process.env.LOGGING_ENABLED === "true";

const logger = (...args: any[]) => {
  if (isLoggingEnabled) {
    console.log(...args);
  }
};

export default logger;
