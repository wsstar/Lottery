# Lottery
A plugin for a turntable lottery

# How to use

调用对象lottery对象的lottery方法初始化数据
```
lottery.lottery({
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

   });
   	getIndex:function(){}/*可配接口返回中奖位置函数，默认随机位置,放在lottery方法中*/
   
   	
```
