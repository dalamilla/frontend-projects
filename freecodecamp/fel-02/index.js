const projectName = 'markdown-previewer';

const editor = document.querySelector('#editor');
const preview = document.querySelector('#preview');

let placeholder = `
# test 
## Test

### Test Types
[Euler Project](https://projecteuler.net)

- Unit Test
- Integration Test
- Functional Test
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

\`\`\`javascript
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\`
> test
**test**
Heres some code, \`<div></div>\`, between 2 backticks.

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

`;

editor.value = placeholder;
marked.setOptions({
  breaks: true
});

preview.innerHTML = marked(editor.value);


editor.addEventListener('input', () => {
  preview.innerHTML = marked(editor.value);
});