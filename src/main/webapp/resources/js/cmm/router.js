"use strict";
function Session(x) {
	sessionStorage.setItem('ctx',x);
	sessionStorage.setItem('js',x + '/resources/js');
	sessionStorage.setItem('css',x + '/resources/css');
	sessionStorage.setItem('img',x + '/resources/img');
	return{
		ctx: () => {return sessionStorage.getItem('ctx');},
		js: () => {return sessionStorage.getItem('js');},
		img: () => {return sessionStorage.getItem('img');},
		css: () => {return sessionStorage.getItem('css');}
	}
function User(){
		sessionStorage.setItem('uid',uid);
		sessionStorage.setItem('upw',upw);
		sessionStorage.setItem('uname',uname);
		return{
			uid: ()=>{return sessionStorage.getItem('uid');},
			upw: ()=>{return sessionStorage.getItem('upw');},
			uname: ()=>{return sessionStorage.getItem('uname');},
		}
}
}