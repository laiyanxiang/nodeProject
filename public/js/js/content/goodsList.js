function GoodsList(){
    this.container = $('.main_container'); 
}
GoodsList.template = `

<div id="goods_list">
    
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="goodsmodify">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">修改商品</h4>
      </div>
      <div class="modal-body">
        <form id="modify">
            <div class="form-group">
                <label for="modifygoodsName">商品名称</label>
                <input type="text" class="form-control" id="modifygoodsName" placeholder="请输入商品名称">
            </div>
            <div class="form-group">
                <label for="modifygoodsPrice">商品价格</label>
                <input type="text" class="form-control" id="modifygoodsPrice" placeholder="请输入商品价格">
            </div>
            <div class="form-group">
                <label for="modifygoodsDec">商品详情</label>
                <input type="text" class="form-control" id="modifygoodsDec" placeholder="请输入商品详情">
            </div>
            <div class="form-group">
                <label for="modifytel">联系电话</label>
                <input type="text" class="form-control" id="modifytel" placeholder="请输入联系方式">
            </div>
            <div class="form-group">
                <label for="modifygoodsPic">商品图片</label>
                <input type="file" id="modifygoodsPic">       
            </div>
            <button type="submit" class="btn btn-primary modifyput"  >提交</button>
        </form>
      </div>
    </div>
  </div>
</div>
`
GoodsList.prototype = {
    init:function () {
        this.togglePage();
        this.showGoods(1);
        this.modifyGoodsPutin();
    },
    togglePage:function () {

        this.container.html('');
        this.container.append(GoodsList.template);
    },

    // 商品显示
    showGoods:function (pageCode){
        $.ajax({
            type:"get",
            url:"/goods/list",
            data:{
                page:pageCode,
                limit:4
            },
            success:this.handleGoodsListSuc.bind(this)
        })
    },
    handleGoodsListSuc:function (data) {

        if(data.data.status){
            var List = data.data.list;
        var str = "";
        if(List.length > 0){
            for(var i = 0; i < List.length; i++){
                str += `
                <div class="row goods" id="${List[i]._id}">
                    <div class=" goods_one">
                    <div class="thumbnail">
                        <img src="${List[i].goodsPic}" alt="...">
                        <div class="caption">
                        <h3>${List[i].goodsName}</h3>
                        <p>￥${List[i].goodsPrice}</p>
                        <p>${List[i].goodsDec}</p>
                        <p><a href="#" class="btn btn-primary modifygoods"  role="button" data-toggle="modal" data-target="#goodsmodify" id="${i}" >编辑</a>
                         <a href="#" class="btn btn-default goods_remove" role="button">删除</a></p>
                        </div>
                    </div>
                    </div>
                </div>     
                ` 
            }
        }else{
            str +=`
                <div>没有更多了</div>
            `
        }
        str += `
        <nav aria-label="Page navigation" id = "page_change">
            <ul class="pagination">
                <li id="">
                    <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li id=""><a href="#">1</a></li>
                <li id=""><a href="#">2</a></li>
                <li id=""><a href="#">3</a></li>
                <li id=""><a href="#">4</a></li>
                <li id=""><a href="#">5</a></li>
                <li id="">
                    <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
      </nav>
        `
        this.container.find('#goods_list').html(str);
        new RemoveGoods().init();
        new PageChange().init();
        this.modifyGoods(data);
        }else{
            this.container.find('#goods_list').html(data.data.info);
        }
        
       
    },
    
    //修改商品
    modifyGoods:function (data) {
        var _this = this;
        this.container.find('.modifygoods').on('click',{list:data.data.list,_this:_this},this.handleModifyGoods);

    },
    handleModifyGoods:function (data) {
        let index = $(this).attr('id');
        data.data._this.container.find('#modifygoodsName').val(data.data.list[index].goodsName);
        data.data._this.container.find('#modifygoodsDec').val(data.data.list[index].goodsDec);
        data.data._this.container.find('#modifygoodsPrice').val(data.data.list[index].goodsPrice);
        data.data._this.container.find('#modifytel').val(data.data.list[index].tel);
        data.data._this.container.find('#modify').attr('code',data.data.list[index]._id);

    },
    // 提交修改后的商品消息
    modifyGoodsPutin:function () {
        this.container.find('#modify').on('submit',this.handleModifyCoodsPutinCb.bind(this))
    },
    handleModifyCoodsPutinCb:function (e) {
        e.preventDefault();
        let modifygoodsName = this.container.find('#modifygoodsName');
        let modifygoodsDec = this.container.find('#modifygoodsDec');
        let modifygoodsPrice = this.container.find('#modifygoodsPrice');
        let modifytel = this.container.find('#modifytel');
        let modifygoodsPic = this.container.find('#modifygoodsPic')[0];
        let code = this.container.find('#modify').attr('code');
        
        let formData = new FormData();
        formData.append("goodsName",modifygoodsName.val());
        formData.append("goodsPrice",modifygoodsPrice.val());
        formData.append("goodsDec",modifygoodsDec.val());
        formData.append("tel",modifytel.val());
        formData.append("goodsPic",modifygoodsPic .files[0]);  
        formData.append("id",code);
        
        $.ajax({
            type:"post",
            url:"/goods/modify",
            data:formData,
            cache:false,  //禁止使用缓存的结果
            processData:false, //传输的数据不被jquery封装
            contentType:false, //数据编码格式不使用jquery的方式
            success:this.handlemodifyGoodsSuc.bind(this)
        })
    },
    handlemodifyGoodsSuc:function (data) {
        if(data.data.status){  //图片一定要重新上传
           this.showGoods(1);
            alert('修改成功')
           $('#goodsmodify').modal('hide');
        }else{
            alert('添加失败');
        }
    }
}