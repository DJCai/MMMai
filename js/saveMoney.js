$(function(){
    var currentpage=1;
    function getproductInfo(pageid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            type: "get",
            data: {
                pageid: pageid
            },
            success: function (res) {
                //分页功能的实现
                var totalCount = res.totalCount;
                var pagesize = res.pagesize;
                var totalpage = Math.floor(totalCount/pagesize);
                // console.log(totalpage);
                //分页思路
                /*如何获取到当前页面,并且根据pageid渲染当前页的数据到页面中 
                */
               
                var html = template("productslist",res);
                $(".mui-table-view").html(html);
            }
        })
        
    }
    getproductInfo(currentpage);
    
    $("#selectPage").on("change",function(){
        // console.log($("option:selected",this).val());
        // if($("option:selected",this).val()=="10")
        currentpage=$("option:selected",this).val();       
        getproductInfo(currentpage);
    });
    $(".next").on("click",function(){
        getproductInfo(currentpage+1);
        console.log(currentpage);        
    })
 });




 