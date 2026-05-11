const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

const fs = require('node:fs');

fs.readFile("data/events/2026-05-05-test-event.yeve", 'utf8', (err,data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.split('\n');
    
    stagingName = "";
    stagingData = [];
    firstlineOffset = false;
    multilineParse = false;

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
            console.log(`2) ${varData}`);
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
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
