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
}
function User(x){
		sessionStorage.setItem('uid',x.uid);
		sessionStorage.setItem('upw',x.upw);
		sessionStorage.setItem('uname',x.uname);
		return{
			uid: ()=>{return sessionStorage.getItem('uid');},
			upw: ()=>{return sessionStorage.getItem('upw');},
			uname: ()=>{return sessionStorage.getItem('uname');},
		}
}