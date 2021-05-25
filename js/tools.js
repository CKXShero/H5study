// 专门存储函数方法的js外部文件

// 使用兼容语法,获取标签css样式的属性值
// 参数1 标签对象
// 参数2 标签对象属性
function myGetStyle(element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[attr];
    } else {
        return element.currentStyle[attr];
    }
}


// 定义一个函数
// 获取浏览器地址栏中的参数信息
function myGetUrlVal() {
    // 创建一个对象,存储键值对信息
    var obj = {};

    // 1,获取 浏览器地址栏中 携带的参数信息
    // 去掉第一位的 ?问号字符
    // username=张三&userpwd=123456

    // 实际项目中,数据参数等有可能携带 & 符号 或者 = 等号
    // 特殊符号和中文,都会解析为 % 加 两位十六进制数值
    // 为了防止数据的符号 和 间隔符号冲突,暂时可以先不转化
    // 只截取问号
    var str = window.location.search.substr(1);

    // 2,每一个键值对,都是以 & 符号为间隔
    // 可以按照 & 符号 将字符串 切割为数组
    // ["username=张三", "userpwd=123456"]
    // 数组中 每一个 数据单元 存储的是 参数键值对字符串
    var arr1 = str.split('&');

    // 3,键值对字符串中,键名和数值,是以 = 等号 为间隔
    // 循环 数组arr1 数组单元存储的数据,就是键值对字符串
    // val 就是 键值对字符串
    arr1.forEach(function (val) {
        // arr2中 索引0 存储 键名   索引1 存储 键值
        var arr2 = val.split('=');
        // arr2[0] 存储的是 键名 也就是对象的键名
        // arr2[1] 存储的是 键值 也就是对象的价值

        // 最终,向对象写入数据时 再解析为字符串就行了
        // 此时需要使用 window.decodeURIComponent() 才可以完全转化
        obj[arr2[0]] = window.decodeURIComponent(arr2[1]);

    })

    return obj;
}

// 设定随机验证码函数
// 参数1,设定验证码长度
// 参数2,验证码内容是否允许重复,默认是 true 可以重复  设定 false 不允许验证码有重复字符
// 参数3,设定验证码内容,默认值是,数字,小写英文字母大写英文字母
function setVc(length = 6, bool = true, str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var vc = '';
    for (var i = 1; i <= length; i++) {
        // 生成随机的索引下标
        var index = parseInt(Math.random() * str.length);

        if (bool) {
            // 允许出现重复字符的方法
            // 使用随机索引下标,获取随机字符,拼接写入字符串
            vc += str[index];
        } else {
            // 不能出现重复字符的方法
            // 验证码字符串,没有这个字符,再进行拼接
            if (vc.indexOf(str[index]) === -1) {
                // 查询结果是-1 证明 验证码字符串中没有这个字符,可以执行拼接
                vc += str[index];
            } else {
                // i-- 再多循环一次
                i--;
            }
        }
    }
    // 返回这个字符串
    return vc;
}

// 随机颜色函数
function myGetColor() {
    // 返回 rgb() 形式的随机颜色
    // 三组 0-256 的随机数值
    return `rgb(${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)})`;
}

// 倒计时函数
// 参数1 终止时间字符串
function getTimeLag(time) {
    // 获取时间对象
    var startTime = new Date();
    var endTime = new Date(time);

    // 获取时间差,单位是秒
    var t = parseInt((endTime.getTime() - startTime.getTime()) / 1000);

    // 将秒转化为对应的 天 小时 分钟 秒
    var d = parseInt(t / (24 * 60 * 60));
    // 执行补零操作 如果 数值小于 0 在数值前 拼接字符串0
    d = d < 10 ? '0' + d : d ;

    var h = parseInt((t % (24 * 60 * 60)) / (60 * 60));
    h = h < 10 ? '0' + h : h ;

    var m = parseInt((t % (60 * 60)) / 60);
    m = m < 10 ? '0' + m : m ;

    var s = t % 60;
    s = s < 10 ? '0' + s : s ;


    // 将数据组成对象,作为返回值
    return { day: d, hour: h, minute: m, second: s };

}

// 运动函数
// 参数1: 运动的标签对象
// 参数2: 运动的属性和属性值,对象形式
// 参数3: 运动结束,执行的函数程序 默认值是一个空函数
//        赋值可以是一个匿名函数,也可以是函数名称
function move(element , object , fun = function(){}){

    // 定义一个变量,储存定时器个数
    let t = 0;
    // 循环遍历 参数2 对象 循环变量一定要用 let 声明
    for(let type in object){
        // 每次循环 变量 ++ 证明生成了一个定时器
        t++;

        // 每一个属性,对应生成一个定时器
        // 储存定时器的变量,也必须要使用let 声明
        let time = setInterval(() => {
            
            // 1, 获取原始数值,如果属性是透明度,不要parseInt,获取结果乘以100
            let oldVal = type === 'opacity' ? window.getComputedStyle(element)[type]*100 : parseInt( window.getComputedStyle(element)[type] );

            // 2, 如果属性是透明度,最终数值也要乘以100
            object[type] = type === 'opacity' ? object[type]*100 : object[type];

            // 3, 计算步长
            let step = ( object[type] - oldVal ) / 10;

            // 4, 对步长取整
            // 如果步长 大于 0 向上取整 如果步长小于0 向下取整
            step = step > 0 ? Math.ceil( step ) : Math.floor( step );

            // 5, 原始值,累加步长
            oldVal += step;

            // 6, 将累加后的原始值 赋值给 标签css属性值
            // 属性是透明度 属性值/100 不是透明度 属性值拼接px单位
            element.style[type] = type === 'opacity' ? oldVal/100 : oldVal + 'px';

            // 7, 判断 如果 原始值 等于 目标数值 清除定时器
            if( oldVal === object[type] ){
                clearInterval(time);
                // 变量储存定时器个数 --
                t--;

                // 如果 t是 0 也就是定时器都清除了,执行程序
                if(t === 0){
                    fun();
                } 
            }

        }, 30);
    }
}



