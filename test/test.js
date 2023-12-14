import TranslateEasy from '../dist/index.js';
const translate = new TranslateEasy();
translate.init('es', '')
    .then(() => {
    console.log(translate.translate('hello'));
    translate.translateTemplate();
})
    .catch(error => {
    console.error('Error during translation initialization:', error);
});
