'use strict';

class Trie {
  constructor (data){
    this.children = {};
    if(typeof(data) === 'string') data = [data];
    data.forEach(str => {
      this.add(str);
    });
  }

  add(str){
    if(str[0]) {
      if(!this.children[str[0]]){
        this.children[str[0]] = new Node();
      }
      this.children[str[0]]._add(str.slice(1));
    } else {
      return null;
    }
  }

  readLeaves(){
    Object.keys(this.children).forEach(key => this.children[key]._readLeaves(key));
  }
  
  readSubStrings(min, max) {
    Object.keys(this.children).forEach(key => this.children[key]._readSubStrings(key, min, max));
  }
   
}

class Node {
  constructor(){
    this.children = {};
    this.value = 1;
  }

  _add(str) {
    this.value++;
    if (this.children[str[0]]) {
      // this.children[str[0]].value++;
    } else {
      this.children[str[0]] = new Node();
    }
    str[1] ? this.children[str[0]]._add(str.slice(1)) : null;
  }

  _readLeaves(str){
    Object.keys(this.children).length ? Object.keys(this.children).forEach(key => this.children[key]._readLeaves(str + key)) : console.log(str);
  }

  _readSubStrings(str, min, max) {
    if(this.value > min && this.value < max) {
      let children = Object.values(this.children);
      for(let i in children) { 
        if(children[i].value < this.value) {
          console.log(str);
          break;
        }
      }
    }
    Object.keys(this.children).length ? Object.keys(this.children).forEach(key => this.children[key]._readSubStrings(str + key, min, max)) : null;

  }
}













