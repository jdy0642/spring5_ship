"use strict";
var auth = auth || {};
auth = (()=>{
	const WHEN_ERR='호출하는 js 파일을 찾을 수 없습니다.';
   let _,js,css,img,auth_vue_js,brd_js,router_js,cookie_js;
  
   let init =()=>{
      _=$.ctx()
      js=$.js()
      css=$.css()
      img=$.img()
      auth_vue_js = js+'/vue/auth_vue.js'
      router_js = js+'/cmm/router.js'
      brd_js = js+'/brd/brd.js'
      cookie_js = js + '/cmm/cookie.js'
   }
   
   let onCreate =()=>{
   		init()
   		$.when(
   				$.getScript(auth_vue_js),
   				$.getScript(brd_js),
   				$.getScript(cookie_js),
   				$.getScript(router_js))
   		.done(()=>{
   		setContentView()
   		$('#a_go_join').click(e=>{
	   			e.preventDefault()
	   			join()
	   		})
	        }).fail(()=>{alert(WHEN_ERR)})
	        ;
   		}

	let setContentView =()=>{
		$('head').html(auth_vue.login_head({css:$.css(), img: $.img()}))
		$('body').html(auth_vue.login_body({css:$.css(), img: $.img()})).addClass('text-center')
		login()
		
	}   			 
	let join = () =>{
     $('head').html(auth_vue.join_head())
     $('body').html(auth_vue.join_body())
     $('#uid').keyup(()=>{
   			if($('#uid').val().length > 2)
   				$.ajax({
          			 url : _+'/users/'+ $('#uid').val() +'/exist',
          			 contentType : 'application/json',
          			 success : d => {
          				 if(d.msg === 'SUCCESS'){
          					$('#dupl_check').val('사용가능한 ID입니다.')
          					.css('color','blue')
          					}
          					 else{
          						$('#dupl_check').val('사용불가능한 ID입니다.')
              					.css('color','red')
          						}
          				 },
          			 error : e => {
          				 alert('ajax 실패.')
          				 }
          		 })
   		});
         $('<button>',{
       	  text: '회원가입 완료하기',
       	  href: '#',
       	  click: e=>{
       		 e.preventDefault(); 		 
       		 let data = {uid : $('#uid').val(), 
       				 upw : $('#upw').val(), 
       				 uname : $('#uname').val()}
       		 $.ajax({
       			 url : _+'/users/',
       			 type : 'POST',
       			 dataType : 'json',
       			 data : JSON.stringify(data),
       			 contentType : 'application/json',
       			 success : d => {
       				 alert('ajax가 보낸 값'+d)
       				 if(d.msg === 'SUCCESS'){
       				$('head').html(auth_vue.login_head({css:$.css(), img: $.img()}))
       				$('body').html(auth_vue.login_body({css:$.css(), img: $.img()})).addClass('text-center')
       					 login()
       					 
       				 }
       					 else{
       						 alert('회원가입 실패')
       					 }
       				 },
       			 error : e => {
       				 alert('ajax 실패')
       				 }
       		 })
       	  }
         })
         .addClass('btn btn-primary btn-lg btn-block')
         .appendTo('#btn_join')  
		}    
		
		let login =()=>{	
		$('<button>',{
				type : "submit",
				text : "로그인",
				click : e=>{
					e.preventDefault();
					let data ={uid : $('#uid').val(),
							   upw : $('#upw').val()
							}
					$.ajax({
						url : _+'/users/'+$('#uid').val(),
						type : 'POST',
						dataType : 'json',
						data : JSON.stringify(data),
						contentType : 'application/json',
						success : d =>{
						$.when(
							setCookie("USER_ID",d.uid),
							alert('저장된 쿠키'+getCookie("USER_ID"))
						).done(()=>{
							brd.onCreate()
							}).fail(()=>{
							alert('when done fail 실패')
							})
							},
           			 error : e => {
           				 alert('로그인 실패')
           			 }
					})
				}
			}).addClass("btn btn-primary btn-lg btn-block")
			.appendTo('#btn_login')
		}
		return{onCreate}
	
})(); 		