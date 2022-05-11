const keyboard = [];
document.onkeypress = (event) => {
  keyboard.push(event.charCode);
  console.log(keyboard);
};
