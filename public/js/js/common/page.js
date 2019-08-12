function Page(){
    this.container = $('.content');
    
}
Page.prototype = {
    init:function () {
        this.createPage(true);
    },
    createPage:function (flage) {
        if(flage){
            this.register = new Register(this.container);
        }else{
            this.login = new Login(this.container);
        }
    }
}
new Page().init();