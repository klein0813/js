# eChart

通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的图

> 基础语法

  ```js
    echarts.init(document.getElementById('main')).setOption(option);
  ```

> 简单柱状图例子

  ```js
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'), 'dark');

    // 指定图表的配置项和数据
    var option = {
      color: ['#0000ff', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
      title: {
          text: '第一个 ECharts 实例'
      },
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 96, 10, 60]
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  ```

> 简单饼状图例子

```js
  var option = {
    title: {
        text: '第一个 ECharts 实例'
    },
    tooltip: {},
    series: {
      name: '饼状图',
      type: 'pie',
      radius: '50%',
      roseType: 'angle',
      data: [
        { name: 'a', value: 40 },
        { name: 'b', value: 50 },
        { name: 'c', value: 60 }
      ],
      itemStyle: {
        color: ['#0000ff', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        borderWidth: 5,
        borderColor: '#ccc',
        borderType: 'dot',
        opacity: .8,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 100
      }
    }
  };
```

> 样式设置

* 颜色主题
  * ECharts4 开始，除了默认主题外，内置了两套主题，分别为 light 和 dark
  * 也可以在官方的 [主题编辑器](https://www.echartsjs.com/theme-builder/) 选择适合的主题下载(js/json 版本)
    * js 版本引入

      ```js
        // <script src="https://www.runoob.com/static/js/wonderland.js"></script>
        // ...

        // HTML 引入 wonderland.js 文件后，在初始化的时候调用
        var myChart = echarts.init(dom, 'wonderland');
      ```

    * json 版本引入

      ```js
        //主题名称是 wonderland
        $.getJSON('wonderland.json', function (themeJSON) {
          echarts.registerTheme('wonderland', themeJSON)
          var myChart = echarts.init(dom, 'wonderland');
        });
      ```

  * 调色盘 - `color`，在 option 中设置，定了一组颜色，图形、系列会自动从其中选择颜色，分全局的调色盘和系列自己专属的调色盘

> ECharts 异步加载数据

* 异步获取数据后通过 setOption 填入数据和配置项就行
* showLoading 和 hideLoading

  ```js
  var myChart = echarts.init(document.getElementById('main'));
  myChart.showLoading();  // 开启 loading 效果
  $.get('https://www.runoob.com/static/js/echarts_test_data.json', function (data) {
    myChart.hideLoading();  // 隐藏 loading 效果
    myChart.setOption({
      // ...
    })
  })
  ```

* 数据的动态更新

  ECharts 由数据驱动,只需要定时获取数据，setOption 填入数据，而不用考虑数据到底产生了那些变化，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化

> ECharts 数据集（dataset）

* dataset 组件用于单独的数据集声明，从而数据可以单独管理，被多个组件复用，并且可以基于数据指定数据到视觉的映射

* 方式一

  ```js
    option = {
      legend: {},
      tooltip: {},
      dataset: {
          // 提供一份数据。
          source: [
              ['product', '2015', '2016', '2017'],
              ['Matcha Latte', 43.3, 85.8, 93.7],
              ['Milk Tea', 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 86.4, 65.2, 82.5],
              ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
      },
      // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
      xAxis: {type: 'category'},
      // 声明一个 Y 轴，数值轴。
      yAxis: {},
      // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
      series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
      ]
    }
  ```

* 方式二，使用常见的对象数组的格式

  ```js
    option = {
      legend: {},
      tooltip: {},
      dataset: {
          // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
          // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
              {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
              {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
              {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
              {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
          ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
      ]
    };
  ```

* 数据到图形的映射

  * `series.seriesLayoutBy`

    可以使用 `series.seriesLayoutBy` 属性来配置 dataset 是列（column）还是行（row）映射为图形系列（series），默认是按照列（column）来映射

    ```js
      option = {
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['product', '2012', '2013', '2014', '2015'],
                ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
                ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
                ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
            ]
        },
        xAxis: [
            {type: 'category', gridIndex: 0},
            {type: 'category', gridIndex: 1}
        ],
        yAxis: [
            {gridIndex: 0},
            {gridIndex: 1}
        ],
        grid: [
            {bottom: '55%'},
            {top: '55%'}
        ],
        series: [
            // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
        ]
      }
    ```
  
  * `encode`

    可以使用 series.encode 属性将对应的数据映射到坐标轴（如 X、Y 轴）

    ```js
      var option = {
        dataset: {
          source: [
              [ 'score', 'amount', 'product' ],
              [ 89.3, 58212, 'Matcha Latte' ],
              [ 57.1, 78254, 'Milk Tea' ],
              [ 74.4, 41032, 'Cheese Cocoa' ],
              [ 50.1, 12755, 'Cheese Brownie' ],
              [ 89.7, 20145, 'Matcha Cocoa' ],
              [ 68.1, 79146, 'Tea' ],
              [ 19.6, 91852, 'Orange Juice' ],
              [ 10.6, 101852, 'Lemon Juice' ],
              [ 32.7, 20112, 'Walnut Brownie' ]
          ]
        },
        grid: { containLabel: true },
        xAxis: {},
        yAxis: { type: 'category' },
        series: [
          {
            type: 'bar',
            encode: {
              // 将 "amount" 列映射到 X 轴。
              x: 'amount',
              // 将 "product" 列映射到 Y 轴。
              y: 'product'
            }
          }
        ]
      };
    ```

    * `axisLabel: { rotate: 50 }`

  * `visualMap` - 视觉通道（颜色、尺寸等）的映射

    ```js
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 10,
        max: 100,
        text: ['High Score', 'Low Score'],
        // Map the score column to color
        dimension: 0,
        inRange: {
            color: ['#D7DA8B', '#E15457']
        }
      },
    ```

    * 'High `Key`', 'Low `Key`' =>  Map the `key` column to color
