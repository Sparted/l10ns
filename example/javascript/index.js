
var requireLocalizations = require('./output/all');
var $trans = requireLocalizations('en-US');

console.log($trans('Fooobar', { alloha: 1260 }));
console.log($trans('Alloaa', { alloha: 1260 }));
