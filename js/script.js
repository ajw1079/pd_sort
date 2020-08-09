$(document).ready(function(){
  //#1. 배열 데이터를 구성
  //2차 배열 패턴 = ["이미지", "타이틀", "내용", "가격", "업데이트 날짜", "좋아요 횟수"]
  var $arr = [
    ["img1.jpg", "거실 인테리어1", "합리주의 실용 인테리어1", "50000", "20200103", "78"],
    ["img2.jpg", "거실 인테리어2", "모더니즘 실용 인테리어2", "60000", "20190209", "120"],
    ["img3.jpg", "침실 인테리어3", "아르데코 실용 인테리어3", "20000", "20161004", "7"],
    ["img4.jpg", "침실 인테리어4", "모더니즘 실용 인테리어4", "90000", "20150807", "90"],
    ["img5.jpg", "주방 인테리어5", "합리주의 실용 인테리어5", "290000", "20200809", "54"],
    ["img6.jpg", "거실 인테리어6", "합리주의 실용 인테리어6", "10000", "20191231", "23"],
    ["img7.jpg", "침실 인테리어7", "합리주의 실용 인테리어7", "70000", "20200623", "14"],
    ["img8.jpg", "욕실 인테리어8", "합리주의 실용 인테리어8", "80000", "20200214", "28"],
    ["img9.jpg", "거실 인테리어9", "모더니즘 실용 인테리어9", "45000", "20200313", "91"]
  ];

  //#2. 패턴 저장
  var $pd_box = `
  <div class="pd_box">
    <div class="pd_img"></div>
    <h3 class="pd_title">타이틀</h3>
    <p class="pd_context">제품의 내용 설명</p>
    <div class="pd_info">
      <p class="price">30000</p>
      <p class="update">20200809</p>
    </div>
    <div class="fav_rate"><p>좋아요&nbsp;<span>100</span></p></div>
  </div>
  `;
  //#3. for문으로 구조를 구성
  for(i=0; i<$arr.length; i++){
    $(".product").append($pd_box);
  }
  //#4. each문 이용하여 상품의 내용을 넣는다.
  function pd_sort(){
    $(".pd_box").each(function(index){
      $(this).find(".pd_img").css("background-image", "url(img/"+$arr[index][0]+")");
      $(this).find(".pd_title").text($arr[index][1]);
      $(this).find(".pd_context").text($arr[index][2]);
      $(this).find(".price").text($arr[index][3]);
      $(this).find(".update").text($arr[index][4]);
      $(this).find(".fav_rate p span").text($arr[index][5]);
    });
  }
  pd_sort();  //브라우저가 준비가 완료되면 원본 데이터를 뿌려준다. 

  //#5. 각 버튼 클릭시, 해당하는 순서대로 배열을 정렬하고 각 박스에 뿌린다.

  //"최신순" 클릭시
  $(".date_sort").click(function(){
    $arr.sort(function(a, b){
      //return a[4] - b[4];  //작은 수부터 정렬
      return b[4] - a[4];  //큰 수부터 정렬
    });
    //$arr.reverse();
    console.log($arr);
    pd_sort();  //"최신순" 버튼을 클릭하면 다시 함수를 호출
  });

  //"낮은 가격순" 클릭시
  $(".low_sort").click(function(){
    $arr.sort(function(a, b){
      return a[3] - b[3];
    });
    console.log($arr);
    pd_sort();  //"낮은 가격순" 버튼을 클릭하면 다시 함수를 호출
  });

  //"높은 가격순" 클릭시
  $(".high_sort").click(function(){
    $arr.sort(function(a, b){
      return b[3] - a[3];
    });
    console.log($arr);
    pd_sort();  //"높은 가격순" 버튼을 클릭하면 다시 함수를 호출
  });

  //"인기순" 클릭시
  $(".fav_sort").click(function(){
    $arr.sort(function(a, b){
      return b[5] - a[5];
    });
    console.log($arr);
    pd_sort();  //"인기순" 버튼을 클릭하면 다시 함수를 호출
  });

  $("#pd_frame select").change(function(){
    var $val = $(this).val();
    //$("#pd_frame select option").eq(0).attr("disabled", "disabled");
    $("#pd_frame select option.sel").remove();
    if($val == "date"){
      $arr.sort(function(a, b){
        return b[4] - a[4];  //큰 수부터 정렬
      });
      pd_sort();
    }else if($val == "low"){
      $arr.sort(function(a, b){
        return a[3] - b[3];
      });
      pd_sort();
    }else if($val == "high"){
      $arr.sort(function(a, b){
        return b[3] - a[3];
      });
      pd_sort();
    }else if($val == "fav"){
      $arr.sort(function(a, b){
        return b[5] - a[5];
      });
      pd_sort();
    }
  });


  var $num = 6;
  if($arr.length % $num == 0){
    for(i = 0; i < $arr.length / $num; i++){
      $(".pager ol").append("<li>"+(i+1)+"</li>");
    }
  }else{
    for(i = 0; i<= $arr.length / $num; i++){
      $(".pager ol").append("<li>"+(i+1)+"</li>");
    }
  }

  var $index = 0;
  $(".pager li").eq($index).addClass("active");
  //$(".pd_box").show();
  $(".pd_box").eq($num-1).nextAll().hide();

  $(".pager li").click(function(){
    $index = $(this).index();  //0, 1, 2
    $(".pager li").removeClass("active");
    $(".pager li").eq($index).addClass("active");
    $(".pd_box").show();
    $(".pd_box").eq($num * $index).prevAll().hide();
    $(".pd_box").eq($num * ($index + 1) -1).nextAll().hide();
  });




});