"use strict";function render(n){var o="";n.forEach(function(n){o+="<p>"+n.name+"</p>\n                <p>"+n.title+"</p>"}),$(".box").html(o)}$(function(){$.ajax({url:"/mock",dataType:"json",success:function(n){console.log(n),render(n)},error:function(n){console.log(n)}})});