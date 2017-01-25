#!/usr/bin/env node

'use strict';

/*
    The process.argv property returns an array containing the command line
    arguments passed when the Node.js process was launched. The first element
    will be process.execPath. The second element will be the path to the
    JavaScript file being executed. The remaining elements will be any
    additional command line arguments.

    Example: [ 'node', '/path/to/yourscript', 'arg1', 'arg2', ... ]
    URL: https://nodejs.org/api/process.html#process_process_argv
 */


//    1. Extract the name of the app/file name.
let appName = process.argv[1].split('/').pop();

//    2. Save the first provided argument as the username.
let name = process.argv[2];

//    3. Check if the name was provided.
if(!name)
{
    //    1. Give the user an example how to use the app.
    console.log("Missing argument! \n\n\tExample: %s YOUR_NAME\n", appName)

    //    -> Exit the app if error. The nr 1 tels the system that the app quit
    //       with an error, thus another command won't be executed. For example:
    //       ./hello $$ ls -> won't execute ls
    //       ./hello David $$ ls -> will execute ls
    process.exit(1)
}

//    4. Display the message in the console.
console.log('Hello, %s!', name);