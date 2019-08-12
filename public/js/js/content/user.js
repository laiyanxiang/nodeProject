function User() {
    this.container = $('.main_container');
}
User.template = `
<div class = "User">
<form>
  <div class="form-group">
    <label for="articl_title">文章标题</label>
    <input type="text" class="form-control" id="articl_title" placeholder="请输入文章标题">
  </div>
  <div class="form-group">
    <label for="articl_antitle">文章副标题</label>
    <input type="password" class="form-control" id="articl_antitle" placeholder="请输入文章副标题">
  </div>
  <div id = "editor" class="editor_box"></div>
  <button type="submit" class="btn btn-primary">提交</button>
</form>

</div>
`
User.prototype = {
    init:function () {
        this.togglePage();
        this.editor();
    },
    togglePage:function () {
        this.container.html('');
        this.container.append(User.template);
    },
    editor:function () {
        console.log(window.wangEditor);
        var E = window.wangEditor
        var editor = new E('#editor')
        // 或者 var editor = new E( document.getElementById('editor') )
        console.log(editor);
        editor.create()
    }
}