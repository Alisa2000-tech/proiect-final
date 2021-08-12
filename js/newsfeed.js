// LOG OUT

const logOutButton = document.querySelector("#logOut");

if (logOutButton !== null) {
  logOutButton.addEventListener("click", () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  });
}

// NEWSFEED

const newsfeed_check = document.querySelector("#newsfeed");
const top_post = document.querySelector("#topPost");
const main_post = document.querySelector("#mainPost");
const side_bar = document.querySelector("#sideBar");
const dropdownChange = document.querySelector("#dropdownChange");
const notification_badge = document.querySelector("#notification_badge");

const friends_story = [
  {
    avatar: "https://source.unsplash.com/60x60",
    user_name: "alisa_2000",
  },
  {
    avatar: "https://source.unsplash.com/60x60",
    user_name: "andreea.gabriela",
  },
  {
    avatar: "https://source.unsplash.com/60x60",
    user_name: "mihaela34",
  },
  {
    avatar: "https://source.unsplash.com/60x60",
    user_name: "ioana-alina99",
  },
  {
    avatar: "https://source.unsplash.com/60x60",
    user_name: "aliss-ali",
  },
  {
    avatar: "https://source.unsplash.com/60x60",
    user_name: "mihai298",
  },
];

const friends_posts = [
  {
    avatar: "https://source.unsplash.com/30x30",
    user_name: "alisa_ali",
    image_post: "https://source.unsplash.com/600x600",
    likes: ["ali", "alex", "mada", "alin"],
    caption: "ce frumos",
    user_comments: "alin200",
    comments: ":))",
  },
];

const friends_list = [
  {
    avatar: "https://source.unsplash.com/30x30",
    user_name: "ana_1999",
    nr_urmaritori: "18",
  },
  {
    avatar: "https://source.unsplash.com/30x30",
    user_name: "ana_1999",
    nr_urmaritori: "4",
  },
  {
    avatar: "https://source.unsplash.com/30x30",
    user_name: "ana_1999",
    nr_urmaritori: "2",
  },
  {
    avatar: "https://source.unsplash.com/30x30",
    user_name: "ana_1999",
    nr_urmaritori: "8",
  },
  {
    avatar: "https://source.unsplash.com/30x30",
    user_name: "ana_1999",
    nr_urmaritori: "7",
  },
];

const dropdown_info = [
  {
    avatar1: "https://source.unsplash.com/30x30",
    avatar2: "https://source.unsplash.com/40x40",
    user_name: "john_doe200",
    name_of_notification: "te-a mentionat intr-un comentariu",
  },
  {
    avatar1: "https://source.unsplash.com/30x30",
    avatar2: "https://source.unsplash.com/40x40",
    user_name: "john_doe99",
    name_of_notification: "a apreciat fotografia ta",
  },
];

function generateTopPost({ avatar, user_name }) {
  return `
 
  <div>
    <img  class="image-post" src="${avatar}" alt="${user_name}">
    <p class="user-name">${user_name}</p>
  </div>

  `;
}

function generateMainPost({
  avatar,
  user_name,
  image_post,
  likes,
  caption,
  user_comments,
  comments,
}) {
  var d = new Date();
  var n = d.getHours();

  return `
  <div class="single-post">
  <div class="head">
      <div class="author">
        <img src="${avatar}" alt="">
        <span>${user_name}</span>
      </div>
      <div>
        <i class="fas fa-ellipsis-h"></i>
      </div>
     </div>
     <div class="post-content">
       <img src="${image_post}" alt="">
     </div>
     <div class="icons">
     <div>
      <i class="far fa-heart" onclick="like()" id="buttonColor"></i>
      <i class="far fa-comment"></i>
      <i class="fas fa-paper-plane"></i>
     </div>
     <div>
      <i class="far fa-bookmark"></i>
     </div>
     </div>
     <div class="likes">
       <div>
        <p><span id="totalLikes">${likes.length} aprecieri</span></p>
        <p><span>${user_name}</span> ${caption}
        </p>
        <p  onclick="ShowAndHide()" id="changeText" style="color: #cccccc; cursor: pointer;">Vezi toate comentariile</p>
        <p><span>${user_comments}</span> ${comments}
      <div id="SectionComments" style="display: none;">
      <p>
      <span>${user_comments}</span> ${comments}
      </p>
      <p>
      <span>${user_comments}</span> ${comments}
      </p>
      </div>
        </p>      
         <p  class="line" style="color: #cccccc; margin-bottom: 10px; font-size: 11px; position:relative;">Acum ${n} ore</p>
       </div>
    
     </div>
     <div class="footer">
     <div class="comm-section">
       <i class="far fa-smile-beam"></i>
       <input type="text" name="com" placeholder="Adaugati un comentariu..." style="font-size: medium;">
     </div>
     <div>
       <p>Posteaza</p>
     </div>
   </div>
    </div>
    </div>

  `;
}

