export function filterStr(str)
{
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
  var specialStr = "";
  for(var i=0;i<str.length;i++)
  {
       specialStr += str.substr(i, 1).replace(pattern, ''); 
  }
  return specialStr;
}

/**
* 检测过滤字符串函数
**/
function checkStr()
{
  var str = document.getElementById("pContent").innerHTML;
  alert("过滤之前的字符串：" + str);
  str = filterStr(str);
  alert("过滤之后的字符串：" + str);
}