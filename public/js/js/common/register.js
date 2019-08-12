function Register(container){
    this.container = container;
    this.init();
}
Register.template = `
            <div class="logo">
                <img src="https://cas.1000phone.net/cas/images/login/logo.png" alt="">
            </div>
            <form id="register">
                <div class="form-group">
                    <label for="register_username">用户名</label>
                    <input type="text" class="form-control" id="register_username" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label for="register_password">密码</label>
                    <input type="password" class="form-control" id="register_password" placeholder="请输入密码">
                </div>
                <p class="text-primary register_info " id="js_pageToggle">已有用户名，请登录</p>
                <button type="submit" class="btn btn-primary submit_btn">注册</button>
            </form>
`
Register.prototype = {
    init:function () {
        this.createPage();
        this.pageToggle();
        this.submit();
    },
    createPage:function () {
        this.container.html("");
        this.container.append(Register.template);
    },
    pageToggle:function () {
        this.container.find('#js_pageToggle').on('click',this.handleToggleCb.bind(this));
    },
    handleToggleCb:function () {
        new Page().createPage(false);
    },
    submit:function () {
        this.container.find('#register').on('submit',this.handleSubmitCb.bind(this));
    },
    handleSubmitCb:function (e) {
        e.preventDefault();
        var username = this.container.find("#register_username").val();
        var password = this.container.find("#register_password").val();


        $.ajax({
            type:"post",
            url:"/users/register",
            data:{
                username,
                password
            },
            success:this.handleSubmitSuccess.bind(this)
        });
    },
    handleSubmitSuccess:function (data) {
        console.log(data);
    }
}
