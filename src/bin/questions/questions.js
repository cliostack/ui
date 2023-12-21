import inquirer from "inquirer";

export const questions = {
  ask: {
    env: () =>
      inquirer
        .prompt([
          {
            type: "list",
            name: "environment",
            message: "Choose an environment",
            choices: ["React DOM", "React Native"],
          },
        ])
        .then((answers) => answers.environment),
  },
};
