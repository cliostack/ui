#!/usr/bin/env node
import { Command } from "commander";
import { getVersion } from "./utils/getVersion";
import { add } from "./commands/add";
import { getConfig } from "./utils/config";

async function main() {
    const version = await getVersion();
    const program = new Command();
    program.name("ClioX UI").description("ClioX UI CLI").version(version);
    program.addCommand(add)
    await program.parseAsync(process.argv);
}

main();
