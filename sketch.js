//중앙동아리, the Root
var Central;
var centralCategory;
var ari=[];
//Color 1, 2
var C1;
var C2;

function preload(){

  centralCategory = ["운동\n무예", "학술\n매체", "종교", "취미\n교양", "연행\n예술", "인권\n봉사"/*, "THIS", "THAT", "HAT", "MAT", "KAT"*/];

  for (a=0; a<centralCategory.length; a++){
    ari[a] = [];
  }
  ari[0] = ["SNUPOOL", "HOBAS", "싸커21", "SNUWOD"/*, "SNURFER", "달리샤", "기천", "전통무예\n연구회", "태극권\n연구회", "파아란"*/];
  ari[1] = ["SNUGDC", "그림터", "다담"/*, "SUB", "숲", "얄라셩", "총문학연구회", "필화", "씨알", "AIESEC", "고전연구회", "자본주의연구회"*/];
  ari[2] = ["CAM", "CBA", "C.C.C", "SFC", "IVF"/*, "JOY", "UBF", "YWAM", "네비게이토\n선교회", "수행불교회","울톨릭", "원불교\n학생회", "증산도\n동아리","총불교\n학생회","한기연","한사랑\n선교회"*/];
  ari[3] = ["SCSC", "카페인", "앱이로드", "AAA", /*"EHSA", "Fiesta", "괴나리", "노둣돌", "노이타미나", "몽환", "미동", "바둑부", "서예회", "야생조류\n연구회", "영상"*/];
  ari[4] = ["Morphine", "Jive", "H.I.S", "SNUPO", "SNUPia"/*, "골패", "기타둥둥", "메아리","마당패 탈", "바운스팩토리", "서울대학교\n합창단", "사운드림", "알쿨", "여민락", "INSTRU", "쟈스민", "총연극회", "추임새", "화연회"*/];
  ari[5] = ["골뱅이", "QIS", "GIV", "ISF", "다솜공부방", "손말사랑"/*, "아름터", "햇빛봉사단", "유니피스"*/];

  //Color of the circles
  C1 = color(240, 120, 180);
  C2 = color(125, 180, 220);

}

function setup(){


  angleMode(RADIANS);
  createCanvas(windowWidth, windowHeight);



  Central = new Category(windowWidth/2, windowHeight/2, "중앙동아리", 1, centralCategory, TWO_PI/(centralCategory.length));


  //frameRate(1);
}



function draw(){
  clear();
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);

  Central.display();

  if(Central.branches.length > 0){
    for (var i=0; i<Central.branches.length; i++){
      Central.branches[i].display();
      //print(Central.angle);


      ////////////RANGE OUTLINE////////////
      fill(color(120, 120, 140));

      for (var l=0; l<Central.subsetNum; l++){

        var ang1 = Central.angle * l;
        var ang2 = Central.angle/20;

        for (var k=0; k<30; k++){
          ellipse(Central.x+cos(ang1)*(100+k*12), Central.y+sin(ang1)*(100+k*12), 4, 4);
          ellipse(Central.x+cos(ang1+ang2)*(100+k*12), Central.y+sin(ang1+ang2)*(100+k*12), 2, 2);
          ellipse(Central.x+cos(ang1-ang2)*(100+k*12), Central.y+sin(ang1-ang2)*(100+k*12), 2, 2);
        }
      }
      ////////////RANGE OUTLINE////////////



      if(Central.branches[i].branches.length > 0){
        for (var j=0; j<Central.branches[i].branches.length; j++){
          Central.branches[i].branches[j].display();
        }
      }
    }
  }

  // print(Central.subsetNum);
  // for (i=0; i<Central.subsetNum; i++){
  //   print(Central.angle);
  //   color(120);
  //   ellipse(Central.x+cos(this.angle/2)*200, Central.y+sin(this.angle/2)*200, 40, 40);
  // }
}


function Category(x, y, id, level, subsetList){
  this.x = x;
  this.y = y;
  this.id = id; //Name
  this.level = level; //level: is it Root? or Branch?
  this.c = C2; //shape color
  this.tc = 255; //text color
  this.subsetList = subsetList; //sub-categories list
  this.subsetNum = subsetList.length; //the number of sub-categories
  this.isClicked = false; //keep track of whether this object has been clicked or not.
  this.branches = []; //sub-categories
  this.angle = TWO_PI/this.subsetNum; //the angle for each of its subcategory
  this.numTag; //the order

  this.display = function() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, 300/(this.level+2), 300/(this.level+2));
    fill(this.tc);
    textSize(36/(this.level+1));
    text(id, this.x, this.y);
  };

  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if(d <= 160/(this.level+2)){ //When the circle is clicked and the circle is the Root.
      if(this.isClicked === false){
        this.c = C1;

        //coordinates for 6 branches around (this.x, this.y)

          var angle;
          var x;
          var y;

          if(this.level == 1){
            for (i=0; i<this.subsetNum; i++){

              //360도 (2*PI) 를 카테고리 수로 나눈다.
              //PI/2 를 더해서 12시 방향에서 부터 돌게 한다. Default는 3시방향부터 도는데, 카테고리가 홀수 일 때 매우 안 예뻐 보인다.
              angle = TWO_PI / this.subsetNum * i + PI/2;

              x = this.x + cos(angle) * 120; //120 = radius or the big circle
              y = this.y + sin(angle) * 120;

              this.branches[i] = new subCategory(x, y, this.subsetList[i], this.level + 1, ari[i]);
              this.branches[i].numTag = i;
            }
          }
          else if(this.level == 2){

            // var ang1 = Central.branches[i].angle;
            // var ang2 = Central.angle/2;
            // var ang3 = Central.angle/20;
            // for (var k=0; k<30; k++){
            //   ellipse(Central.x+cos(ang1+ang2)*(100+k*12), Central.y+sin(ang1+ang2)*(100+k*12), 4, 4);
            //   ellipse(Central.x+cos(ang1+ang2+ang3)*(100+k*12), Central.y+sin(ang1+ang2+ang3)*(100+k*12), 2, 2);
            //   ellipse(Central.x+cos(ang1+ang2-ang3)*(100+k*12), Central.y+sin(ang1+ang2-ang3)*(100+k*12), 2, 2);
            // }
            for (i=0; i<this.subsetNum; i++){
              angle = TWO_PI / (this.subsetNum * 3) * i + PI/2 + Central.angle*(this.numTag-0.5);

              x = this.x + cos(angle) * 100; //120 = radius or the big circle
              y = this.y + sin(angle) * 100;

              this.branches[i] = new Category(x, y, this.subsetList[i], this.level + 1, []);

          }
        }
      }
      else{ //if isClicked === true
        this.c = C2;
        this.branches = []; //clear the branches -> make them disappear
      }
      this.isClicked = !this.isClicked; //reverse the state of "isClicked" when clicked
    }
  };
} //end of Class Category

function mousePressed() {
  Central.clicked();
  if(Central.branches.length>0){
    for (i=0; i<Central.branches.length; i++)
      Central.branches[i].clicked();
  }
}
