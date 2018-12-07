var list = [];
var url = "https://api.douban.com/v2/book/search?q=A&count=10&alt=xd";
var a = 111

function $Vue(list) {
    var vm = new Vue({
        el: "#box",
        data: {
            listbook: list[0],
            listmov: list[1],
            listmus: list[2],
            txt: '书名、作者、ISBN',
            tags: 'tags',
            index: 1
        },
        methods: {
            // 点击搜索按钮得方法
            fun: function () {
                // 根据index值进行搜索地址的奇幻
                if (this.index == 1) {
                    url = "https://api.douban.com/v2/book/search?q=" + this.txt + "&count=5&alt=xd";
                    bookJSOn(url).then(function (i) {
                        vm.listbook = i
                    });
                } else if (this.index == 2) {
                    url = "https://api.douban.com/v2/movie/search?q=" + this.txt + "&count=5&alt=xd";
                    bookJSOn(url).then(function (i) {
                        vm.listmov = i
                    });
                } else if (this.index == 3) {
                    url = "https://api.douban.com/v2/music/search?q=" + this.txt + "&count=5&alt=xd";
                    bookJSOn(url).then(function (i) {
                        vm.listmus = i
                    });
                }
            },
            // 点击导航栏按钮改变index值,进行显示与隐藏切换
            navFun1: function () {
                this.index = 1;
                this.txt = '书名、作者、ISBN';
            },
            navFun2: function () {
                this.index = 2;
                this.txt = '电影、影院、电视剧';
            },
            navFun3: function () {
                this.index = 3;
                this.txt = '唱片名、表演者、条码、ISRC';
            },
            // 点击不同板块的名称按钮传入不同的数据,储存到本地储存
            bookInner: function (item) {
                console.log(item);
                localStorage.setItem('index', this.index);
                localStorage.setItem('bookDet', JSON.stringify(item));
            },
            movInner: function (item) {
                console.log(item);
                localStorage.setItem('index', this.index);
                localStorage.setItem('movDet', JSON.stringify(item));
            },
            musInner: function (item) {
                console.log(item);
                localStorage.setItem('index', this.index);
                localStorage.setItem('musDet', JSON.stringify(item));
            }
        }
    })
}

function bookJSOn(url) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            success: function (item) {
                resolve(item);
            },
            fail: function (error) {
                reject(error)
            }
        });
    })
}
bookJSOn(url).then(i => {
    list.push(i);
    return bookJSOn('https://api.douban.com/v2/movie/search?q=肖申克的救赎&count=5&alt=xd')
}).then(movie => {
    list.push(movie);
    return bookJSOn('https://api.douban.com/v2/music/search?q=陈奕迅&count=5&alt=xd')
}).then(music => {
    list.push(music)
    $Vue(list);
}).catch(err => console.warn(err));