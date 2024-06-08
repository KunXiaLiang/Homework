function addTasks(){//页面跳转至添加任务
    location.replace("./addTask.html");
}
function toChart(){//页面跳转至柱形图界面
    location.replace("./chart.html");
}

function backHome(){//页面跳转至主页面
    location.replace("./index.html");
}
function sureToSave(){//确认添加任务
    var storedArray=localStorage.getItem('myArrayKey');
    var jsonObjectArray=[];
    if(storedArray!==null){
        jsonObjectArray=JSON.parse(storedArray);
    }else{
        console.log('数组数据未找到');
    }
    var inputElement=document.getElementById('task-name-input');
    var value=inputElement.value;
    //获取当前日期保存到数组中
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();
    var formattedDate =yyyy+"-"+mm+"-"+dd;
    var st={"TaskName": value, "Date": formattedDate};
    jsonObjectArray.push(st); 
    localStorage.setItem('myArrayKey', JSON.stringify(jsonObjectArray));
    location.replace("./encouragement.html");
}
function newValue(){//更新主页面
    var storedArray=localStorage.getItem('myArrayKey');
    var jsonObjectArray=[];
    if(storedArray!==null){
        jsonObjectArray=JSON.parse(storedArray);
        var inputElements=document.getElementById('task-count');
        inputElements.innerHTML=jsonObjectArray.length;
        localStorage.setItem("data", JSON.stringify(jsonObjectArray));
    }else{
        console.log('数组数据未找到');
        inputElements.innerHTML=0;
    }
    
}
function toSearch(){//页面跳转至搜索界面
    location.replace("./search.html");
}
function returnToChart(){//页面跳转至柱形图界面
    location.replace("./chart.html");
}
//下面是柱形图代码——————————————————————————————————————————————————————————————————————————————————
function newMyChart(){
    var storedArray=localStorage.getItem('myArrayKey');
    var jsonObjectArray=[];
    if(storedArray!==null){
        jsonObjectArray=JSON.parse(storedArray);
    }else{
        console.log('数组数据未找到');
        alert("暂无数据，请先添加任务");
        location.replace("./index.html");
    }
        var dates=[jsonObjectArray[jsonObjectArray.length-1].Date];
        var counts=[1];
        for(var j=jsonObjectArray.length-2;j>=0;j--){
            if(dates[dates.length-1]!=jsonObjectArray[j].Date){
                dates.push(jsonObjectArray[j].Date);
                counts[counts.length]=1;
            }
            else{
                counts[counts.length-1]++;
            }
        }
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
type: 'bar', // 指定图表类型为柱形图
data: {
labels: [dates.length>3?dates[dates.length-4]:'无数据', dates.length>2?dates[dates.length-3]:'无数据', dates.length>1?dates[dates.length-2]:'无数据',dates.length>0?dates[dates.length-1]:'无数据'], // 横轴标签为日期
datasets: [{
label: '数量', // 数据集标签
data: [counts.length>3?counts[counts.length-4]:0, counts.length>2?counts[counts.length-3]:0, counts.length>1?counts[counts.length-2]:0,counts.length>0?counts[counts.length-1]:0], // 纵轴数值为数量
backgroundColor: [
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
'rgba(153, 102, 255, 0.2)',
'rgba(255, 159, 64, 0.2)'
],
borderColor: [
'rgba(255, 99, 132, 1)',
'rgba(54, 162, 235, 1)',
'rgba(255, 206, 86, 1)',
'rgba(75, 192, 192, 1)',
'rgba(153, 102, 255, 1)',
'rgba(255, 159, 64, 1)'
],
borderWidth: 1
}]
},
options: {
scales: {
y: {
beginAtZero: true // 纵轴起始点为0
}
}
}
});
localStorage.setItem("data", JSON.stringify(jsonObjectArray));
}
//柱形图代码结束——————————————————————————————————————————————————————————————————————————
function sureToSearch() {
    // 假设这是您的原始数组
    var storedArray = localStorage.getItem('myArrayKey');
    var jsonObjectArray = [];
    if (storedArray !== null) {
        jsonObjectArray = JSON.parse(storedArray);
    } else {
        console.log('数组数据未找到');
        alert("暂无数据，请先添加任务");
        location.replace("./index.html");
        return; // 如果数据未找到，则退出函数
    }

    // 初始化结果数组
    let resultArray = [...jsonObjectArray];

    // 获取输入框和结果容器元素
    const searchInput = document.getElementById('searchInput');
    const resultTableContainer = document.getElementById('resultTable');

    // 创建一个函数来渲染表格
    function renderTable(data) {
        // 清空结果容器
        resultTableContainer.innerHTML = '';

        // 创建表格
        const table = document.createElement('table');

        // 创建表头
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        const headers = ['名称', '日期'];
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.style.border = '1px solid black'; // 设置表头单元格边框
            th.style.padding = '8px'; // 设置内边距
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        thead.style.border = '1px solid black'; // 设置表头边框
        table.appendChild(thead);

        // 创建表体
        const tbody = document.createElement('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            const keys = Object.keys(item); // 获取每一行的键
            keys.forEach(key => {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                cell.style.border = '1px solid black'; // 设置数据单元格边框
                cell.style.padding = '8px'; // 设置内边距
                row.append(cell);
            });
            tbody.style.border = '1px solid black'; // 设置表体边框
            tbody.append(row);
        });
        table.append(tbody);

        // 将表格添加到结果容器
        resultTableContainer.append(table);
    }

    // 监听输入框变化
    searchInput.addEventListener('input', function () {
        // 获取搜索关键词
        const keyword = this.value.trim().toLowerCase();

        // 过滤数组
        resultArray = jsonObjectArray.filter(item =>
            Object.values(item).some(value => String(value).toLowerCase().includes(keyword))
        );

        // 渲染表格
        renderTable(resultArray);
    });

    // 初始化渲染一次表格
    renderTable(jsonObjectArray);
    localStorage.setItem('myArrayKey', JSON.stringify(jsonObjectArray));
}

// 调用函数以执行代码
sureToSearch();