const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

function old_parseLines(lines) {
    stagingName = "";
    stagingData = [];
    firstlineOffset = false;
    multilineParse = false;
    listParse = false;

    eventObject = new Object();

    for (line in lines) {        
        // need to identify whether single line object or multi-line object
        if (firstlineOffset)
        {
            // Check and parse previous line
        }
        else
        {
            firstlineOffset = true; // parse previous line starting with the next line (so we don't try parsing null data)
        }

        // 
        splitout = lines[line].split(":")

        if (splitout.length == 1)
        {
            // no key-value pair, this is either a multi-line structure or whitespace
            val = splitout[0].trim();
            if (val.length > 0)
            {
                // do something with content
                if (multilineParse)
                {
                    if (val.split('-').length > 1)
                    {
                        // list
                        listVal = val.split('-')[1].trim();
                        // console.log(`2)- ${listVal}`);
                        stagingData.push(listVal);
                    }
                }
                else
                {
                    console.log(`1) ${val}`);
                }
                
            }
            else
            {
                // only contains whitespace
                if (multilineParse)
                {
                    multilineParse = false;
                    listParse = true;
                }
            }
        }
        else if (splitout.length == 2)
        {
            // key value pair, mark to be parsed as such on next iteration.
            varName = splitout[0].trim();
            varData = splitout[1].trim();

            if (varData.length > 0)
            {
                if (varData.split("|") > 1)
                {
                    // pipe = multi-line string
                    multilineParse = true;
                }
            }
            else
            {
                multilineParse = true;
            }
            
            console.log(`2) ${varName}`);
            if (!multilineParse)
            {
                if (listParse)
                {
                    console.log(`2) [ ${stagingData} ]`);
                    stagingData = [];
                }
                else
                {
                    console.log(`2) ${varData}`);
                }
            }
        }
        else if (splitout.length > 2)
        {
            // likely key value pair that features a colon as content..
        }
        else
        {
            // something else happened???
            // skip
        }

    }
}

function parseLines(lines) {
    
    key = "";
    value = "";
    valueList = [];

    multilineParse = false;
    listParse = false;
    endParsing = false;
    
    for (line in lines) {
        if (lines[line].trim().length == 0) {
            // whitespace
            if (multilineParse || listParse)
            {
                endParsing = true;
            }
        }

        // get first Word
            // if it has a colon (:) treat it as a keyword
                // if there's a multi-line marker (|) to the right of the colon
                    // activate multi-line string parsing
                // otherwise if there's nothing there
                    // activate list parsing
                // otherwise treat the remainder as value of keyword.
                    
            // if it has a list symbol (-)
                // get the remainder and add it to the value list
        words = lines[line].trim().split(" ")
        
        if (words[0].split(":").length > 1)
        {
            key = words[0].split(":")[0];
            if (listParse)
            {
                endParsing = true;
            }

            if (lines[line].trim().split("|").length > 1)
            {
                // multiline
                multilineParse = true;
            }
            else if (lines[line].trim().split(" ").length > 1)
            {
                if (lines[line].trim().split(":").length > 2)
                {
                    // colon is listed in value
                }
                else if (lines[line].trim().split(":").length > 1)
                {
                    value = lines[line].trim().split(":")[1];
                }
            }
            else
            {
                listParse = true;
            }
        }
        else if (words[0].split("-").length > 1)
        {
            if (listParse)
            {
                valueList.push(lines[line].split("-")[1].trim());
            }
            else if(multilineParse)
            {
                valueList.push(lines[line].trim());
            }
            else
            {
                // might be an error
            }
        }
        else
        {
            if (multilineParse)
            {
                valueList.push(lines[line].trim());
            }
        }

        if (endParsing) {
            // print key / value
            console.log(`~ ${key}: [ ${valueList} ]`);
            
            // clear key / value
            key = "";
            value = "";
            valueList = [];

            // clear flags
            multilineParse = false;
            listParse = false;
            endParsing = false;
        }
        if (key.trim().length > 0 && value.trim().length) {
            // print key / value
            console.log(`~ ${key}: ${value}`);
            
            // clear key / value
            key = "";
            value = "";
            valueList = [];

            // clear flags
            multilineParse = false;
            listParse = false;
            endParsing = false;
        }
    }
}

const fs = require('node:fs');

fs.readFile("data/events/2026-05-05-test-event.yeve", 'utf8', (err,data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.split('\n');
    
    //old_parseLines(lines);
    parseLines(lines);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
