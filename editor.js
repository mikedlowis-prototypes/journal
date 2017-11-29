"use strict";

(() => {
    const getSelNode = () => {
        const node = document.getSelection().anchorNode;
        return (node.nodeType === 3 ? node.parentNode : node);
    };

    const ctrlKey = (evnt, cmd, arg) => {
        console.log(evnt.ctrlKey);
        if (evnt.ctrlKey) {
            document.execCommand(cmd,false,arg);
            return false;
        }
        return true;
    };

    const ctrlShiftKey = (evnt, cmd, arg) => {
        console.log(evnt.ctrlKey);
        if (evnt.ctrlKey && evnt.shiftKey) {
            document.execCommand(cmd,false,arg);
            return false;
        }
        return true;
    };

    const keys = {
        "b": (evnt) => (ctrlKey(evnt,"bold")),
        "i": (evnt) => (ctrlKey(evnt,"italic")),
        "u": (evnt) => (ctrlKey(evnt,"underline")),
        ";": (evnt) => (ctrlKey(evnt,"insertHTML", "<code>\r\n</code>")),
        "'": (evnt) => (ctrlKey(evnt,"formatBlock", "<blockquote>")),
        "0": (evnt) => (ctrlKey(evnt,"formatBlock", "<p>")),
        "1": (evnt) => (ctrlKey(evnt,"formatBlock", "<h1>")),
        "2": (evnt) => (ctrlKey(evnt,"formatBlock", "<h2>")),
        "3": (evnt) => (ctrlKey(evnt,"formatBlock", "<h3>")),
        "4": (evnt) => (ctrlKey(evnt,"formatBlock", "<h4>")),
        "5": (evnt) => (ctrlKey(evnt,"formatBlock", "<h5>")),
        "6": (evnt) => (ctrlKey(evnt,"formatBlock", "<h6>")),
        "#": (evnt) => (ctrlShiftKey(evnt,"insertOrderedList")),
        "*": (evnt) => (ctrlShiftKey(evnt,"insertUnorderedList")),

        "Enter": () => {
            if (getSelNode().nodeName === "CODE")
                document.execCommand("insertHTML",false,"\n");
            else
                document.execCommand("insertParagraph",false);
            return false;
        },

        "Tab": (evnt) => {
            if (getSelNode().nodeName === "CODE")
                document.execCommand("insertHTML",false,"\t");
            else
                document.execCommand((evnt.shiftKey ? "out" : "in")+"dent",false);
            return false;
        },
    };

    content.onkeydown = (evnt) => {
        console.log(evnt);
        const keyfn = keys[evnt.key];
        return (keyfn ? keyfn(evnt) : true);
    }
})();
