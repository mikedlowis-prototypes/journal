"use strict";

(() => {
    const getSelNode = () => {
        const node = document.getSelection().anchorNode;
        return (node.nodeType === 3 ? node.parentNode : node);
    };

    const keyCmd = (evnt, cmd, arg) => {
        if (evnt.ctrlKey || evnt.metaKey)
            return !document.execCommand(cmd, false, arg);
        return true;
    }

    const keys = {
        "b": (evnt) => keyCmd(evnt, "bold"),
        "i": (evnt) => keyCmd(evnt, "italic"),
        "u": (evnt) => keyCmd(evnt, "underline"),
        "0": (evnt) => keyCmd(evnt, "formatBlock", "<p>"),
        "1": (evnt) => keyCmd(evnt, "formatBlock", "<h1>"),
        "2": (evnt) => keyCmd(evnt, "formatBlock", "<h2>"),
        "3": (evnt) => keyCmd(evnt, "formatBlock", "<h3>"),
        "4": (evnt) => keyCmd(evnt, "formatBlock", "<h4>"),
        "5": (evnt) => keyCmd(evnt, "formatBlock", "<h5>"),
        "6": (evnt) => keyCmd(evnt, "formatBlock", "<h6>"),
        "7": (evnt) => keyCmd(evnt, "insertOrderedList"),
        "8": (evnt) => keyCmd(evnt, "insertUnorderedList"),
        "9": (evnt) => {
            if (evnt.ctrlKey || evnt.metaKey) {
                const node = getSelNode();
                const defurl = (node.nodeName === "A" ? node.href : "http://");
                const url = prompt("Enter URL:", defurl);
                return !document.execCommand(
                    (url === "" ? "unlink" : "createLink"), false, url);
            }
            return true;
        },

        "Enter": () => {
            if (getSelNode().nodeName === "CODE")
                return !document.execCommand("insertHTML",false,"\n");
            else
                return !document.execCommand("insertParagraph",false);
        },

        "Tab": (evnt) => {
            if (getSelNode().nodeName === "CODE")
                return !document.execCommand("insertHTML",false,"\t");
            else
                return !document.execCommand((evnt.shiftKey ? "out" : "in")+"dent",false);
        },

        ";": (evnt) => keyCmd(evnt, "insertHTML", "<code>\r\n</code>"),
        "'": (evnt) => {
            const block = (getSelNode().nodeName === "BLOCKQUOTE" ? "<p>" : "<blockquote>");
            return !document.execCommand("formatBlock", false, block);
        },
    };

    content.onkeydown = (evnt) => {
        const keyfn = keys[evnt.key];
        return (keyfn ? keyfn(evnt) : true);
    }
})();
