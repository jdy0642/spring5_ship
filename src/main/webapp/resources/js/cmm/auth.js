"use strict";
var auth = auth || {};
auth = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
	let _,js, auth_vue_js, brd_vue_js;
	
	let init =()=>{
		_=$.ctx()
		js=$.js()
		auth_vue_js= js+'/vue/auth_vue.js'
		brd_vue_js=js+'/vue/brd_vue.js'
	}
	 let onCreate =()=>{
         init()
         	$.getScript(auth_vue_js).done(()=>{
         		setContentView()
         		$('#a_go_join').click(e=>{
         			e.preventDefault()
         			join()
         		})
         	})
     		.fail(()=>{alert(WHEN_ERR)})
         	
           }
	 let setContentView =()=>{
		login()
	 }
	 
	 
	 let join=()=>{
		 $('head').html(auth_vue.join_head())
         $('body').html(auth_vue.join_body())
         existId()
         $('<button>',{
                text: '회원가입 완료하기',
                href: '#',
                click: e=>{
                   e.preventDefault();
                   let data = {uid : $('#uid').val(), upw : $('#upw').val(), uname: $('#uname').val()}
                  $.ajax({
                     url : _+'/users/',
                     type : 'POST',
                     dataType : 'json',
                     data : JSON.stringify(data),
                     contentType : 'application/json',
                     success : d => {
                        alert('ajax 성공 : '+d.msg)
                        if(d.msg === 'SUCCESS')
                        login()
                        else
                        	alert('회원가입 실패')
                        
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
	 
	 
	 let login=()=>{
		 let x = {css:$.css(), img: $.img()}
         $('head').html(auth_vue.login_head(x))
         $('body')
         .addClass('text-center')
         .html(auth_vue.login_body(x))
		  $('<button>',{
              type : "submit",
              text : "login",
              click : e=>{
                 e.preventDefault()
                 alert('로그인 ');
                 let data = {uid : $('#uid').val(), upw : $('#upw').val(), uname:$('#uname').val()}
                 $.ajax({
                    url: _+'/users/'+$('#uid').val(),
                    data:JSON.stringify(data),
                    type:'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    success :d => {
                    	alert(d.uname+' 님 환영합니다')
                    	mypage()
                    },
                    error :e =>{
                    	alert('로그인 실패')
                    }
                 })
              }
           }).addClass("btn btn-primary btn-lg btn-block")
           .appendTo('#btn_login')
         }
	 
	 let myPage =() => {
		 $('head').html(brd_vue.brd_head())
		 $('body').html(brd_vue.brd_body())
	 }
	 
	 let existId =()=>{
		 $('<button>',{
             text : "exist",
             click : e=>{
                e.preventDefault()
                alert('아이디 체크 ');
                $.ajax({
                   url: _+'/users/'+$('#uid').val()+'/exist',
                   type:'GET',
                   contentType: 'application/json',
                   success :d => {
                	   if(d.msg === 'SUCCESS')
                   	alert(' 아이디 없음 ')
                   		else(
                   			alert('아이디 있음')
                   		)
                   },
                   error :e =>{
                   	alert('ajax 실패 ')
                   }
                })
             }
          }).addClass("btn btn-secondary")
          .appendTo('#btn_existId')
	 }
	 
	 
           return{onCreate, join, login, existId, myPage}
        })();

