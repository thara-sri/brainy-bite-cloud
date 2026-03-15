import type { ResourcesConfig } from "aws-amplify";

export const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: "",
      userPoolClientId: "",
    },
  },
};
