"use strict"
var brd = brd || {}
brd = (()=>{
	const WHEN_ERR = '호출하는 JS파일을 찾을 수 없습니다.';
	let _,js,brd_vue_js,$uid,$uname,router_js;
	
	let init =()=>{
		_=$.ctx();
		js=$.js();
		brd_vue_js = js+'/vue/brd_vue.js';
		$uid = $.uid;
		$uname = $.uname;
		router_js = js+'/cmm/router.js';
	}
	let onCreate=()=>{
		init()	
		$.when(
				$.getScript(brd_vue_js),
				$.getScript(router_js)
					
					).done(()=>{
						setContentView()
						navigation()	})
					.fail(()=>{})
	}
	let setContentView=()=>{
		
			$('head').html(brd_vue.brd_head({css:$.css(), img: $.img()}))
			$('body').html(brd_vue.brd_body({css:$.css(), img: $.img()})).addClass('bg-light')
			$('#recent_updates .media').remove()
			$('#recent_updates').append('<h3>등록된 글이 없습니다 </h3>')
	}
	let write=()=>{
		$('#recent_updates').html(brd_vue.brd_write())
		$('#write_form input[name=writer]').val($uname)
		$('#suggestions').remove()
		
		$('<input>',{
			style:"float:right;width:100px;margin-right:10px",
			value: 'RESET',
		})
		.addClass('btn btn-danger')
		.appendTo('#write_form')
		.click(()=>{
			
		})
		$('<input>',{
			style:"float:right;width:100px;margin-right:10px", 
			type:"submit",
			value:"SUBMIT",
		})
		.addClass('btn btn-primary')
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			let json={
					uid:$('#write_form input[name=writer]').val(),
					title:$('#write_form input[name=title]').val(),
					content:$('#write_form textarea[name=content]').val()
			}
			alert('id'+json.uid)
			alert('제목'+json.title)
			alert('글'+json.content)
			$.ajax({
				url:_+'/articles/',
				data:JSON.stringify(json),
				type:'POST',
				dataType:'json',
				contentType:'application/json',
				success:d=>{
					 alert('ajax1가 보낸 값'+json.uid)
					 $('#recent_updates').html('<h1>목록 불러오기</h1>')
				},
				error:e=>{
					 alert('게시물 등록 실패')
				}
			}
			)
		})
		
	}
	
	let navigation =()=>{
		$('<a>',{
			href : '#',
			click : e=>{
				e.preventDefault()
				
				write()
			},
			text : '글쓰기'
		})
		.addClass('nav-link')
		.appendTo('#go_write')
	}
	return {onCreate}
})()