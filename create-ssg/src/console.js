// import arg from "arg";
let fs = require("fs");
const createHTML = require("./htmlCreator.js");
var getArgs = function (rawArgs) {
   const args = arg(
      {
         "--version": Boolean,
         "--help": Boolean,
         "--input": Boolean,
         "--StyledInput": Boolean,
         "--config": Boolean,
         "-v": "--version",
         "-h": "--help",
         "-i": "--input",
         "-s": "--StyledInput",
         "-c": "--config",
      },
      {
         argv: rawArgs.slice(2),
      },
   );
   return {
      input: args["--input"] || false,
      help: args["--help"] || false,
      version: args["--version"] || false,
      styledInput: args["--StyledInput"] || false,
      config: args["--config"] || false,
   };
};

var cliApplication = function (args) {
   let options = getArgs(args);
   if (options.version) {
      console.log("Name :  Simple Text Site Generator\nVersion :  2.0");
   } else if (options.help) {
      console.log("Help:");
      console.log(
         " 1. --version(-v) :\n \t it will show you application name and version",
      );
      console.log(
         " 2. --help(-h) :\n \t it will give you all the instruction that you need to use this application.",
      );
      console.log(
         " 3. --input [filename/foldername](-i [filename/foldername]) : \n \t it will automatically create website for you \n \t using file that you put in command line \n \t or if you put folder name then it will automatically get all the txt files from the folder and create website for you.",
      );
      console.log(
         " 4. --styledInput [filename/foldername] [external css link] (-s [filename/foldername] [external css link]): \n \t it will automatically generate website \n \t with beautful external css",
      );
      console.log(
         " 5. --config(-c) ssg-config.json : \n \t it ables you to specify all SSG options \n \t in a JSON formatted file",
      );
   } else if (options.input || options.styledInput || options.config) {
      let jsonData,
         jsonOutput,
         filename = "";

      let cssUrl = "../public/style.css";
      if (options.config) {
         const json = "jsonFile/" + args.slice(3).join(" ").toString();
         var jsExist = JSON.parse(fs.readFileSync(json));

         if (Object.entries(jsExist).length === 0) {
            console.log(
               "Sorry, Json file is empty. We are using all default values",
            );
         } else {
            const js = args.slice(3).join(" ").toString();
            jsonData = require(`../jsonFile/${js}`);
            filename = jsonData.input;
            jsonOutput = jsonData.output;
            cssUrl = jsonData.stylesheet;
         }
      } else if (options.input) {
         filename = args.slice(3).join(" ").toString();
      } else if (options.styledInput) {
         filename = args.slice(3, 4).toString();
         cssUrl = args.slice(4);
      }
     // const patternExt = /(\w|-)+./;
      let TextArr = [];

      let _lastDot = filename.lastIndexOf(".");
      let result = filename.substr(_lastDot + 1, filename.length).toString();

      if (result == filename) {
       //  const str = "";
         if (filename == "") {
            filename = "Sherlock-Holmes-Selected-Stories";
         }
         fs.readdir("./docs/".concat(filename), function (error, filelist) {
            if (error) {
               console.log(
                  "This folder is not exist. Please input other folder" + error,
               );
               return;
            }

            for (let Inum in filelist) {
               _lastDot = filelist[Inum].lastIndexOf(".");
               result = filelist[Inum].substr(
                  _lastDot + 1,
                  filelist[Inum].length,
               ).toString();
               let nameOnly = filelist[Inum].substr(0, _lastDot).toString();

               TextArr.push([nameOnly, result]);
            }

            //Delete Dist Folder
            fs.readdir("./dist", function (error, filelist) {
               for (let num in filelist) {
                  fs.unlink(`./dist/${filelist[num]}`);
               }
            });

            createHTML(filename, TextArr, cssUrl, jsonOutput);
         });
      } else if (result == "txt" || result == "md") {
         let _lastDot = filename.lastIndexOf(".");
         let nameOnly = filename.substr(0, _lastDot).toString();

         TextArr[0] = [nameOnly, result];
         createHTML(filename, TextArr, cssUrl);
      } else {
         console.log("Wrong extension");
      }
   } else {
      console.log(
         "Please enter other input!\n  You can enter \n \t 1. --version(-v) for version\n \t 2. --help(-h) for Help\n \t 3. --input [filename](-i [filename]) for create static website",
      );
   }
};
module.exports = { cliApplication };
