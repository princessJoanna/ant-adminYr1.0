$(function() { 
	//execute('北京市','北京市');	
	$('#provinceCode').change(function(){
		execute(getProvinceNameBySelect(),getCityNameBySelect(),true);
	});
	
	$('#cityCode').change(function(){
			var provinceName = $("#provinceCode").find("option:selected").text();
			var cityName = $("#cityCode").find("option:selected").text();
			execute(provinceName,cityName,false);
	});
	
	$('#provinceCode').hover(function(){
		var provinceValue = $("#provinceCode").find("option:selected").val();
		if(provinceValue == -1){
			$("#cityCode").html("<option selected = 'selected' value='-1'>不选择市</option>"); 
			$("#districtCode").html("<option selected = 'selected' value='-1'>不选择行政区</option>"); 
		}
	});
	
	$('#cityCode').hover(function(){
		var cityValue = $("#cityCode").find("option:selected").val();
		if(cityValue == -1){
			$("#districtCode").html("<option selected = 'selected' value='-1'>不选择行政区</option>");
		}
	});
	
	
	$('#districtCode').hover(function(){
		var cityValue = $("#cityCode").find("option:selected").val();
		if(cityValue == -1){
			$("#districtCode").html("<option selected = 'selected' value='-1'>不选择行政区</option>");
		}
	});
	
});



function returnCityObjByProvince(provinceObject,province){

		var cityObj = null;
		$.each(provinceObject, function(name, value) {
	    	if(province == name){
				cityObj = value;
				return true;
	    	}
		});
		
		return cityObj;
}


function returndistrictObjByCity(cityObj,city){

		var districtObj = null;
		$.each(cityObj, function(name, value) {
			if(city == name){
				districtObj = value;
				return true;
	    	}
		});
		
		return districtObj;
}


function decodeDistrictObjByCity(districtObj){
		var decodeObj = null;
		var id;
		$.each(districtObj, function(name, value) {
			decodeObj = value;
			return true;
		});
         
		return decodeObj;
}

function getProvinceNameBySelect(){

	var provinceName = $("#provinceCode").find("option:selected").text();
	
	return provinceName;
}


function getCityNameBySelect(){

			var provinceName = $("#provinceCode").find("option:selected").text();
			//选取省的时候改变city和district的值 默认第一个选中
			var cityObj = returnCityObjByProvince(provinceObject,provinceName);//对应省的城市数据源
			var cityName;
			$.each(cityObj, function(name, value) {
				cityName = name;
				return true;
			});
			return cityName;
}


function excuteObjBySelectProvince(cityObj){
		$("#cityCode").html("");//重写赋值
		$("#cityCode").append("<option selected = 'selected' value='-1'>不选择市</option>"); 
		//将city Id与Name赋值
		var flag = true;
		$.each(cityObj, function(name, value) {
				var ids = value['id'];
				$("#cityCode").append("<option  value='"+ids+"'>"+name+"</option>"); 
		});
}

function excuteObjBySelectCity(decodeObj){
		$("#districtCode").html("");//重写赋值
		$("#districtCode").append("<option selected = 'selected' value='-1'>不选择行政区</option>"); 
		//将District Id与Name赋值
		var flag = true;
		$.each(decodeObj, function(name, value) {
				$("#districtCode").append("<option  value='"+value[1]+"'>"+value[4]+"</option>"); 
		});
}



function execute(provinceName,cityName,flag){

			var cityObj = returnCityObjByProvince(provinceObject,provinceName);//对应省的城市数据源
			var districtObj = returndistrictObjByCity(cityObj,cityName);
			var decodeObj = decodeDistrictObjByCity(districtObj);
			if(flag){
				excuteObjBySelectProvince(cityObj);
			}
			excuteObjBySelectCity(decodeObj);

}
