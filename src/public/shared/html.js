// html.js
// Why: Encapsulate the construction of HTML/DOM elements

import { pub } from '/shared/pubsub.js';

// Custom
function create(tagName, attributes = {}, nodes = []) {
  const voidElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

  function isVoidElement(tagName) {
    return voidElements.includes(tagName.toLowerCase());
  }

  function setAttributes(element, attributes) {
    for (let key in attributes) element.setAttribute(key, attributes[key]);
  }

  function appendNodes(element, nodes) {    
    function appendNode(node) {
      if (typeof node === 'string') {
        element.appendChild(document.createTextNode(node));
      } else if (node instanceof Node) {
        element.appendChild(node);
      } else if (Array.isArray(node)) {
        appendNodes(element, node);  // Recursion
      } else {
        console.warn('Unsupported node type:', node);
      }
    }
  
    if (isVoidElement(element.tagName)) return;

    if (Array.isArray(nodes)) nodes.forEach(appendNode);
    else appendNode(nodes);
  }

  const element = document.createElement(tagName);
  setAttributes(element, attributes);
  appendNodes(element, nodes);
  return element;
}

export const html = {
  create: create,



  // Shorthands
  h1(...nodes) {
    return create('h1', {}, nodes);
  },
  p(...nodes) {
    return create('p', {}, nodes);
  },
  em(...nodes) {
    return create('em', {}, nodes);
  },
  strong(...nodes) {
    return create('strong', {}, nodes);
  },
  div(...nodes) {
    return this.create('div', {}, nodes);
  },
  br(count = 1) {
    if (count === 1) {
      return create('br');
    } else {
      return Array.from({ length: count }, () => create('br')); // Return an array for multiple
    }
  },
  


  // Action
  pubBtn(text, topic, payload) {
    const b = create('button', {}, [text]);
    b.addEventListener('click', e => {
      const data = Object.assign({}, e, payload);
      pub(topic, data);
    });
    return b;
  },

  

  // Form commons (for semantics)
  form(topicToSubmit, elements) {
    const f = create('form', { novalidate: true }, elements);
    f.addEventListener("submit", e => {
      e.preventDefault();  // Stop built-in form submission
      const formData = new FormData(e.target);
      const data = {};
      Object.assign(data, Object.fromEntries(formData));
      pub(topicToSubmit, { formData: data })  // Data output
    });
    return f;
  },
  submitBtn(text = 'Submit') {
    return create('button', {
      type: 'submit',
      style: 'font-weight: normal;' // Override iOS (bold)
    }, [text]);
  },



  // Sign forms
  emailInput() {
    return create('input', { 
      type: 'email',
      name: 'email',
      id: 'email',
      placeholder: 'Email',
      required: true,
    });
  },
  passwordInput() {
    return create('input', { 
      type: 'password',
      name: 'password',
      id: 'password',
      placeholder: 'Password',
      required: true
    });
  },
  passwordInputStopAutocomplete() {
    const i = html.passwordInput();
    i.setAttribute('autocomplete', 'new-password');
    return i;
  },
  


  
  // // Upload form(s)

  // uploadInput() {
  //   return create('input', {
  //     type: 'file',
  //     multiple: true, // Allow multiple files
  //     name: 'files[]', // Set name attribute for file input
  //     class: 'file-upload-input', // Add a class for styling
  //   });
  // },



  // Rendering
  img(src, alt = '', attributes = {}) {
    return create('img', { src, alt, ...attributes });
  },
}