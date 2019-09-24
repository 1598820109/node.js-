


// window.onload = function(){



	window.onload = function () {
        var clickTimes = 1;
        //总列数
        var lineCount = 1;
        var oRow = document.getElementById("row");
        var btnRefresh = document.getElementById('box');
        var iconRefresh = btnRefresh.getElementsByTagName('span')[0];
        var img3DList = oRow.querySelectorAll('.card');
        var len = img3DList.length;
        
        // console.log(oRow,btnRefresh,iconRefresh);
        console.log(iconRefresh,img3DList)

        btnRefresh.onclick = function () {
            iconRefresh.style.transition = ".3s linear";
            iconRefresh.style.transform = "rotate("+360*clickTimes+"deg)";

            for (var i = 0; i< len; i++){

              var colNum = parseInt(i/lineCount);
              var rowNum = i%lineCount;
              var delayTime = (colNum+rowNum)*100;

                img3DList[i].style.transition = ".3s "+delayTime+"ms linear";
                img3DList[i].style.transform = "rotateY("+180*clickTimes+"deg)";
             }

            clickTimes++;
        }
    }
// }





