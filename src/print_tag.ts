export function printTag(tagMap) {

    const print = (message) => {
        console.log(message);
    }

    for (const category in tagMap) {
        const categoryContent = tagMap[category];
        if (Object.keys(categoryContent).length == 0) {
            return;
        }
        console.log(`--------------------------${category}------------------------------`);
        console.log("");
        for (const meta in categoryContent) {
            const metaContent = categoryContent[meta];
            if (metaContent) {
                console.log(`${meta} : ${typeof metaContent === "object" ? JSON.stringify(metaContent) : '"' + metaContent + '"'}`);
                console.log("");
            }
        }
    }
}