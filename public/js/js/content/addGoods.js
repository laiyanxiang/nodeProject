function AddGoods() {
    this.container = $('.main_container');
}
AddGoods.template = `
<div class = "addgoods">
    <form id="add">
    <div class="form-group">
        <label for="goodsName">商品名称</label>
        <input type="text" class="form-control" id="goodsName" placeholder="请输入商品名称">
    </div>
    <div class="form-group">
        <label for="goodsPrice">商品价格</label>
        <input type="text" class="form-control" id="goodsPrice" placeholder="请输入商品价格">
    </div>
    <div class="form-group">
        <label for="goodsDec">商品详情</label>
        <input type="text" class="form-control" id="goodsDec" placeholder="请输入商品详情">
    </div>
    <div class="form-group">
        <label for="tel">联系电话</label>
        <input type="text" class="form-control" id="tel" placeholder="请输入联系方式">
    </div>
    <div class="form-group">
        <label for="goodsPic">商品图片</label>
        <input type="file" id="goodsPic">       
    </div>
    <button type="submit" class="btn btn-primary">提交</button>
    </form>
</div>
`
AddGoods.prototype = {
    init:function () {
        this.togglePage();
        this.addGoods();
    },
    togglePage:function () {
        this.container.html('');
        this.container.append(AddGoods.template);
    },
    addGoods:function () {
        this.container.find('#add').on('submit',this.handleAddGoodsCb.bind(this));
    },
    handleAddGoodsCb:function (e) {
        e.preventDefault();
        
        let goodsName = this.container.find('#goodsName');
        let goodsPrice = this.container.find('#goodsPrice');
        let goodsDec = this.container.find('#goodsDec');
        let tel = this.container.find('#tel');
        let goodsPic = this.container.find('#goodsPic')[0];

        let formData = new FormData();
        formData.append("goodsName",goodsName.val());
        formData.append("goodsPrice",goodsPrice.val());
        formData.append("goodsDec",goodsDec.val());
        formData.append("tel",tel.val());
        formData.append("goodsPic",goodsPic.files[0]);
       
        $.ajax({
            type:"post",
            url:"/goods/add",
            data:formData,
            cache:false,  //禁止使用缓存的结果
            processData:false, //传输的数据不被jquery封装
            contentType:false, //数据编码格式不使用jquery的方式
            success:this.handleAddSuc.bind(this)
        })
    },
    handleAddSuc:function (data){
        console.log(data);
        if(data.data.status){
            alert('添加成功！');
            new GoodsList().init();  
            new Slider(). handleSliderClick(1); 
        }else{
            alert('添加失败');
        }
    }
}