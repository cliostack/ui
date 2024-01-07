#!/usr/bin/env node
import { Command } from "commander";
import { getVersion } from "./utils/version";
import { add } from "./commands/add";
import { init } from "./commands/init";

async function main() {
    const version = await getVersion();
    const program = new Command();
    program.name("ClioX UI").description("ClioX UI CLI").version(version);
    program.addCommand(add)
    program.addCommand(init)
    await program.parseAsync(process.argv);
}

main();
