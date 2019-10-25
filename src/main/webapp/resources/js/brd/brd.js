"use strict";
var brd = brd || {};
brd = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
		let _,js,brd_vue_js,auth_js;
	
	let init =()=>{
		_=$.ctx()
		js=$.js()
		brd_vue_js=js+'/vue/brd_vue.js'
		auth_js=js+'/cmm/auth.js'
	}
	let onCreate=()=>{
		init()
		setContentView()
	}
	let setContentView =()=>{
		$.getScript(brd_vue_js),()=>{
			$('head').html(brd_vue.brd_head({css:$.css(), img: $.img()}))
	         $('body').html(brd_vue.brd_body({css:$.css(), img: $.img()}))
	         $('#recent_updates .media').remove()
	         $('#recent_updates').append('<h1>등록된 글이 없습니다.</h1>')
	         $('<a>',{
	        	 href:'#',
	        	 click: e=>{
	        		 e.preventDefault()
	        		 write()
	        	 },
	        	 text:'글쓰기'
	         })
	         .addClass('nav-link active')
	         .appendTo('#go_write')
		}
	}
	let write =()=>{
		alert('글쓰기로 이동 ')
			$('#recent_updates').html(brd_vue.brd_write())
			$('#suggestions').remove()
	}
	return{onCreate}
})();