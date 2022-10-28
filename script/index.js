import navbar from "../components/navbar.js";
import tabBar from "../components/sidebar.js";

const header = document.querySelector("#header");
const tab = document.querySelector("#tab");
header.innerHTML = navbar();

const main = document.querySelector("main");
let input_box = document.querySelector("#search-input");

input_box.addEventListener("keypress", () => {
  getData(event);
});

let img = document.querySelector("#profile-img");

const getData = async (e) => {
  if (e.code === "Enter") {
    let input = input_box.value;
    let url = `https://api.github.com/users/${input}`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      img.src = data.avatar_url;
      if (data.message == "Not Found") {
        display_error(input);
      } else {
        main.style.display = "none";
        display_image(data);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
};

const display_image = ({
  avatar_url,
  bio,
  name,
  login,
  location,
  followers,
  following,
  repos_url,
  blog,
}) => {
  document.title = `${login} (${name})`;
  document.querySelector(".left").innerHTML = null;
  tab.innerHTML = tabBar();
  let div = document.createElement("div");

  let img = document.createElement("img");
  img.src = avatar_url;

  let name1 = document.createElement("h4");
  name1.innerHTML = name;

  let uname = document.createElement("p");
  uname.innerHTML = login;

  let bio_g = document.createElement("p");
  bio_g.innerHTML = bio;

  let f1 = document.createElement("span");
  f1.innerHTML = `<i class="fa-solid fa-user-group"></i> ${followers} followers`;

  let f2 = document.createElement("span");
  f2.innerHTML = following + " following";

  let location1 = document.createElement("p");
  if (location) {
    location1.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${location}`;
  }

  let site = document.createElement("span");
  if (blog) {
    let site_url = `https://${blog}`;
    site.innerHTML = `<i class="fa-solid fa-link"></i><a href=${site_url} target="_blog">${blog}</a>`;
  }

  repos(repos_url);

  div.append(img, name1, uname, bio_g, f1, f2, location1, site);

  document.querySelector(".left").append(div);
};

const repos = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    display_repos(data);
  } catch (error) {
    console.log(error);
  }
};

const display_repos = (data) => {
  document.querySelector(".right").innerHTML = null;
  document.querySelector(".repo_count").innerHTML = data.length || 0;
  data.map(
    ({
      name,
      visibility,
      updated_at,
      language,
      description,
      stargazers_count,
      forks,
      html_url,
    }) => {
      let div = document.createElement("div");

      let div0 = document.createElement("div");

      let name1 = document.createElement("h4");
      name1.innerHTML = `<a href=${html_url} target="_open"> ${name} </a> <span>${visibility}</span>`;

      let desc = document.createElement("p");
      desc.innerHTML = description;

      let div1 = document.createElement("div");

      let lang = document.createElement("p");
      if (language) {
        if (language == "HTML") {
          lang.innerHTML = `<span style="background-color:#e34c26"></span>${language}`;
        } else if (language == "JavaScript") {
          lang.innerHTML = `<span style="background-color:#f1e05a"></span>${language}`;
        } else {
          lang.innerHTML = `<span style="background-color:#563d7c"></span>${language}`;
        }
      }

      let stars = document.createElement("p");
      stars.innerHTML = `<i class="fa-regular fa-star"></i> ${stargazers_count}`;

      let fork = document.createElement("p");
      fork.innerHTML = `<svg aria-label="fork" role="img" height="12" viewBox="0 0 16 16" version="1.1" width="12" data-view-component="true" class="octicon octicon-repo-forked">
       <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
        </svg>${forks}`;

      let date = new Date(updated_at);

      let day = date.getDate();
      day < 10 ? (day = `0${day}`) : (day = day);
      let month = date.getMonth() + 1;
      month < 10 ? (month = `0${month}`) : (month = month);
      let year = date.getFullYear();

      let stringdate = `Updated at ${day}-${month}-${year}`;

      let up_date = document.createElement("p");
      up_date.innerHTML = stringdate;

      div1.append(lang, stars, fork, up_date);

      let div2 = document.createElement("div");

      let btn = document.createElement("p");
      btn.innerHTML = `<span><i class="fa-regular fa-star"></i> Star</span><span><i class="fa-solid fa-sort-down"></i></span>`;

      let line = document.createElement("span");
      line.innerHTML = `<svg width="155" height="30">
        <defs>
          <linearGradient id="gradient-404634861" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stop-color="var(--color-calendar-graph-day-L1-bg)"></stop>
            <stop offset="10%" stop-color="var(--color-calendar-graph-day-L2-bg)"></stop>
            <stop offset="25%" stop-color="var(--color-calendar-graph-day-L3-bg)"></stop>
            <stop offset="50%" stop-color="var(--color-calendar-graph-day-L4-bg)"></stop>
          </linearGradient>
          <mask id="sparkline-404634861" x="0" y="0" width="155" height="28">
            <polyline transform="translate(0, 28) scale(1,-1)" points="0,1 3,1 6,1 9,1 12,1 15,1 18,1 21,1 24,1 27,1 30,1 33,1 36,1 39,1 42,1 45,1 48,1 51,1 54,1 57,1 60,1 63,1 66,8 69,17 72,1 75,1 78,1 81,1 84,1 87,1 90,1 93,1 96,1 99,1 102,1 105,1 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,1 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,1 " fill="transparent" stroke="#8cc665" stroke-width="2">
          </polyline></mask>
        </defs>
  
        <g transform="translate(0, -4)">
          <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-404634861); mask: url(#sparkline-404634861)"></rect>
        </g>
      </svg>`;
      div0.append(name1, desc, div1);

      div2.append(btn, line);

      div.append(div0, div2);

      document.querySelector(".right").append(div);
    }
  );
};

const display_error = (input) => {
  main.style.display = "grid";
  document.querySelector(".left").innerHTML = null;
  document.querySelector(".right").innerHTML = null;
  tab.innerHTML = null;
  const h1 = document.querySelector("main>h1");
  const p = document.querySelector("main>p");
  h1.innerHTML = "404";
  p.innerHTML = `Sorry, No user found for ${input}`;
};
