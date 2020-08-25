import { fetchMeta } from "./fetch_meta";

const { Command } = require('commander');
const program = new Command();

program
    .option('-url, --url <value>', 'absolute url of website');

program.parse(process.argv);

if (program.url) {
    fetchMeta(program.url);
}