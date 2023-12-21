import prompts from "prompts";

export enum Environment {
  ReactNative = "react-native",
  React = "react",
}
export const questions = {
  ask: {
    env: async () => {
      const response = await prompts({
        name: "env",
        type: 'select',
        message: "Select an environment",
        choices: [
          { title: "React Natve", value: Environment.ReactNative },
          { title: "React", value: Environment.React },
        ],
      })
      return response.env as Environment
    }

  },
};
