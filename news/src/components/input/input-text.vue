<template>
  <div class="input-div">
    <input
      class="input"
      v-bind="$attrs"
      :style="{width:width+'px',height:height+'px',border:border}"
      :value="value"
      @input="$emit('input',$event.target.value)"
      required
    >
    <!-- <div class="check">
      该项为必填项
      <div class="tran"></div>
    </div> -->
    <slot></slot>
    
  </div>
</template>
<script>
export default {
  props: { width: Number, height: Number, border: String, value: String },
  inheritAttrs: false
};
</script>
<style>
.input-div {
  width: 380px;
  height: 76px;
  margin: auto ;
  position: relative;
}
.input {
  width: 100%;
  height: 56px;
  font-size: 16px;
  
  padding: 0 20px;
  border-radius: 3px;
  box-sizing: border-box;
  outline: none;
  border: 0;
}
.input::-webkit-input-placeholder{
  color: #9b9b9b;
}
.input::-moz-placeholder{  
  color: #9b9b9b;      
}
.input:-ms-input-placeholder{ 
  color: #9b9b9b;       
}
/* .check{
  border:1px solid #999;
  border-radius: 10px;
  box-shadow: #999;
  background: #fff;
  padding: 10px; 
  color: #666;
  position: absolute;
  z-index: 10;
}
.tra{
  width: 0;
  height: 0;
  
} */
</style>