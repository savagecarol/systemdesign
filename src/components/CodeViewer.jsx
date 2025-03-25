import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeViewer = ({ code }) => {
    return (
        <div className="flex flex-col w-full rounded-lg">
            <div className='codesnip'>
                <SyntaxHighlighter language="cpp"
                    style={atomOneDark}
                    customStyle={{ padding: "25px", fontSize: "12px" }}
                    wrapLongLines={true}>
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeViewer;
