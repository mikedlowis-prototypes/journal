"use strict";

(() => {
    const getSelNode = () => {
        const node = document.getSelection().anchorNode;
        return (node.nodeType == 3 ? node.parentNode : node);
    }

    const ctrlKey = (evnt, cmd) => {
        if (evnt.ctrlKey) {
            document.execCommand(cmd,false)
            return false;
        }
        return true;
    }

    const keys = {
        "b": (evnt) => (ctrlKey("bold")),
        "i": (evnt) => (ctrlKey("italic")),
        "u": (evnt) => (ctrlKey("underline")),

        "Enter": () => {
            if (getSelNode().nodeName === "CODE")
                document.execCommand("insertHTML",false,"\n");
            else
                document.execCommand("insertParagraph",false)
            return false;
        },

        "Tab": (evnt) => {
            if (getSelNode().nodeName === "CODE")
                document.execCommand("insertHTML",false,"    ");
            else if (evnt.shiftKey)
                document.execCommand("outdent",false)
            else
                document.execCommand("indent",false)
            return false;
        },
    }

    content.onkeydown = (evnt) => {
        console.log(evnt);
        const keyfn = keys[evnt.key];
        return (keyfn ? keyfn(evnt) : true);
    }
})();
