function Home() {
    this.container = $('.main_container');
}
Home.template = `
    <div>
        <div class="row Home_main">
            <div class="col-md-2 content_1 box">今日访问量</div>
            <div class="col-md-2 content_2 box">今日阅读量</div>
            <div class="col-md-2 content_3 box">今日热搜</div>
        </div>
        <div id="echarts_main" class = "echarts_css" style="width: 600px;height:400px;"></div>
    </div>
`
Home.prototype = {
    init:function () {
        this.togglePage();
        this.createEchart();
    },
    togglePage:function () {
        this.container.html('');
        this.container.append(Home.template);
    },
    createEchart:function () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_main'));

        // 指定图表的配置项和数据
        var option = {
            title : {
                text: 'React学生管理',
                
            },
            legend: {
                data:['访问量','阅读量','热搜量']
            },
            toolbox: {
                show : true,
                feature : {
                    magicType : {show: true, type: ['line', 'bar']},
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'访问量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name:'阅读量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3] 
                },
                {
                    name:'热搜量',
                    type:'bar',
                    data:[3.6, 10.9, 18.0, 50.4, 60.7, 28.7, 180.6, 160.2, 50.7, 30.8, 5.0, 1.3]
                }
            ]
        };        

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}