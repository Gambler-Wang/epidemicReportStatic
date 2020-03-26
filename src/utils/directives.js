import Vue from 'vue';
// 文字大于15个字省略号
Vue.directive('maxLength',function(el,bunding){
  const max = bunding.arg ? Number.parseInt( bunding.arg ) : 7;
if((typeof bunding.value) === 'string' && bunding.value.length > max){
      el.innerHTML = bunding.value.slice(0,max)+'...';
  }else{
      el.innerHTML = bunding.value;
  }
  el.setAttribute('title',bunding.value);
});