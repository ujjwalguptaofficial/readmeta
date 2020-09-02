import { fetchMeta } from "./fetch_meta";

const { Command } = require('commander');
const program = new Command();

program
    .option('-url, --url <value>', 'absolute url of website')
    .option('-preview, --preview', 'preview tags in different popular application like whatsapp, facebook, twitter etc.');

program.parse(process.argv);

if (program.url) {
    fetchMeta(program.url, program.preview != null);
}