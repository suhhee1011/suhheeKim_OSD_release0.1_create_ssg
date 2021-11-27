import {markDowntoHTML,HTMLForm} from './htmlCreator';
test("Markdown Grammar translated",() =>{
    expect(html.markDowntoHTML("#### test").toBe("<h3>test</h3>"));
});

test("HTMLForm changed",() =>{
    expect(HTMLForm,() =>{
    HTMLForm("title", "sample","<p>This is for test</p>","`<meta name='title' content = '[##_title_##]'>").toBe(
        `<!doctype html>
       <html lang="en">ee
       <head>
         <meta charset="utf-8">
         <title>title</title>
         <link rel="stylesheet" type="text/css" href="sample">
         <meta name='title' content = '[##_title_##]
       </head>
       <body>
       <p>This is for test</p>
       </body>
       </html>
       `

    );
});

});

test("Markdown Grammar changed H4",() =>{
    expect(markDowntoHTML("#### test").toBe("<h4>test</h4>"));
});
test("Markdown Grammar changed H3",() =>{
    expect(markDowntoHTML("### test").toBe("<h3>test</h3>"));
});
test("Markdown Grammar changed H2",() =>{
    expect(markDowntoHTML("## test").toBe("<h2>test</h2>"));
});
test("Markdown Grammar changed H1",() =>{
    expect(markDowntoHTML("# test").toBe("<h1>test</h1>"));
});
