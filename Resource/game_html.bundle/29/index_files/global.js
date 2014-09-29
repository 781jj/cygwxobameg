// JavaScript Document


//显示开始   func 为开始函数的名字  m为参数
function ShowStartWnd(func,m)
{
	if(m==undefined)
		m="";
	var mul = curWidth/320;
	str = '<div id="StartDiv" style="display:block;text-align:center;position:absolute;top:20px;left:0;width:100%;height:90%;z-index: 98">'
	str +='<div style="width:' + (290*mul) + 'px; height:' + (240*mul) + 'px;margin:0px auto;margin-top:'+(40*mul)+'px;  position:relative;">';
	str+='<div id="titleDiv"><img id="nanren" src="vapp/50/nanren.png" width="'+(290*mul)+'" /></div>';
	str+='<div id="startBt" style="margin-top:-' + (90*mul) + 'px"><img onClick="'+func+'('+m+');HidStartWnd();" id="nbt01" src="vapp/50/nbt_01.png" width="'+(267*mul)+'" /></div>';  
	str+='</div>';
	str+='</div>';
	$("#warper").append(str);
}

function HidStartWnd()
{
	$("#StartDiv").remove();
}

//显示结束界面  type=1显示赢，其他显示输  func 为开始函数的名字  m为参数
function ShowEndWnd(type,fontStr,func,m)
{
	if(m==undefined)
		m="";
	var mul = curWidth/320;
	str='<div id="divEnd" style="position:absolute;top:0;left:0;width:100%;height:80%;z-index: 99;">';
	str+='<div style="width:' + (240*mul) + 'px; height:' + (220*mul) + 'px;margin:' + (60*mul) + 'px auto;  position:relative;">';
	str +='<img src="vapp/50/bg_02.png" width="' + (231*mul) + '" style="position:absolute; top:' + (65*mul) + 'px;left:0;" />';
    str +='<div style="position:absolute; top:70px; left:0;">';	
	str +='<div id="wndFont" style="padding-left:'+ (45*mul) +'px; height:'+(40*mul)+'px; padding-top: '+(90*mul)+'px; font-size:'+(12*mul)+'px; line-height:'+(17*mul)+'px;color:#000;text-align:left;">';
	str += fontStr;
    //str +=' 您撑过了<span style="color:red">12.66</span>秒<br>反应能力全国排名158775位<br> 击败了全国10%的用户<br> 获得称号：一坨<br>';         
    str +='</div>';  
     str +='<img src="vapp/50/nbt_02_4.png" width="'+(82*mul)+'" onClick="'+func+'('+m+');HidEndWnd();" style="margin-left:'+(15*mul)+'px;" />';      
    str +='<img src="vapp/50/nbt_02_3.png" width="'+(82*mul)+'" onClick="clickMore()" style="margin-left:'+(20*mul)+'px;" />';    
    str +='</div>';
	str +='</div>';
	str +='</div>';
	str +='</div>';

	$("#warper").append(str);
}

function HidEndWnd()
{
	$("#divEnd").remove();
}