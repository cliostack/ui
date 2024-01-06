import prompts from "prompts";

export enum UIEnvironment {
  ReactDOM = "dom",
}
export const questions = {
  ask: {
    env: async () => {
      const response = await prompts({
        name: "env",
        type: 'select',
        message: "Select an environment",
        choices: [
          // { title: "React Natve", value: UIEnvironment.ReactNative },
          { title: "React DOM", value: UIEnvironment.ReactDOM },
        ],
      })
      return response.env as UIEnvironment
    }

  },
};
