let show = document.getElementById("show");
function indentCode(code) {
  //make the code indented and pretty
  return js_beautify(code, {
    indent_size: 2,
    space_in_empty_paren: true,
    eol: "\n",
  });
}

function highlightCode(code) {
  //make the code highlighted
  return hljs.highlight(code, { language: "javascript" }).value;
}

function getNiceCode(code) {
  //get the highlighted code
  return highlightCode(indentCode(code));
}

let codeElement = document.getElementById("code");

codeElement.addEventListener("input", (e) => {
  //get the code
  let code = e.target.value;
  code = getNiceCode(code);
  params = getParams(code);
  //display the code
  displayCode(code);
});

//get the function container
let functionContainer = document.getElementById("function");

//display the code
function displayCode(code) {
  functionContainer.innerHTML = `<pre>${code}</pre>`;
  const param = show.appendChild(document.createElement("p"));
  param.innerHTML = `Parameters: ${params}`;
}

function getParams(code) {
  //get the function parameters
  let params = code.match(/\(([^)]+)\)/)[1];
  params = params.split(",").map((param) => param.trim());
  return params;
}

//get the code
let code = codeElement.value;
code = getNiceCode(code);
params = getParams(code);
