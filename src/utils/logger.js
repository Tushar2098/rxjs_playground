import $ from 'jquery';
const $el = $('.console__body');

$('.console__clear').on('click', function(e) {
  e.preventDefault();
  $(this)
    .parents('.console')
    .find('.console__body')
    .empty();
});
const render = (identifier, value, isError) => {
  const className = isError ? 'error' : '';
  $el.append(`<div class="${className}">
                <span>${identifier}</span>  
                <code>${value}</code>
            </div>`);
};

const logger = (value, identifier = '', type = 'SUCCESS') => {
  console.log(value);
  let transformedVal = value;
  if (type === 'ERROR') {
    return render(identifier, transformedVal, type);
  }
  if (typeof value === 'object') {
    transformedVal = JSON.stringify(value, null, 2);
  }
  render(identifier, transformedVal);
};

export default logger;
