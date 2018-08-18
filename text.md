<div class="searchPage">
        <div class="searchBar">
            <input type="text" placeholder="搜索您想要凑的单品"><span>搜索</span>
        </div>
        <div class="sort">
            <p>排序</p>
            <div class="content">
                <span class="active">销量</span>
                <span>价格<i class="fa fa-long-arrow-up"></i></span>
                <span>价格<i class="fa fa-long-arrow-down"></i></span>
            </div>
        </div>
        <div class="classList">
            <p>分类</p>
            <div class="content">
                <a><span class="active">全部</span></a>
                <a><span>家居</span></a>
                <a><span>数码</span></a>
                <a><span>办公</span></a>
                <a><span>个护</span></a>
                <a><span>食品</span></a>
                <a><span>母婴</span></a>
                <a><span>服饰</span></a>
            </div>
        </div>
    </div>


    //渲染完成页面后调用函数默认加载第一个数据（并渲染对应产品)
                if(type=='shop'){
                    var text=res.result[0].shopName;
                    text=changeListWord(text);
                    $('.left li.'+type).children(".text").text(text);
                }else if(type=='addr'){
                    var text=res.result[0].areaName;
                    text=changeListWord(text);
                    $('.left li.'+type).children(".text").text(text);
                }else{
                    $('.left li.'+type).children(".text").text(arr[0]);
                    console.log(arr[0]);
                }