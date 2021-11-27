const {markDowntoHTML,HTMLForm,fileOrFolder} = require( './htmlCreator');
// let HTML =  `<!doctype html>
// <html lang="en">ee
// <head>
//   <meta charset="utf-8">
//   <title>title</title>
//   <link rel="stylesheet" type="text/css" href="sample">
//   <meta name='title' content = '[##_title_##]
// </head>
// <body>

// </body>
// </html>
// `
let folderArr = ["sample.txt", "sample2.md"];
let fileArr = ["sample.txt"];
describe('Unit test for fileOrFolderfunction',()=>{
test("it should be textFile",() =>{
    expect(fileOrFolder("test", folderArr,["sample","txt"])).toBe("./docs/test/sample.txt");
});

test("it should be mdFile",() =>{
    expect(fileOrFolder("test", folderArr,["sample2","md"])).toBe("./docs/test/sample2.md");
    
});
test("it should be textFile",() =>{
    expect(fileOrFolder("test", fileArr,["sample","txt"])).toBe("./docs/sample.txt");
    
});
});

// test("Markdown Grammar changed H4",() =>{
//     expect(markDowntoHTML("#### test").toBe("<h4>test</h4>"));
// });
// test("Markdown Grammar changed H3",() =>{
//     expect(markDowntoHTML("### test").toBe("<h3>test</h3>"));
// });
// test("Markdown Grammar changed H2",() =>{
//     expect(markDowntoHTML("## test").toBe("<h2>test</h2>"));
// });
// test("Markdown Grammar changed H1",() =>{
//     expect(markDowntoHTML("# test").toBe("<h1>test</h1>"));
// });
