import Vue from 'vue';
import validator from  './validator';
import dropdown from './dropdown'
const dires = {
    validator,
    dropdown,
}

for(const [key, value] of Object.entries(dires)) {
    console.log(key, value)
    Vue.directive(key, value);
}
// Vue.directive('validator', validator);