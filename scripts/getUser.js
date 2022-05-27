async function getUser(user){
	try{
		let response = await fetch(`https://api.github.com/users/${user}`)
		let data = await response.json()
		return data
	}catch(err){
		return err
	}
}


async function appendData(data , location , loaction_2){
	location.innerHTML = "";
	var left_div = document.createElement("div")
	left_div.setAttribute("class" , "left_div")
	var img = document.createElement("img")
	img.src = data.avatar_url

	var h1 = document.createElement("h1")
	h1.innerText = data.name

	var user_name = document.createElement("p")
	user_name.innerText = data.login

	var btn = document.createElement("button")
	btn.innerText = "Follow"

	var follow = document.createElement("div")
	follow.innerHTML = `<span class="iconify" data-icon="eva:people-outline"></span><span>${data.followers} followers</span><span class="iconify" data-icon="ci:dot-01-xs"></span><span>${data.following} following</span>`
	follow.setAttribute("class" , "follow")
	var user_location = document.createElement("div")
	user_location.innerHTML = `<span class="iconify" data-icon="fluent:location-16-regular"></span><span>${data.location}</span>`

	var blog = document.createElement("div")
	blog.innerHTML = data.blog
	if(data.location != null){
		left_div.append(img , h1 , user_name , btn , follow , user_location , blog)
	}
	else{
		left_div.append(img , h1 , user_name , btn , follow , blog)
	}
	
	var right_div = document.createElement("div")
	right_div.setAttribute("class" , "right_div")
	let repo_data = await getUser(`${data.login}/repos`)
	
	if(loaction_2 == "Overview"){

		var overview = document.createElement("p")
		overview.innerText = "Popular repositories"
		var popular_repo = document.createElement("div")
		popular_repo.setAttribute("class" , "popular_repo")
		var len = Math.min(repo_data.length , 6)
		if(repo_data.length != 0){
			for(var i = 0 ; i < len ; i++){
				var repo = document.createElement("div")

				var repo_div = document.createElement("div")
				repo_div.setAttribute("class" , "repo_div")
				var repo_name = document.createElement("span")
				repo_name.setAttribute("class" , "repo_name")
				repo_name.innerText = repo_data[i].name

				var visibily = document.createElement("span")
				visibily.setAttribute("class" , "visibility")
				visibily.innerText = repo_data[i].visibility

				var lang = document.createElement("p")
				lang.innerText = repo_data[i].language
				
				repo.setAttribute("id" , i)
				repo.addEventListener("click" , function(e){
					window.location.href = repo_data[e.target.id].html_url
				})

				repo_div.append(repo_name , visibily)
				repo.append(repo_div , lang)
				repo.style.cursor = "pointer"
				popular_repo.append(repo)
			}
		}
		else{
			popular_repo.classList.add("no_repo")
			popular_repo.innerHTML = `<p>${data.login} doesn't have any public repositories yet.</p>`
		}
		
		

		
		var contro = document.createElement("div")
		contro.setAttribute("class" , "contro")
		var img_div = document.createElement("div")
		var contro_img = document.createElement("img")
		contro_img.src = `https://ghchart.rshah.org/${data.login}`
		var contro_des =  document.createElement("div")
		contro_des.setAttribute("class" , "contro_des")
		contro_des.innerHTML = `<p>Learn how we count contributions</p>
								<div>
									Less
									<span class="lavender"></span>
									<span class="palegreen"></span>
									<span class="mediumseagreen"></span>
									<span class="seagreen"></span>
									<span class="foretgreen"></span>
									More
								</div>`
		var year = document.createElement("ul")
		year.innerHTML = `<li>2022</li><li>2021</li><li>2020</li><li>2019</li>`
		img_div.append(contro_img , contro_des)
		contro.append(img_div , year)
		right_div.append(overview,popular_repo , contro)
	}

	if(loaction_2 == "Repositories"){
		var repo_nav = document.createElement("div")
		repo_nav.setAttribute("class" ,"repo_nav")
		repo_nav.innerHTML = `
				<input type="text" placeholder="Find a repository...">
				<div>
					<span>Type</span>
					<span class="iconify" data-icon="octicon:triangle-down-16"></span>
				</div>
				<div>
					<span>Language</span>
					<span class="iconify" data-icon="octicon:triangle-down-16"></span>
				</div>
				<div>
					<span>Sort</span>
					<span class="iconify" data-icon="octicon:triangle-down-16"></span>
				</div>

			`

		var all_repo = document.createElement("div")
		if(repo_data.length != 0){

			for(var i = 0 ; i < repo_data.length ; i++){
				var perticluar_repo = document.createElement("div")
				perticluar_repo.setAttribute("class" , "single_Repo_div")
				var repo_item = document.createElement("div")
				repo_item.setAttribute("class" , "repo_item")
				var repo_name = document.createElement("div")
				repo_name.innerHTML = `<span class="repo_name">${repo_data[i].name}</span> <span class="visibility">${repo_data[i].visibility}</span>`

				var lang = document.createElement("p")
				lang.innerText = repo_data[i].language
				perticluar_repo.setAttribute("id" , i)
				perticluar_repo.addEventListener("click" , function(e){
					window.location.href = repo_data[e.target.id].html_url
				})

				perticluar_repo.style.cursor = "pointer"
				var star = document.createElement("div")
				star.innerHTML = `<button><span class="iconify" data-icon="ant-design:star-outlined"></span><span>Star</span></button><button><span class="iconify" data-icon="octicon:triangle-down-16"></span></button>`

				repo_item.append(repo_name , lang)
				perticluar_repo.append(repo_item , star)
				all_repo.append(perticluar_repo)

			}
			
		}else{
			all_repo.innerHTML = `<p class="no_repo_list">${data.login} doesn't have any public repositories yet.</p>`
		}

		right_div.append(repo_nav , all_repo)
		
	}



	if(loaction_2 == "Packages"){
		var packages = document.createElement("div")
		packages.setAttribute("class" , "packages")
		packages.innerHTML = `
			<img src="">
			<h1>Get started with Github Packages</h1>
			<p>Safely publish packages, store your packages alongside your code, and share your packages privately with your team.</p>
			<p class="package_reg_header">Choose a registry</p>
			<div class="packages_registry">
				<div>
					<div>
						<img src="https://pbs.twimg.com/profile_images/1273307847103635465/lfVWBmiW_400x400.png">
						<h2>Docker</h2>
					</div>
					<p>
						A software platform used for building applications based on containers — small and lightweight execution environments.
					</p>
					<button>Learn More</button>
				</div>
				<div>
					<div>
						<img src="https://media.trustradius.com/product-logos/HK/19/A1STBOL3HJCR-180x180.JPEG">
						<h2>Apache Maven</h2>
					</div>
					<p>
						A default package manager used for the Java programming language and the Java runtime environment.
					</p>
					<button>Learn More</button>
				</div>
				<div>
					<div>
						<img src="https://www.nuget.org/Content/gallery/img/logo-og-600x600.png">
						<h2>NuGet</h2>
					</div>
					<p>
						A free and open source package manager used for the Microsoft development platforms including .NET.
					</p>
					<button>Learn More</button>
				</div>
			</div>



		`
		right_div.append(packages)
	}



	if(loaction_2 == "Projects"){

		var project = document.createElement("div")
		project.setAttribute("class" , "projects")
		project.innerHTML = `
			<input type="text" placeholder="is:open sort:created-dese">
			<div class="project_div">
				<div class="project_nav">
					<div>
						<span class="iconify" data-icon="ant-design:project-outlined"></span>
						<span class="mg">0 Open</span>
						<span class="iconify" data-icon="bytesize:archive"></span>
						<span>0 closed</span>
					</div>
					<div>
						<span>Sort</span>
						<span class="iconify" data-icon="octicon:triangle-down-16"></span>
					</div>
					
				</div>
				<div>
					<h1>${data.login} doesn't have any projects yet.</h1>
				</div>

			</div>

		`
		right_div.append(project)
	}


	if(loaction_2 == "Stars"){
		var stars_div = document.createElement("div")

		stars_div.innerHTML = `
			<div class="star_header">
				<span>List</span>
				<button>Create list</button>
			</div>
			<div class="star_des">
				<span class="iconify" data-icon="ant-design:star-outlined"></span>
				<h3>Create your first list</h3>
				<p>Lists make it easier to organize and curate repositories that you have starred. 
				Create your first list.</p>
			</div>

			<div class="star_link">
				<span>Beta</span>
				<span>Lists are currently in beta.</span>
				<span>Share feedback and report bugs.</span>
			</div>
			<div class="star_nav">
				<input type="text" placeholder="Search starred repositories">
				<div>
					<span>Type:All</span>
					<span class="iconify" data-icon="octicon:triangle-down-16"></span>
				</div>
				<div>
					<span>Language</span>
					<span class="iconify" data-icon="octicon:triangle-down-16"></span>
				</div>
				<div>
					<span>Sort By:Recently starred</span>
					<span class="iconify" data-icon="octicon:triangle-down-16"></span>
				</div>
			</div>
		`
		right_div.append(stars_div)



	}

	location.append(left_div , right_div)


}

export {getUser,appendData};