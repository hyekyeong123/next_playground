"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function CReactQuill() {
    const [value, setValue] = useState('');
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "font",
        "size",
        "header",
        "color",
        "background",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    // 클릭 시 클립보드에 값 복사
    const handleCopyToClipboard = () => {

        navigator.clipboard.writeText(
            value.replace(/<ol>/g, '<ol style="list-style-type: decimal; margin-left: 20px;">')
            .replace(/<li>/g, '<li style="margin-bottom: 8px;">')
        ).then(
            () => {
                alert('복사되었습니다!');
            },
            (err) => {
                alert('복사 실패: ', err);
            }
        );
    };

    return(
    <>
        <ReactQuill
            theme="snow" value={value} onChange={setValue}
            modules={modules}
            formats={formats}
        />
        <div
            style={{ cursor: 'pointer' }}
            onClick={handleCopyToClipboard}
        >{value}</div>
    </>
    )
}