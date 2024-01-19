import { XConstants } from "@/x/x.constants";
import { XEnvironment } from "@/x/x.schema";
import prompts from "prompts";


export const questions = {
  ask: {
    env: async () => {
      const response = await prompts({
        name: "env",
        type: 'select',
        message: "Select an environment",
        choices: [
          // { title: "React Natve", value: UIEnvironment.ReactNative },
          { title: "React DOM", value: XConstants.Environments[0] },
        ],
      })
      return response.env as XEnvironment
    }

  },
};
