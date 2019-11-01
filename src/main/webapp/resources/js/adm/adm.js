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
			$('</br></br></br><h2>Web Crawling</h2></br>'+
				'<form id="crawl_form">'+
				'  <select name="site" id="right2" size="1" >'+
				'  </select><br><br>'+
				   '<input class="form-control mr-sm-2" type="text" placeholder="insert URL for crawling" aria-label="Search">'+
				'</form>'
			).appendTo('#right')
			$('#crawl_form input[class="form-control mr-sm-2"]')
		.css({width:'80%'})
		$.each(
				[{sub:'naver.com'},
				{sub:'google.co.kr'},
				{sub:'daum.net'}],
				(i,j)=>{
			$('<option value="'+j.sub+'">'+j.sub+'</option>')
			.appendTo('#crawl_form select')
		})
		$('<button class="btn btn-secondary my-2 my-sm-0" type="submit">go crawl</button>')
		.appendTo('#crawl_form')
		.click(e=>{
			e.preventDefault()
			let arr = [$('#crawl_form select[name="site"]').val(),
						$('#crawl_form input[type="text"]').val()]
			if(!$.fn.nullchecker(arr)){
			$.getJSON(_+'/tx/crawling/'+arr[0]+'/'+arr[1],d=>{
			})
			}
		})
	}
	return{onCreate}
})()