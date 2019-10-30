"use strict"
var adm = adm || {}
adm =(()=>{
	let _,js,css,img
	
	let init=()=>{
		  _=$.ctx()
	      js=$.js()
	      css=$.css()
	      img=$.img()
	}
	let onCreate=()=>{
		alert('어드민.제이에스')
		init()
		setContentView()
	}
	let setContentView=()=>{
		
	}
	return{onCreate}
})()