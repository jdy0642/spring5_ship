"use strict"
var navi = navi || {}
navi = (()=>{
	let _,js,css,img,brd_vue_js,$uid,$uname,$artseq,brd_js,navi_vue_js,auth_js;
	let init=()=>{
		  _=$.ctx()
	      js=$.js()
	      css=$.css()
	      img=$.img()
		brd_vue_js = js+'/vue/brd_vue.js'
		navi_vue_js = js+'/vue/navi_vue.js'
		$uid = $.uid
		$uname = $.uname
		$artseq = $.artseq
		brd_js = js+'/brd/brd.js'
		auth_js = js +'/cmm/auth.js'
	}
	let onCreate=()=>{
		init()
		$.when(
				$.getScript(auth_js),
				$.getScript(brd_js),
				$.getScript(navi_vue_js)
				)
		.done(()=>{
			setContentView()
		})
		.fail(()=>{
		})
	}
	let setContentView=()=>{
		$('<a>',{
			href : '#',
			click : e=>{
				e.preventDefault()
				brd.write()
			},
			text : '글쓰기'
		})
		.addClass('nav-link')
		.appendTo('#go_write')
		
		$('<a>',{
			href : '#',
			click : e=>{
				e.preventDefault()
				deleteCookie()
				app.run(_)
				
			},
			text : '로그아웃'
		})
		.addClass('nav-link')
		.appendTo('#logout')
		
	}
	return{onCreate}
})()