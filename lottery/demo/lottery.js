/*
*lottery 
*by star 2017/12/14
*/

/*初始数据*/

var original = {
	selector:"#lottery", /*容器*/
	element:'.lottery-unit',/*中奖元素通用class*/
	start:'.start',/*开始按钮*/
	speed:500, /*初始转动速率*/
	index:-1 , /*初始奖品位置*/
	activeClass:'active',/*奖品选中样式*/
	isBegining:false,/*抽奖是否开始*/
	isRuning:false,/*加速是否开启，默认false，否则将不存在加速*/
	minSpeed:500,/*最慢转速*/
	maxSpeed:50,/*最快转速*/
	during:3000,/*匀速转动时长*/
}

var lottery = {
	/*
		数据初始化
	*/
	lottery :function(options){
		this.options = $.extend(true,original,options);/*深度拷贝*/
		this.container = $(this.options.selector);
		this.leng = this.container.find(this.options.element).length;
		this.start()
	},
	/*
		开始转动
	*/
	start:function(){
		var _this = this
		_this.container.find(_this.options.start).bind("click",function(){
			if(!_this.options.isBegining){
				_this.roll();
				_this.options.isBegining=true
			}
			
		})
	},
	/*
		转动加速阶段
	*/
	up:function(){
		var _this = this;
		if(_this.options.speed > _this.options.maxSpeed){
			_this.options.speed-=50
			_this.upTimer = setTimeout(function(){_this.up()},_this.options.speed)
		}else{
			_this.uniform()
		}
		
	},
	/*
		转动减速阶段
	*/
	down:function(){
		var _this=this;
		if(_this.options.speed < _this.options.minSpeed){
			_this.options.speed+=50;
			_this.downTimer = setTimeout(function(){_this.down()},_this.options.speed)
		}else{
			_this.stop()
		}
	},
	/*
		转动匀速阶段
	*/
	uniform:function(){
		var _this = this;
		clearTimeout(_this.upTimer);
		setTimeout(function(){_this.down()},_this.options.during)
	},
	/*
		转动停止
	*/
	stop:function(){
		var _this = this;
		if(this.options.index == this.options.target){
			clearTimeout(_this.downTimer)
			clearTimeout(_this.rollTimer);
			clearTimeout(_this.stopTimer);
			_this.options.isRuning = false;
			_this.options.isBegining = false;
		}else{
			_this.stopTimer = setTimeout(function(){_this.stop()},_this.options.speed)
		}
		
	},
	/*
		转动效果
	*/
	roll: function(){
		var _this = this;
		_this.container.find('.lottery-unit-'+_this.options.index).removeClass(_this.options.activeClass);
		_this.options.index++
		if(_this.options.index > _this.leng-1){
			_this.options.index=0
		}
		_this.container.find('.lottery-unit-'+_this.options.index).addClass(_this.options.activeClass);
		_this.rollTimer = setTimeout(function () {_this.roll()},_this.options.speed)
		/*加速只需调用一次*/
		if (!_this.options.isRuning) {
			_this.up();
			_this.getIndex();
			_this.options.isRuning = true;

		}
	},
	/*
		获取中奖位置，可用户自定义
	*/
	getIndex:function(){
		var _this = this;
		if(_this.options.getIndex){
			_this.options.getIndex.call(this)
		}else{
			_this.options.target = Math.floor(Math.random()  * _this.leng);
			
		}
		// console.log(_this.options.target);
	}

}