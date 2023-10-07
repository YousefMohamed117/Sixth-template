let gearBtn = document.querySelector(".gear");
let settings = document.querySelector(".settings");

gearBtn.onclick = function (e) {
  e.stopPropagation();
  settings.classList.toggle("active");
};

/////
let settingsLi = document.querySelectorAll(".settings ul li");
let mainColor;
if (window.localStorage.getItem("color")) {
  mainColor = window.localStorage.getItem("color");
  document.documentElement.style.setProperty("--main-color", mainColor);
  settingsLi.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color == mainColor) {
      li.classList.add("active");
    }
  });
}
settingsLi.forEach((li) => {
  li.onclick = function () {
    settingsLi.forEach((liA) => {
      liA.classList.remove("active");
    });
    document.documentElement.style.setProperty(
      "--main-color",
      li.getAttribute("data-color")
    );
    window.localStorage.setItem("color", li.getAttribute("data-color"));
    li.classList.add("active");
  };
});
///////
let settingsBtn = document.querySelectorAll(".settings .randomBackground button");
let backgroundInterval;
let randomizestatus = "yes";

if (window.localStorage.getItem("random")) {
  randomizestatus = window.localStorage.getItem("random");
  settingsBtn.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.value == window.localStorage.getItem("random")) {
      btn.classList.add("active");
    }
  });
}

///////////////////////////////////////////////
let landing = document.querySelector(".landing");
let overlay = document.querySelector(".overlay");
let index = 1;

if (window.localStorage.getItem("index")) {
  index = window.localStorage.getItem("index");
}

function changePic() {
  if (randomizestatus == "yes") {
    backgroundInterval = setInterval(() => {
      landing.style.backgroundImage = `url(./imgs/img-${index}.jpg)`;
      window.localStorage.setItem("index", index);
      index++;
      if (index == 4) {
        index = 1;
      }
    }, 1000);
  }
}
changePic();
///////////////////////////////

settingsBtn.forEach((btn) => {
  btn.onclick = function () {
    if (btn.value == "yes") {
      randomizestatus = "yes";
      changePic();
    } else if (btn.value == "no") {
      randomizestatus = "no";
      clearInterval(backgroundInterval);
    }
    settingsBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
    window.localStorage.setItem("random", btn.value);
  };
});

///////////////////////////////////////////////////

let skills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = skills.offsetTop;

  let skillsOuterHeight = skills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.scrollY;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - 150
  ) {
    document.querySelectorAll(".skills .skill-prog span").forEach((skill) => {
      skill.style.width = skill.dataset.width;
    });
  }
};

///////////////////////////////////
let galleryImg = document.querySelectorAll(".gallery img");
let galleryshow = document.querySelector(".show");

galleryImg.forEach((img) => {
  img.onclick = function () {

    let imgArr = Array.from(document.querySelectorAll(".gallery .container img"));
    
    for(i = 0 ; i < imgArr.length; i++){
     console.log(imgArr) 
      if(img == imgArr[i]){
        
        galleryshow.children[0].innerText = `Image Number ${imgArr.indexOf(img) +1}`

      }

    }

    document.querySelector(".show-lay").style.display = "block";
    galleryshow.style.display = "block";
    galleryshow.children[1].src = this.src;
  };
});

let galleryClose = document.querySelector(".show .close");

galleryClose.onclick = function () {
  document.querySelector(".show-lay").style.display = "none";
  galleryshow.style.display = "none";
};


let bars = document.querySelector(".landing .bars");

let smallList = document.querySelector(".landing .smallList");

bars.onclick = function () {
  smallList.classList.toggle("active");
}
///////////////////////////////////////////
let bulletsBtn = document.querySelectorAll(".settings .showBullets button");
let showBtn = "flex";
let navCircles = document.querySelector(".nav-circles");

if(localStorage.getItem("showBullets")){
  showBtn = localStorage.getItem("showBullets");
  navCircles.style.display = showBtn
  bulletsBtn.forEach((btn) => {
    btn.classList.remove("active");
    if(btn.value == showBtn){
      btn.classList.add("active");
    }
  })
}

bulletsBtn.forEach((btn) => {
  btn.onclick = function () {
    bulletsBtn.forEach((btn) => {
      btn.classList.remove("active");
    })
    btn.classList.add("active");
    showBtn = btn.value;
    navCircles.style.display = showBtn
    localStorage.setItem("showBullets", btn.value);
  };
})

let reset = document.querySelector(".reset");

reset.onclick = function(){
  window.localStorage.clear();
  window.location.reload();
}