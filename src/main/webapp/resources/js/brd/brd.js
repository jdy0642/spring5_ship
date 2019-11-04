"use strict"
var brd = brd || {}
brd = (()=>{
	const WHEN_ERR = '호출하는 JS파일을 찾을 수 없습니다.';
	let _,js,css,img,brd_vue_js,router_js,navi_js,navi_vue_js,page_vue_js;
	let init =()=>{
		  _=$.ctx()
	      js=$.js()
	      css=$.css()
	      img=$.img()
		brd_vue_js = js+'/vue/brd_vue.js';
		router_js = js+'/cmm/router.js';
		navi_js = js+'/cmm/navi.js';
		navi_vue_js = js+'/vue/navi_vue.js';
		page_vue_js = js+'/vue/page_vue.js';
	}
	let onCreate=()=>{
		init()	
		$.when(
				$.getScript(brd_vue_js),
				$.getScript(navi_vue_js),
				$.getScript(page_vue_js),
				$.getScript(navi_js)
		).done(()=>{
			setContentView()
			navi.onCreate()
		}).fail(()=>{
		})
	}
	let setContentView=()=>{
			$('head').html(brd_vue.brd_head({css:$.css(), img: $.img()}))
			$('body').html(brd_vue.brd_body({css:$.css(), img: $.img()})).addClass('bg-light')
			$(navi_vue.navi()).appendTo('#navi')
			recent_updates(1)
	}
	let recent_updates=x=>{
		alert('호출된 페이지 번호: ' +x)
		$('#recent_updates .media').remove()
		$('#suggestions').remove()
		$('#recent_updates .d-block').remove()
		
		$.getJSON(_+'/articles/page/'+x,d=>{
			$.each(d.articles, (i,j)=>{
				$('<div class="media text-muted pt-3" >'+
				'<img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfcdddb72%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfcdddb72%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">'+
				'<p id="id_'+i+'"class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'+
				'</p></div>').appendTo('#recent_updates')
				
				$('<strong class="d-block text-gray-dark">@<a>'+j.uid+'</a></strong>')
				.appendTo("#id_"+i)
				.click(()=>{
					alert('id 클릭')
				})
				$('<a>'+j.title+'</a>')
				.appendTo("#id_"+i)
				.click(()=>{
					alert('제목 클릭')
					detail(j)
				})
			})
			$(page_vue.page())
				.appendTo('#recent_updates')
			$('#pagination').empty()
			let t = ''
			let i = 0
			$.each(d.pages,(i,j)=>{
				$('<li class="page-item"><a class="page-link" href="#">'+j+'</a></li>')
				.appendTo('#pagination')
			})
					
		})
	}
	let write=()=>{
		alert('라이트_'+_)
		$('#recent_updates').html(brd_vue.brd_write())
		$('#write_form input[name="writer"]').val(getCookie("USER_ID"))
		$('#suggestions').remove()
		$('<input>',{
			style:"float:right;width:100px;margin-right:10px",
			value: '취소',
		})
		.addClass('btn btn-danger')
		.appendTo('#write_form')
		.click(()=>{
		})
		$('<input>',{
			style:"float:right;width:100px;margin-right:10px", 
			value:"제출",
		})
		.addClass('btn btn-primary')
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			let json={
					uid:$('#write_form input[name="writer"]').val(),
					title:$('#write_form input[name="title"]').val(),
					content:$('#write_form textarea[name="content"]').val()
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
					    $('#recent_updates div.container-fluid').remove()
					    recent_updates()
				},
				error:e=>{
					 alert('게시물 등록 실패')
				}
			}
			)
		})
	}
	let count=()=>{
		$.ajax({
			url:_+'/articles/count',
			data: JSON.stringify(json),
			dataType:'json',
			contentType:'application/json',
			success:d=>{
		},
		error:e=>{
			 alert('게시물 등록 실패')
		}
		})
	}
	
	let detail=x=>{
		$('#recent_updates').html(brd_vue.brd_write())
		$('#recent_updates div.container-fluid h1').html('Article Detail')
		$('#write_form input[name="writer"]').val(x.uid)
		$('#write_form input[name="title"]').val(x.title)
		$('#write_form textarea[name="content"]').val(x.content)
		$('#suggestions').remove()
		$('<input>',{
			style:"float:right;width:100px;margin-right:10px",
			value: '삭제',
		})
		.addClass('btn btn-danger')
		.appendTo('#write_form')
		.click(()=>{
			$.ajax({
				url:_+'/articles/'+x.artseq,
				data:JSON.stringify(x),
				type:'DELETE',
				dataType:'json',
				contentType:'application/json'
			})
			alert('삭제완료')
			 $('#recent_updates div.container-fluid').remove()
			recent_updates()
		})
		$('<input>',{
			style:"float:right;width:100px;margin-right:10px", 
			type:"submit",
			value:"수정",
		})
		.addClass('btn btn-primary')
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			let json={
					artseq:x.artseq,
					uid:$('#write_form input[name="writer"]').val(),
					title:$('#write_form input[name="title"]').val(),
					content:$('#write_form textarea[name="content"]').val()
			}
			$.ajax({
				url:_+'/articles/'+x.artseq,
				data:JSON.stringify(json),
				type:'PUT',
				dataType:'json',
				contentType:'application/json'
			})
			alert('수정완료')
			 $('#recent_updates div.container-fluid').remove()
			recent_updates()
		})
	}
	return {onCreate, write}
})()