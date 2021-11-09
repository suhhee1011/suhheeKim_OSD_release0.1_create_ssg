## Github Repo
+ https://github.com/suhhee1011/suhheeKim_OSD_release0.1_create_ssg

## Before Use You need to do
1. Download or clone the code.<br>
2. Download node, if you don't have it.<br>
3. Add environment variable on your laptop(C:\Program Files\nodejs)<br>
4. Open the codes.<br>
5. Locate yourself to where package.json is located.<br>
6. Open cmd, type npm I, and wait for download.<br>
7. NPM link on cmd


# Options
## Help:
1. create-ssg --version(-v) :<br>
it will show you application name and version<br>
```
  ex.
  $ create-ssg  --version
  $ create-ssg  -v 
  ```
 2. create-ssg  --help(-h) :<br>
         it will give you all the instructions that you need to use this application.<br>
 ```        
  ex.
  $ create-ssg  --help
  $ create-ssg  -h 
  ```       
 3. create-ssg --input [filename/foldername](-i [filename/foldername]) :<br>
       it will automatically create a website for you using a file that you put in the command line<br>
         or if you put folder name then it will automatically get all the txt files from the folder and create a website for you.<br>
```
  ex.
  $ create-ssg  --input [filename/foldername]
  $ create-ssg  -i[filename/foldername] 
```
  4. create-ssg --styledInput [filename/foldername] [external css link] (-s [filename/foldername] [external css link]): <br> 
           it will automatically generate website \n \t with beautiful external CSS"
```
  ex.
  $ create-ssg  --steyledInput [filename/foldername] [external css link]<br>
  $ create-ssg  -s [filename/foldername] [external css link]<br>

```

 5. create-ssg --config [filename] : <br> 
           it will take the string data for input file and stylesheet URL and run it through SSG.
```
  ex.
  $ create-ssg  --config ssg-config.json

```



### How to use prettier and eslint 

1. Prettier - "npm run prittier" or "npx prettier --write [filename]"
 - It will format your code with following:
  1. Set all tab width by 3
  2. Add TrailingComma
  3. Add semicolon

2. Eslint - "npm run eslint" or "npx eslint [filename]"
 - It will help you to optimize your code with following: 
   1. Double quotes for String 
   2. Semicolon is required

## IDE Integration
    - Settings for IDE is written in the .vscode/settings.json
    ```
    {
    "angular.experimental-ivy": true,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
}
 ```
