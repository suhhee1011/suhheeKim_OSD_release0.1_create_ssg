import arg from 'arg';
let fs = require('fs');

function markDowntoHTML(text) {
    const htmlText = text
        .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
        .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        return htmlText.trim();
    }

function getArgs(rawArgs) {
    const args = arg(
        {
            '--version': Boolean,
            '--help': Boolean,
            '--input': Boolean,
            '--StyledInput': Boolean,
            '-v': '--version',
            '-h': '--help',
            '-i': '--input',
            '-s': '--StyledInput'
        },
        {
            argv: rawArgs.slice(2)
        }

    );
    return {
        input: args['--input'] || false,
        help: args['--help'] || false,
        version: args['--version'] || false,
        styledInput: args['--StyledInput'] || false,
    };
}



function createHTML(filename, TextArr, result,url) {
    for (let filenum = 0; filenum < TextArr.length; filenum++) {


        fs.readFile(TextArr.length > 1 ? './Texts/'.concat(filename, "/", TextArr[filenum], ".", result) : './Texts/'.concat(TextArr[filenum], ".", result), 'utf8', function (error, data) {
           
            if (error) {
                console.log("This " + TextArr[filenum] + "." + result + " file is not exist. Please check file name");
                return;
            }

         

            let dataArr = data.split('\n');
            let dataTemplate = "";

            
            if (result == "md") {
                for (let temp = 0; temp < dataArr.length; temp++) {

                    dataTemplate += markDowntoHTML(dataArr[temp]);
                }

            }
            else if (result == "txt") {
                for (let temp = 0; temp < dataArr.length; temp++) {

                    dataTemplate += `<p>${dataArr[temp]}</p><br/>`;
                }
            }

            let html = `
            <!doctype html>
           <html lang="en">
           <head>
             <meta charset="utf-8">
             <title>${TextArr[filenum]}</title>
             <link rel="stylesheet" type="text/css" href="${url}">
             <meta name="viewport" content="width=device-width, initial-scale=1">
           </head>
           <body>
             ${dataTemplate}
           </body>
           </html>
           `
            fs.writeFile('./dist/'.concat(TextArr[filenum], ".html"), html, function (err) {


                
                if (err) console.log(err)
                console.log(TextArr[filenum] + ".html is created!");
                


            });
        });
    }
}

    export function cli(args) {
        let options = getArgs(args);

        if (options.version) {
            console.log("Name :  Simple Text Site Generator\nVersion :  1.0");
        } else if (options.help) {
            console.log("Help:");
            console.log(" 1. --version(-v) :\n \t it will show you application name and version");
            console.log(" 2. --help(-h) :\n \t it will give you all the instruction that you need to use this application.");
            console.log(" 3. --input [filename/foldername](-i [filename/foldername]) : \n \t it will automatically create website for you \n \t using file that you put in command line \n \t or if you put folder name then it will automatically get all the txt files from the folder and create website for you.");
            console.log("4. --styledInput [filename/foldername] [external css link] (-s [filename/foldername] [external css link]): \n \t it will automatically generate website \n \t with beautful external css");
        } else if (options.input || options.styledInput) {



            //Get argument for input and styledInput
            let filename = "";

            let url = "../public/style.css";
            if (options.input) {
                filename = args.slice(3).join(' ').toString()
            }
            else if (options.styledInput) {
                filename = args.slice(3, 4).toString();
                url = args.slice(4);
            }




            const patternExt = /(\w|-)+./;
            let TextArr = [];

            let _lastDot = filename.lastIndexOf('.');
            let result = filename.substr(_lastDot + 1, filename.length).toString();

            if (result == filename) {
                const str = "";
                fs.readdir('./Texts/'.concat(filename), function (error, filelist) {

                    if (error) {
                        console.log("This folder is not exist. Please input other folder" + error);
                        return;
                    }
                  
                    for (let Inum in filelist) {


                        _lastDot = filelist[Inum].lastIndexOf('.');
                        result = filelist[Inum].substr(_lastDot + 1, filelist[Inum].length).toString();
                        let nameOnly = filelist[Inum].substr(0, _lastDot).toString();

                        TextArr[Inum] = nameOnly;
                    
                       
                        

                    }
                    //Delete Dist Folder
                    fs.readdir(`./dist`, function (error, filelist) {

                        for (let num in filelist) {
                            fs.unlink(`./dist/${filelist[num]}`, (err) => {
                               
                            });
                        }

                    });
                  
                    createHTML(filename, TextArr, result,url);
                });
            }else if (result == "txt" || result == "md") {
        let _lastDot = filename.lastIndexOf('.');
        let nameOnly = filename.substr(0, _lastDot).toString();

        TextArr[0] = nameOnly;
        createHTML(filename, TextArr, result,url);


    } else {
        console.log("Wrong extension")
    }
   

   
   



} else {
    console.log("Please enter other input!\n  You can enter \n \t 1. --version(-v) for version\n \t 2. --help(-h) for Help\n \t 3. --input [filename](-i [filename]) for create static website");
}


}