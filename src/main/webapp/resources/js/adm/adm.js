"use strict"
var adm = adm || {}
adm =(()=>{
	let _,js,css,img,navi_js,navi_vue_js
	
	let init=()=>{
		  _=$.ctx()
	      js=$.js()
	      css=$.css()
	      img=$.img()
	      navi_js = js+'/cmm/navi.js'
	      navi_vue_js = js+'/vue/navi_vue.js'
	}
	let onCreate=()=>{
		init()
		$.when(
				$.getScript(navi_js),
				$.getScript(navi_vue_js)
		).done(()=>{
			setContentView()
		}).fail(()=>{
			alert('에러')
		})
	}
	let setContentView=()=>{
		
		$('body').html(navi_vue.navi())
		navi.onCreate()
		
		$('<table id="tab">'+
			'  <tr>'+
			'  </tr>'+
			'</table>')
		.css({border: '1px solid black',width: '80%', height:'80%', margin:'0 auto'})
		.appendTo('body')
		
		$.each(
				[{id:'left',width:'20%'},
				{id:'right',width:'80%'}],
				(i,j)=>{
				$('<td id="'+j.id+'"></td>')
				.css({border: '1px solid black',width: j.width, 'vertical-align':'top'})
				.appendTo('#tab tr')
			}
		)
		$.each(
				[{txt:'고객관리',name:'cust_mgmt'},
				{txt:'구장등록',name:'stad_reg'},
				{txt:'웹크롤링',name:'web_crawl'},
				{txt:'구장관리',name:'stad_mgmt'},
				{txt:'수익구조',name:'data_graph'}],
			(i,j)=>{
			$('<div name="'+j.name+'">'+j.txt+'</div>')
			.css({border: '1px solid #ddd', margin: 'auto 0', 'line-height': '50px'})
			.appendTo('#left')
			.click(function(){
				$(this).addClass('active')
				$(this).siblings().removeClass('active')
				switch ($(this).attr('name')) {
				case 'cust_mgmt':
					break;
				case 'stad_reg':
					break;
				case 'stad_mgmt':
					break;
				case 'data_graph':
					break;
				case 'web_crawl':
					webCrawl()
					break;
				}
			})
		})
	}
	let webCrawl=()=>{
			$('<h2>Browser Seletcions</h2></br>'+
				'  <select id="right2" size="1" >'+
				'  </select>'+
				'  <br><br>'+
				'  <input type="text">'+
				'  <input type="submit">'
			).appendTo('#right')
		$.each(
				[{txt:'naver',name:'네이버'},
				{txt:'google',name:'구글'},
				{txt:'daum',name:'다음'}],
				(i,j)=>{
			$('<option value="'+j.txt+'">'+j.name+'</option>')
			.appendTo('#right2')
		})
	}
	return{onCreate}
})()