function generateSideBar({ avatar, user_name, nr_urmaritori }) {
  return `

<div class="footer-aside">
 <div class="footer2">
  <div class="author">
    <img src="${avatar}" alt="">
    <div>
      <p>${user_name}</p>
      <p>${nr_urmaritori} persoane urmaresc</p>
    </div>
  </div>
    <div>
      <span>Urmareste</span>
    </div>
 </div>
</div>
  `;
}

if (newsfeed_check !== null) {
  friends_story.map((story) => {
    top_post.innerHTML += generateTopPost(story);
  });

  friends_posts.map((post) => {
    main_post.innerHTML += generateMainPost(post);
  });

  friends_list.map((side) => {
    side_bar.innerHTML += generateSideBar(side);
  });

  function show_hide() {
    const click = document.querySelector("#list-items");
    if (click.style.display === "none") {
      click.style.display = "block";
    } else {
      click.style.display = "none";
    }
  }
  function show() {
    const click = document.querySelector(".dropdown-notification");
    if (click.style.display === "none") {
      click.style.display = "block";
    } else {
      click.style.display = "none";
    }
  }

  function changeBorder() {
    const clickBorder = document.querySelector("#borderChange");
    if (clickBorder.style.border === "2px solid black") {
      clickBorder.style.border = "none";
    } else {
      clickBorder.style.border = "2px solid black";
    }
  }

  notification_badge.innerText = dropdown_info.length;

  var d = new Date();
  var n = d.getHours();

  dropdown_info.map((notification) => {
    dropdownChange.innerHTML += `

    <li class="content-notification">
    <div>
      <img class="img1" src="${notification.avatar1}" alt="" />
    </div>
    <div>
      <p>
      <span>${notification.user_name}</span> ${notification.name_of_notification}  
      <span style="color: #cccccc; font-weight: normal;">${n}h</span>
      </p>
    </div>
    <div>
      <img class="img2" src="${notification.avatar2}" alt="" />
    </div>
    </li>

    `;
  });
}

// LOADING SCREEN

function loadingScreen() {
  const myVar = setTimeout(showPage, 500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

// INCREMENT/DECREMENT LIKE BUTTON

var isLiked = false;
var a = friends_posts[0].likes.length;
function like() {
  isLiked = !isLiked;
  if (isLiked) {
    a = document.getElementById("totalLikes").innerHTML =
      parseInt(a) + 1 + " " + "aprecieri";
    document.getElementById("buttonColor").style.color = "red";
  } else {
    a = document.getElementById("totalLikes").innerHTML =
      parseInt(a) - 1 + " " + "aprecieri";
    document.getElementById("buttonColor").style.color = "black";
  }
}

// SHOW/HIDE COMMENTS

function ShowAndHide() {
  var x = document.getElementById("SectionComments");
  if (x.style.display == "none") {
    x.style.display = "block";
    document.getElementById("changeText").innerText = "Vezi mai putin";
  } else {
    x.style.display = "none";
    document.getElementById(
      "changeText"
    ).innerText = ` Vezi toate comentariile `;
  }
}

// GET DAY

var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];
document.getElementById("demo").innerHTML = n;
