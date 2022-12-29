let curDisplay = document.querySelector(".users");
const getJSON = async function (a) {
  try {
    return await a.json();
  } catch (err) {
    console.log(err);
  }
};
const getUsers = async function () {
  try {
    const a = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await getJSON(a);
    return data;
  } catch (err) {
    console.log(err);
  }
};
const showUsers = async function () {
  try {
    document.querySelector(".users").classList.remove("hidden");
  } catch (err) {
    console.log(err);
  }
};
const displayUsers = function (data, node) {
  node.insertAdjacentHTML(
    "beforeend",
    `<div class="card col-md-3 col-sm-5 col-8 ms-2 mt-4" data-id="${data.id}">
                <div class="profile-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="">
                </div>
                   <div class="mid">
                    <div class="bg uname">
                        ${data.username}
                    </div>
                    <div class="umail">${data.email}</div>
                    <div class="mb-2">${data.address.city}</div>
                   </div>
                    <div class="row">
                        <div class="col-6 info pb-1">WORKS AT</div>
                        <div class="col-6 ans pb-1">${data.company.name}</div>
                    </div>
                    <div class="row">
                        <div class="col-6 info pb-1">PHONE</div>
                        <div class="col-6 ans pb-1">${data.phone}</div>
                    </div>
                    <div class="row">
                        <div class="col-6 info pb-1">WEBSITE</div>
                        <div class="col-6 ans pb-1">${data.website}</div>
                    </div>
                </div>`
  );
};
document.querySelector("#nav-users").addEventListener("click", async function (e) {
    e.preventDefault();
    if (curDisplay == document.querySelector(".users")) {
      return;
    }
    displayManager(document.querySelector(".users"));
    showUsers();
  });

// posts
const showPosts = async function () {
  try {
    document.querySelector(".posts").classList.remove("hidden");
  } catch (err) {
    console.log(err);
  }
};
document.querySelector("#nav-posts").addEventListener("click", async function (e) {
    if (!document.querySelector(".posts").classList.contains("fin")) {
       document.querySelector(".msg").classList.remove("hidden")
      return;
    }
    if (curDisplay == document.querySelector(".posts")) {
      return;
    }
    displayManager(document.querySelector(".posts"));
    e.preventDefault();
    showPosts();
  });
  
const getPosts = async function () {
  const a = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await getJSON(a);
  return data;
};
const getComments = async function (pid) {
  const a = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await getJSON(a);
  const b = [];
  for (i in data) {
    if (data[i].postId == pid) b.push(data[i]);
  }
  return b;
};
const displayPosts = async function (data, node,i) {
  let reply = [];
  reply = await getComments(`${data.id}`);
  let user = await getUsers();
  user = user[`${data.userId - 1}`];
  console.log();
  await node.insertAdjacentHTML(
    "beforeend",
    `<div class="card postcard col-11 ms-3 mt-3 mb-3 hidden" id="p${data.id}" data-uid="${user.id}">
                    <div class="d-flex post-head">
                        <div class="user-icon">
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="">
                        </div>
                        <div class="bio ms-2">
                            <div class="uname">
                                ${user.name}
                            </div>
                            <div class="mail">
                                ${user.email}
                            </div>
                        </div>
                    </div>
                    <div class="post-text">
                        <div class="title">${data.title}</div>
                        <div class="post-body">${data.body}
                        </div>
                    </div>
                
                    <div class="rep-btn">REPLIES🔺</div>
                    <div class="comments hidden"></div>
                    
        </div>
    `
  );
  reply.forEach((el) =>
    addReplies(el, document.querySelector(`#p${data.id} .comments`))
  );
  if(i==1){
    document.querySelector(".posts").classList.add("fin");
    document.querySelector(".msg").classList.add("hidden");
    await node.lastChild.previousSibling.classList;
    document.querySelector(".msg").classList.add("hidden");
    pagination(10);
  }
};
const addReplies = async function (el, node) {
  node.insertAdjacentHTML(
    "beforeend",
    `
                         <div class="reply-format">
                             <div class="d-flex reply-head">
                                 <div class="replier-icon mt-1">
                                     <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="">
                                 </div>
                                 <div class="bio ms-2">
                                     <div class="rname">
                                        ${el.name}
                                     </div>
                                     <div class="mail">
                                         ${el.email}
                                     </div>
                                 </div>
                             </div>
                             <div class="reply-body">${el.body}</div>
                         </div>
                     `
  );
};


const displayManager = function (e) {
  curDisplay.classList.add("hidden");
  curDisplay = e;
};


//pageload
const pageLoad = async function () {
  let data = await getUsers();
  await data.forEach(async function (el) {
    displayUsers(el, document.querySelector(".userrow"));
  });
  data =await getPosts();
  [...data].forEach(async function (el,idx,arr) {
    if (idx === arr.length-1) {
       displayPosts(el, document.querySelector(".postrow"), 1);
    }
       await displayPosts(el, document.querySelector(".postrow"),0)
  }
  );
  return 1
};
pageLoad()


document.querySelector(".posts").addEventListener("click", async function (e) {
  if (e.target.closest(".rep-btn")) {
    try {
      e.preventDefault();
      let x = await e.target.parentElement.querySelector(".comments");
      x.classList.toggle("hidden");
      if ([...x.classList].includes("hidden")) {
        e.target.innerText = "REPLIES 🔺";
      } else {
        e.target.innerText = "REPLIES 🔻";
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (e.target.closest(".postcard")) {
    console.log(e.target.closest(".postcard"));
  }
});
document.querySelector(".users").addEventListener("click", async function (e) {
  if (!document.querySelector(".posts").classList.contains("fin")) {
      document.querySelector(".msg").classList.remove("hidden")
      return;
  }
  if (e.target.closest(".card")) {
    document.querySelectorAll(".postcard").forEach((el) => {
      if (e.target.closest(".card").dataset.id != el.dataset.uid) {
        el.classList.add("hidden");
      } else {
        el.classList.remove("hidden");
      }
});

document.querySelectorAll(".scroller").forEach((el) => el.classList.add("hidden"));
    document.querySelector(".posts").classList.remove("hidden");
    displayManager(document.querySelector(".posts"));
  }
});

const pagination = async function (i) {
  document.querySelectorAll(".scroller").forEach((el) => el.classList.remove("hidden"));
  if (i == 10) document.querySelector("#back").innerHTML = "";
  if (i == 20) document.querySelector("#back").innerHTML = `<i class="bi bi-skip-backward-fill m-2">`;
  if (i == 100) document.querySelector("#front").innerHTML = "";
  if (i == 90)document.querySelector("#front").innerHTML = `<i class="bi bi-skip-forward-fill m-2">`;
  document.querySelectorAll(".postcard").forEach((el) => {
    if (+el.id.slice(1) <= i && +el.id.slice(1) > i - 10) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });
  return(1)
};
document.querySelectorAll(".scroller").forEach((el) => {
  el.addEventListener("click", (ele) => {
    let i = 10;
    document.querySelectorAll(".postcard").forEach((e) => {
      if (!e.classList.contains("hidden")) {
        i = +e.id.slice(1);
        console.log(i);
      }
    });
    if (ele.target.closest(".scroller").id == "back") {
      console.log(i);
      pagination(i - 10);
    } else {
      pagination(i + 10);
    }
  });
});
document.querySelector("body").addEventListener("click", (el) =>{
  if (
    el.target !== document.querySelector("#nav-posts") && !el.target.closest(".card")
  )
    document.querySelector(".msg").classList.add("hidden");
  }
  );