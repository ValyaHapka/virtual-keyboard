/* eslint-disable func-names */
/* eslint-disable max-len */
const arr = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16, 17, 91, 18, 32, 18, 37, 40, 39, 17];
let codeNumber = 0;
let flag = false;
const keyboard = {
  elements: {
    text: null,
    block: null,
    container: null,
    keys: [],
    keyLayout: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shiftL', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '/', 'pgUp', 'shiftR',
      'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'pgLeft', 'pgDown', 'pgRight', 'Ctrl', 'language',
    ],
  },

  eventHandlers: {
    input: null,
    close: null,

  },

  properties: {
    value: '',
    capslock: false,
    language: true,
  },
  init() {
    this.elements.text = document.createElement('textarea');
    this.elements.text.classList.add('area');
    this.elements.block = document.createElement('div');
    this.elements.container = document.createElement('div');
    this.elements.block.classList.add('keyboard', 'keyboard-inactive');
    this.elements.container.classList.add('keys');
    this.elements.container.appendChild(this.drawKeys());
    this.elements.keys = this.elements.container.querySelectorAll('.key');
    this.elements.block.appendChild(this.elements.container);
    document.body.prepend(this.elements.text);
    document.body.appendChild(this.elements.block);
    const area = document.querySelector('.area');
    area.addEventListener('focus', () => {
      this.open(area.value, (currentValue) => {
        area.value = currentValue;
      });
    });
  },
  drawKeys() {
    const fragment = document.createDocumentFragment();
    const keyIcons = (iconName) => `<i class='material-icons'>${iconName}</i>`;
    this.elements.keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const lineBreak = ['backspace', '\\', 'enter', 'shiftR'].indexOf(key) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.setAttribute('data', arr[codeNumber]);
      codeNumber += 1;
      keyElement.classList.add('key');
      // eslint-disable-next-line default-case
      switch (key) {
        case 'backspace':
          keyElement.classList.add('key-backspace');
          keyElement.innerHTML = keyIcons('backspace');
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('input');
          });
          break;
        case 'caps':
          keyElement.classList.add('key-backspace');
          keyElement.innerHTML = keyIcons('keyboard_capslock');
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('backspace-active', this.properties.capslock);
          });
          break;
        case 'enter':
          keyElement.classList.add('key-backspace');
          keyElement.innerHTML = keyIcons('keyboard_return');
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('input');
          });
          break;
        case 'space':
          keyElement.classList.add('key-space');
          keyElement.innerHTML = keyIcons('space_bar');
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('input');
          });
          break;
        case 'done':
          keyElement.classList.add('key-backspace');
          keyElement.innerHTML = keyIcons('check_circle');
          keyElement.addEventListener('click', () => {
            this.close();
            this.triggerEvent('close');
          });
          break;
        case 'language':
          keyElement.innerHTML = keyIcons('language');
          keyElement.addEventListener('click', () => {
            this.toggleLanguage();
          });
          break;
        case 'pgRight':
          keyElement.textContent = '🠖';
          keyElement.addEventListener('click', () => {
            this.properties.value += '►';
            this.triggerEvent('oninput');
          });
          break;
        case 'pgLeft':
          keyElement.textContent = '🠔';
          keyElement.addEventListener('click', () => {
            this.properties.value += '◄';
            this.triggerEvent('oninput');
          });
          break;
        case 'pgUp':
          keyElement.textContent = '🠕';
          keyElement.addEventListener('click', () => {
            this.properties.value += '▲';
            this.triggerEvent('oninput');
          });
          break;
        case 'pgDown':
          keyElement.textContent = '🠗';
          keyElement.addEventListener('click', () => {
            this.properties.value += '▼';
            this.triggerEvent('oninput');
          });
          break;
        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvent('input');
          });
      }
      fragment.appendChild(keyElement);
      if (lineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },
  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  toggleCapsLock() {
    this.properties.capslock = !this.properties.capslock;
    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (key.textContent.length < 2) {
        key.textContent = this.properties.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },
  toggleLanguage() {
    this.properties.language = !this.properties.language;
    // eslint-disable-next-line default-case
    switch (this.properties.language) {
      case false:
        this.elements.keyLayout = [
          '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
          'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
          'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
          'shiftL', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'pgUp', 'shiftR',
          'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'pgLeft', 'pgDown', 'pgRight', 'Ctrl', 'language',
        ];
        break;
      case true:
        this.elements.keyLayout = [
          '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
          'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
          'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
          'shiftL', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '/', 'pgUp', 'shiftR',
          'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'pgLeft', 'pgDown', 'pgRight', 'Ctrl', 'language',
        ];
        break;
    }
    this.elements.container.innerHTML = '';
    this.elements.container.appendChild(this.drawKeys());
    this.elements.keys = this.elements.container.querySelectorAll('.key');
  },
  open(initialValue, input, close) {
    this.properties.value = initialValue || '';
    this.eventHandlers.input = input;
    this.eventHandlers.close = close;
    this.elements.block.classList.remove('keyboard-inactive');
  },
  close() {
    this.value = '';
    this.elements.block.classList.add('keyboard-inactive');
  },
};
document.onkeyup = function () {
  document.querySelectorAll('.key').forEach((e) => {
    e.classList.remove('key-active');
  });
};
document.onkeydown = function (event) {
  if (event.code === 'ShiftLeft') {
    flag = true;
  }
  if (event.code === 'AltLeft' && flag) {
    flag = false;
    keyboard.toggleLanguage();
  }
  document.querySelector(`.keys .key[data='${event.keyCode}']`).classList.add('key-active');
};
document.addEventListener('keydown', (event) => {
  const text = document.querySelector('.area');
  switch (event.key) {
    case 'Backspace':
      text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
      keyboard.properties.value = keyboard.properties.value.substring(0, keyboard.properties.value.length - 1);
      break;
    case 'Enter':
      text.innerHTML += '\n';
      keyboard.properties.value += '\n';
      break;
    case 'CapsLock':
      keyboard.toggleCapsLock();
      break;
    case 'ArrowRight':
      text.innerHTML += '►';
      keyboard.properties.value += '►';
      break;
    case 'ArrowUp':
      text.innerHTML += '▲';
      keyboard.properties.value += '▲';
      break;
    case 'ArrowDown':
      text.innerHTML += '▼';
      keyboard.properties.value += '▼';
      break;
    case 'ArrowLeft':
      text.innerHTML += '◄';
      keyboard.properties.value += '◄';
      break;
    case 'Shift':
      keyboard.elements.keys.forEach((key) => {
        if (key.textContent.length < 2) {
          // eslint-disable-next-line no-param-reassign
          key.textContent = key.textContent.toUpperCase();
        }
      });
      break;
    case 'Alt':
      break;
    case 'Control':
      break;
    default:
      text.innerHTML += event.key;
      keyboard.properties.value += event.key;
      break;
  }
});
document.addEventListener('keyup', (event) => {
  // eslint-disable-next-line default-case
  switch (event.key) {
    case 'Shift':
      keyboard.elements.keys.forEach((key) => {
        if (key.textContent.length < 2) {
          // eslint-disable-next-line no-param-reassign
          key.textContent = key.textContent.toLowerCase();
        }
      });
      break;
  }
});
// function setLocalStorage() {
//   localStorage.setItem('keyboard.properties.language', keyboard.properties.language);
// }
// window.addEventListener('beforeunload', setLocalStorage);
// function getLocalStorage() {
//   if (localStorage.getItem('keyboard.properties.language')) {
//     const lang = localStorage.getItem('keyboard.properties.language');
//     keyboard.toggleLanguage(lang);
//   }
// }
// window.addEventListener('load', getLocalStorage);
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
