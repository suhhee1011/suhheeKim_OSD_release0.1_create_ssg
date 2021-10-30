
const path = require('path');
const readline = require('readline');
let fs = require('fs');


function markDowntoHTML(text) {
    const htmlText = text
        .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
        .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\>> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b><br/>')
        .replace(/\_\_(.*)\_\_/gim, '<b>$1</b><br/>')
        .replace(/\`(.*)\`/gim, '<code>$1</code><br/>') // inline code block
        .replace(/\*(.*)\*/gim, '<i>$1</i><br/>')
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a><br/>")
        .replace(/^( ?[-_*]){3,} ?[\t]*$/gim, '<hr/>')//horizontal rule
        .replace(/\n$/gim, '<br />')
        .replace(/\n/gim, '<p>$1</p>')

    return htmlText.trim();
}
function HTMLForm(title, cssurl, dataTemplate,metaData) {
    let html = `
            <!doctype html>
           <html lang="en">
           <head>
             <meta charset="utf-8">
             <title>${title}</title>
             <link rel="stylesheet" type="text/css" href="${cssurl}">
             ${metaData}
           </head>
           <body>
             ${dataTemplate}
           </body>
           </html>
           `;
    return html;
}
async function writeHTMLfile(jsonOutput, html, Text) {
    if (typeof jsonOutput === "undefined") {
        jsonOutput = "";
    }
    if (jsonOutput != "") {
        const outputPath = './' + jsonOutput + '/';

        fs.mkdir(outputPath, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        })
        fs.writeFile(outputPath.concat(Text, ".html"), html, function (err) {

            if (err) console.log(err)
            console.log(Text + ".html is created!");
        });
    }
    else {
        if(!fs.existsSync("./dist")) fs.mkdirSync("./dist");
        fs.writeFile('./dist/'.concat(Text, ".html"), html, function (err) {
            if (err) console.log(err)
            console.log(Text + ".html is created!");
        });
    }
};
function fileOrFolder(filename, TextArr, Text) {
    if (TextArr.length > 1) {
        
        return './docs/'.concat(filename, "/", Text[0], ".", Text[1]);
    } else {
        return './docs/'.concat(Text[0], ".", Text[1]);
    }

}
function createMetaData(){


    return new Promise(function(resolve){
        var RL = readline.createInterface(process.stdin, process.stdout);
    RL.question('Please enter a title for your site:  ',(title)=>{
        RL.question('Please enter a description for your site: ',(description)=>{
            RL.question('Please enter a keyword for your site: ', (keyword)=>{
                RL.close();
                resolve(`<meta name='title' content = "[##_${title}_##]">
                        <meta name='Description' content = "[##_${description}_##]">
                        <meta name='keywords' content = "${keyword}">`);

            })
        })
       

    })
      
    });
    

}

async function readFile(filename, TextArr, Text, cssurl, jsonOutput) {
    fs.readFile(fileOrFolder(filename, TextArr, Text), 'utf8', function (error, data) {

        if (error) {
            console.log("This " + Text[0], ".", Text[1] + " file is not exist. Please check file name");
        
            return;
        }

        let dataArr = data.split('\n');
        let dataTemplate = "";

        if (Text[1] == "md") {
            for (let temp = 0; temp < dataArr.length; temp++) {
                dataTemplate += markDowntoHTML(dataArr[temp]);
            }
        }
        else if (Text[1] == "txt") {
            for (let temp = 0; temp < dataArr.length; temp++) {

                dataTemplate += `<p>${dataArr[temp]}</p><br/>`;
            }
        }

     let metadata;


    createMetaData().then(
        function(value){
            let html = HTMLForm(Text[0], cssurl, dataTemplate, value);

            writeHTMLfile(jsonOutput, html, Text[0]);
        }
    );

     

    });
}



async function createHTML(filename, TextArr, cssurl, jsonOutput) {
   
    for (let filenum = 0; filenum < TextArr.length; filenum++) {
        
        readFile(filename, TextArr, TextArr[filenum], cssurl, jsonOutput);
       
    }
}
module.exports = createHTML;