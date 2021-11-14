const console = require("./console.js");
test("--help ", async() =>{
    const {stderr, stdout,exitCode} = await run("create-ssg --help");
    expect(exitCode). toBe(1);
    expect(stderr).toMarchSapshot();
    expect(stdout).toEqual("");    
 });

 test("--version",async() =>{
    const {stderr, stdout,exitCode} = await run("create-ssg --version");
    expect(exitCode). toBe(1);
    expect(stderr).toMarchSapshot();
    expect(stdout).toEqual("");
    
 });

 test("--input",async() =>{
    const {stderr, stdout,exitCode} = await run("create-ssg --input sample.txt");
    expect(exitCode). toBe(1);
    expect(stderr).toMarchSapshot();
    expect(stdout).toEqual("");
    
 });
 test("--styledSheet",async() =>{
    const {stderr, stdout,exitCode} = await run("create-ssg --styledInput test.txt");
    expect(exitCode). toBe(1);
    expect(stderr).toMarchSapshot();
    expect(stdout).toEqual("");
    
 });
 test("--config",async() =>{
    const {stderr, stdout,exitCode} = await run("create-ssg --config ssg-config.json");
    expect(exitCode). toBe(1);
    expect(stderr).toMarchSapshot();
    expect(stdout).toEqual("");
 });