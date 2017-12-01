"use strict";

(() => {
    const doc = document;
    doc.exec = doc.execCommand;

    const getSelNode = () => {
        const node = doc.getSelection().anchorNode;
        return (node.nodeType === 3 ? node.parentNode : node);
    };

    const ymd_string = () => {
        const dt = new Date(), month = (dt.getMonth() + 1), day = dt.getDate();
        return [dt.getFullYear(), (month > 9 ? '' : '0') + month, (day > 9 ? '' : '0') + day].join('.');
    };

    const ctrlHeld = (ev) => (ev.ctrlKey || ev.metaKey);
    const inTag = (tag) => (getSelNode().nodeName === tag);
    const keyCmd = (ev, cmd, arg) => (ctrlHeld(ev) ? !doc.exec(cmd, false, arg) : true);

    const keys = {
        "b": (ev) => keyCmd(ev, "bold"),
        "i": (ev) => keyCmd(ev, "italic"),
        "u": (ev) => keyCmd(ev, "underline"),
        "0": (ev) => keyCmd(ev, "formatBlock", "<p>"),
        "1": (ev) => keyCmd(ev, "formatBlock", "<h1>"),
        "2": (ev) => keyCmd(ev, "formatBlock", "<h2>"),
        "3": (ev) => keyCmd(ev, "formatBlock", "<h3>"),
        "4": (ev) => keyCmd(ev, "formatBlock", "<h4>"),
        "5": (ev) => keyCmd(ev, "formatBlock", "<h5>"),
        "6": (ev) => keyCmd(ev, "formatBlock", "<h6>"),
        "7": (ev) => keyCmd(ev, "insertOrderedList"),
        "8": (ev) => keyCmd(ev, "insertUnorderedList"),
        "9": (ev) => {
            if (ctrlHeld(ev)) {
                const defurl = (inTag("A") ? getSelNode().href : "http://");
                const url = prompt("Enter URL:", defurl);
                return !doc.exec((url !== null && url !== "" ? "createLink" : "unlink"), false, url);
            }
            return true;
        },

        "Enter": () =>  !doc.exec(inTag("CODE") ? "insertHTML" : "insertParagraph", false, "\n"),

        "Tab": (ev) => {
            if (inTag("CODE"))
                return !doc.exec("insertHTML",false,"\t");
            else
                return !doc.exec((ev.shiftKey ? "out" : "in")+"dent",false);
        },

        ";": (ev) => keyCmd(ev, "insertHTML", "<code>\r\n</code>"),
        "'": (ev) => {
            if (ctrlHeld(ev)) {
                const block = (inTag("BLOCKQUOTE") ? "<p>" : "<blockquote>");
                return !doc.exec("formatBlock", false, block);
            }
            return true;
        },
    };

    header.onkeyup = (ev) => (doc.title = header.innerText);
    content.onkeydown = (ev) => (keys[ev.key] ? (keys[ev.key])(ev) : true);
    content.focus();
    if (doc.title != "") {
        header.innerHTML = '<h1 align="center" contenteditable="true">' + ymd_string() + '</h1><hr/>';
        doc.title = header.innerText;
    }
})();
