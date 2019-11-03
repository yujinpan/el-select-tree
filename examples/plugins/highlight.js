import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/scss';
import html from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/color-brewer.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

export function highlight(language, code) {
  return hljs.highlight(language, code).value.trim();
}
