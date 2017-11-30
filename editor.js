"use strict";

(() => {
	const getSelNode = () => {
		const node = document.getSelection().anchorNode;
		return (node.nodeType === 3 ? node.parentNode : node);
	};

	const ymd_string = () => {
		const dt = new Date(), month = (dt.getMonth() + 1), day = dt.getDate();
		return [dt.getFullYear(), (month > 9 ? '' : '0') + month, (day > 9 ? '' : '0') + day].join('.')
	};

	const exec = document.execCommand;
	const ctrlHeld = (ev) => (ev.ctrlKey || ev.metaKey)
	const inTag = (tag) => (getSelNode().nodeName === tag);
	const keyCmd = (ev, cmd, arg) => (ctrlHeld() ? !exec(cmd, false, arg) : true);

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
			if (ctrlHeld()) {
				const defurl = (inTag("A") ? getSelNode().href : "http://");
				const url = prompt("Enter URL:", defurl);
				return !exec((url !== null && url !== "" ? "createLink" : "unlink"), false, url);
			}
			return true;
		},

		"Enter": () => !exec(inTag("CODE") ? "insertHTML" : "insertParagraph", false, "\n"),

		"Tab": (ev) => {
			if (inTag("CODE"))
				return !exec("insertHTML",false,"\t");
			else
				return !exec((ev.shiftKey ? "out" : "in")+"dent",false);
		},

		";": (ev) => keyCmd(ev, "insertHTML", "<code>\r\n</code>"),
		"'": (ev) => {
			if (ctrlHeld()) {
				const block = (inTag("BLOCKQUOTE") ? "<p>" : "<blockquote>");
				return !exec("formatBlock", false, block);
			}
			return true;
		},
	};

	header.onkeyup = (ev) => (document.title = header.innerText)
	content.onkeydown = (ev) => (keys[ev.key] ? keyfn(keys[ev.key]) : true),
	header.innerHTML = '<h1 align="center" contenteditable="true">' + ymd_string() + '</h1><hr/>';
	document.title = header.innerText;
})();
