function Slider(){
    this.slider = $('.nav-stacked>li');
    
}
Slider.prototype = {
    init:function () {
        this.handleSlider();
    },
    handleSlider:function () {
        this.slider.each(this.handleSliderCb.bind(this))
    },
    handleSliderCb:function (index,target) {
        this.createPage(0);
        $(target).on('click',index,this.handleSliderClick.bind(this));
    },
    handleSliderClick:function (event) {
        if(typeof(event) == "number"){
            this.slider.eq(event).addClass("active").siblings().removeClass("active");
            this.createPage(event);
        }else{
            this.slider.eq(event.data).addClass("active").siblings().removeClass("active");
            this.createPage(event.data);
        }
        
    },
    createPage:function (index) {
        switch(index){
            case 0:
                new Home().init();
                break;
            case 1:
                new GoodsList().init();
                break;
            case 2:
                new AddGoods().init();
                break;
            case 3:
                new User().init();
                break;
            default:
                return;
        }
    }
}

new Slider().init();