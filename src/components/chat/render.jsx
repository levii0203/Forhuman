import { useRef, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Editor from '@monaco-editor/react';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSelector } from 'react-redux';
import CodeEditor from '../code/editor';

export default function RenderResponse({ response}) {
    const regex_star = /\*\*(.*?)\*\*/g; // Bold text regex
    const regex_numbered = /^\d+\.\s(.*)/; // Numbered item regex
    const regex_code = /^\s*```([\s\S]*?)```(?:\s*(\w+))?$/; // Code block regex
    const regex_code_single = /^\s*`([\s\S]*?)`(?:\s*(\w+))?$/;
    const containerRef = useRef(null);
    const dark = useSelector((state)=>state.dark.is)
    const [codes,setCodes] = useState([])
    const [count,setCount] = useState(0)
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        
    }, [response]);
    const processText = (text) => {
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex_star.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(
                    <span key={`${lastIndex}`}>
                        {text.slice(lastIndex, match.index)}
                    </span>
                );
            }
            parts.push(
                <strong
                    key={`${match.index}`}
                    className={`font-bold ${dark ? 'text-violet-400' : 'text-violet-600'}`}
                >
                    {match[1]}
                </strong>
            );
            lastIndex = regex_star.lastIndex;
        }
        if (lastIndex < text.length) {
            parts.push(
                <span key={`${lastIndex}`} className='break-words'>
                    {text.slice(lastIndex)}
                </span>
            );
        }
        return parts.length > 0 ? parts : text;
    };

    const splitLineAtColon = (line) => {
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex_star.exec(line)) !== null) {
            const boldStart = match.index;
            const boldEnd = regex_star.lastIndex;
            const colonIndex = line.indexOf(':', lastIndex);

            if (colonIndex !== -1 && colonIndex < boldStart) {
                parts.push(line.slice(lastIndex, colonIndex + 1));
                lastIndex = colonIndex + 1;
            }

            if (lastIndex <= boldStart) {
                parts.push(line.slice(lastIndex, boldEnd));
                lastIndex = boldEnd;
            }
        }

        if (lastIndex < line.length) {
            const remaining = line.slice(lastIndex);
            const colonIndex = remaining.indexOf(':');
            if (colonIndex !== -1) {
                parts.push(remaining.slice(0, colonIndex + 1));
                parts.push(remaining.slice(colonIndex + 1));
            } else {
                parts.push(remaining);
            }
        }

        if (parts.length === 0 && line.includes(':')) {
            const colonIndex = line.indexOf(':');
            parts.push(line.slice(0, colonIndex + 1));
            parts.push(line.slice(colonIndex + 1));
        } else if (parts.length === 0) {
            parts.push(line);
        }

        return parts;
    };

    // Preprocess to combine multi-line code blocks into single "lines"
    const processLines = (input) => {
        const result = [];
        let currentLine = '';
        let inCodeBlock = false;

        const rawLines = input.split('\n');
        for (const line of rawLines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('```') && !inCodeBlock) {
                if (currentLine) result.push(currentLine);
                currentLine = line;
                inCodeBlock = true;
            } else if (trimmedLine.endsWith('```') && inCodeBlock) {
                currentLine += '\n' + line;
                result.push(currentLine);
                currentLine = '';
                inCodeBlock = false;
            } else if (inCodeBlock) {
                currentLine += '\n' + line;
            } else {
                if (currentLine) result.push(currentLine);
                currentLine = line;
            }
        }
        if (currentLine) result.push(currentLine);
        return result;
    };

    const processedLines = processLines(response);

    return (
        <>
            {processedLines.map((line, index) => {
                let codehead = false
                const isLastLine = index === processedLines.length - 1;
                if (line.startsWith("# ")) {
                    return (
                        <h2
                            key={index}
                            className={`text-2xl font-bold ${dark ? 'text-violet-400' : 'text-violet-600'} mt-4`}
                        >
                            {line.replace("# ", "")}
                        </h2>
                    );
                } else if (line.startsWith("## ")) {
                    return (
                        <h3
                            key={index}
                            className={`text-xl font-semibold ${dark ? 'text-violet-300' : 'text-violet-500'} mt-3`}
                        >
                            {line.replace("## ", "")}
                        </h3>
                    );
                }else if (line.startsWith("### ")) {
                    return (
                        <h3
                            key={index}
                            className={`text-xl font-semibold ${dark ? 'text-violet-300' : 'text-violet-500'} mt-3`}
                        >
                            {line.replace("## ", "")}
                        </h3>
                    );
                }
                 else if (regex_numbered.test(line)) {
                    const match = regex_numbered.exec(line);
                    const number = match[0].split(". ")[0];
                    const content = match[1];
                    const splitContent = splitLineAtColon(content);
                    return (
                        <span key={index} className={dark ? 'text-gray-200 flex' : 'text-gray-800 flex'}>
                            <span className={dark ? 'text-violet-400 flex' : 'text-violet-600 flex'}>
                                {number}.{' '}
                            </span>
                            {splitContent.map((part, i) => (
                                <span key={`${index}-${i}`}>
                                    {processText(part)}
                                    {i < splitContent.length - 1 && <br />}
                                </span>
                            ))}
                            {!isLastLine && splitContent.length === 1 && <br />}
                        </span>
                    );
                } else if (regex_code.test(line) || regex_code_single.test(line)) {
                    let match;
                    if(regex_code.test(line)){
                        match = regex_code.exec(line);
                    }
                    else{
                        match = regex_code_single(line)
                    }
                    const codeContent = match[1].split("\n").slice(1).join("\n");
                    const lang = match[1].split("\n")[0] || 'command';
                    const codelines = codeContent.trim().split("\n").filter(line => line.trim() !== "");
                    const lineCount = codelines.length || 1;
                    return (
                        /*<Editor
                            key={index}
                            height="full"
                            language={lang}
                            value={codeContent}
                            options={{ readOnly: true, minimap: { enabled: false }, scrollBeyondLastLine: false }}
                            theme={'vs-dark'}
                            className='overflow-hidden h-full min-h-20'
                        />*/
                      <CodeEditor lang={lang} content={codeContent} lineCount={lineCount}/>
                    );
                } else {
                    const splitContent = splitLineAtColon(line);
                    return (
                        <span key={index} className={dark ? 'text-white' : 'text-gray-800'}>
                            {splitContent.map((part, i) => (
                                <span key={`${index}-${i}`} className='break-words'>
                                    {processText(part)}
                                    {i < splitContent.length - 1 && <br />}
                                </span>
                            ))}
                            {!isLastLine && splitContent.length === 1 && <br />}
                        </span>
                    );
                }
            })}
        </>
    );
}
