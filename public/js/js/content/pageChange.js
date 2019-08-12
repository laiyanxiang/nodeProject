function PageChange(){
    this.container = $('.main_container');
}
PageChange.prototype = {
    init:function (){
        this.changePage();
    },
    changePage:function () {
        this.container.find('.pagination>li').each(this.toggleChangePage.bind(this));
        
    },
    toggleChangePage:function (index,target) {
       
        $(target).on('click',index,this.toggleChangePageCb.bind(this));
        
    },
    toggleChangePageCb:function (event) { 
        var pages = this.container.find('.pagination>li');
        console.log(pages.eq(event.data).attr('id'));
        if(event.data == 0){
        //    for(let i = 0 ; i < pages.length;i++){
        //         if(pages.eq(i).attr('id') == 1){
        //             this.showGoods(i-1);
        //             pages.eq(i-1).attr('id',1);
        //             pages.eq(i).attr('id',0);
        //         }
        //    }
        new  GoodsList().showGoods(1);

        }else if(event.data == pages.length - 1){
        //     for(let i = 0 ; i < pages.length;i++){
        //         if(pages.eq(i).attr('id') == 1){
        //             this.showGoods(i+1);
        //             pages.eq(i+1).attr('id',1);
        //             pages.eq(i).attr('id',0);
        //         }
        //    }
        new  GoodsList().showGoods(pages.length - 1);
        }else{
            new GoodsList().showGoods(event.data);
            // pages.eq(event.data).attr('id',1);
            // pages.eq(event.data).siblings().attr('id',0);
            
        }
    },
}