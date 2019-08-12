function RemoveGoods(){
    this.removebtns = $('.goods .goods_remove');
    this.container = $('.main_container');
}
RemoveGoods.prototype ={
    init:function () {
        this.goodsRemove();
    },
    goodsRemove:function () {
        this.removebtns.each(this.handlegoodsRemove.bind(this));
    },
    handlegoodsRemove:function (index,target) {

        $(target).on('click',index,this.handlegoodsRemoveCli.bind(this));
    },
    handlegoodsRemoveCli:function (event) {
        event.preventDefault();
        var i = event.data;
        var prekey = this.container.find('.goods').eq(i).attr('id')
        $.ajax({
            type:"post",
            url:"/goods/remove",
            data:{
                id:prekey,
                index:i
            },
            success:this.toggleGoodsRemoveSuc.bind(this)
        })
    },
    toggleGoodsRemoveSuc:function (data) {
        if(data.data.status == 1){
            this.container.find('.goods').eq(data.data.index).remove();
            new GoodsList().showGoods(1);
            alert("删除成功！");
        }else{
            return ;
        }
    }
}