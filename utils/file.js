'use strict';
var fs = require('fs');
var path = require('path');
var glob = require("glob");

exports.eachFileSync = function(dir, callback) {
	var files = fileDisplay(dir)
	files.forEach(function(file) {
		callback(file)
	})
}

/** 
 * 文件遍历方法 
 * @param dir 需要遍历的文件路径 
 */  
function fileDisplay(dir){
	var checks = []
	function getFiles(dir) {
		var files = fs.readdirSync(dir);
		//遍历读取到的文件列表  
		files.forEach(function(file){
			var filePath = dir
			//获取当前文件的绝对路径  
			//var filedir = path.join(filePath, file);  
			var filedir = `${filePath}/${file}`;  
			//根据文件路径获取文件信息，返回一个fs.Stats对象  
			var stats = fs.statSync(filedir);
			var isFile = stats.isFile();//是文件  
			var isDir = stats.isDirectory();//是文件夹  
			if(isFile){
				checks.push(filedir)
			}  
			if(isDir){
					filePath = filedir 
					getFiles(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
			}  
		})
	}
	getFiles(dir)

	return checks;
}  
