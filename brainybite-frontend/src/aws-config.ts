import type { ResourcesConfig } from "aws-amplify";

export const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: "ap-southeast-1_xxxxxxxxx",
      userPoolClientId: "xxxxxxxxxxxxxxxxx",
    },
  },
};
