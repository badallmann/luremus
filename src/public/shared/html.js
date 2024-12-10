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





  // Rendering
  img(src, alt = '', attributes = {}) {
    return create('img', { src, alt, ...attributes });
  },
  


  // Action
  pubButton(text, topic, payload) {
    const b = create('button', {}, [text]);
    b.addEventListener('click', e => {
      const data = Object.assign({}, e, payload);
      pub(topic, data);
    });
    return b;
  },

  

  // Form
  // Why: Semantics. Also: built-in submit on enter
  // FormData must be handled by getFormData()
  form(topicToSubmit, elements) {
    const f = create('form', { novalidate: true }, elements);

    f.addEventListener("submit", function(e) {
      e.preventDefault();  // Prevent default form submission

      const formData = new FormData(f);

      pub(topicToSubmit, { formData });
    });

    return f;
  },
  submitButton(text = 'Submit') {
    return create('button', {
      type: 'submit',
      style: 'font-weight: normal;' // Override iOS (bold)
    }, [text]);
  },
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
  upload() {
    const input = create('input', {
      type: 'file',
      id: 'upload',
      multiple: true,
      name: 'files[]',
      class: 'file-upload-input',
      style: 'display: none;'  // Hide the file input initially
    });
  
    const button = create('button', {
      type: 'button',
      class: 'upload-button'
    });
    button.textContent = 'Select Files';
    button.addEventListener('click', () => {
      input.click(); // Simulate click on input element
    });
  
    const fileCountDisplay = create('span', { class: 'file-count-display' });
  
    const submitButton = html.submitButton()
    submitButton.style.display = 'none';
  
    // Handle file selection and show/hide buttons
    input.addEventListener('change', () => {
      const fileCount = input.files.length;
      fileCountDisplay.textContent = `${fileCount} file(s) selected`;
  
      // Show submit button if files are selected
      if (fileCount > 0) {
        submitButton.style.display = '';  // Show the submit button
      }
    });
  
    // Handle drag-and-drop events
    const dropArea = create('div', { class: 'drop-area' });
  
    dropArea.addEventListener('dragover', (event) => {
      event.preventDefault();  // Prevent default behavior (Allow drop)
      dropArea.classList.add('dragover');  // Optional: Add a visual indication
    });
  
    dropArea.addEventListener('dragleave', () => {
      dropArea.classList.remove('dragover');
    });
  
    dropArea.addEventListener('drop', (event) => {
      event.preventDefault();  // Prevent default drop behavior
      const files = event.dataTransfer.files;
      input.files = files;  // Update the input files
      const fileCount = files.length;
      fileCountDisplay.textContent = `${fileCount} file(s) selected`;
  
      // Show submit button if files are selected
      if (fileCount > 0) {
        submitButton.style.display = '';  // Show the submit button
      }
    });
  
    return { input, button, fileCountDisplay, submitButton, dropArea };
  }
}