function navbar(){
	return `	<div id="navbar"> 

		<div id="logo">
			<a href="home.html"><img src="https://avatars.githubusercontent.com/u/9919?s=280&v=4"></a> 
		</div>
		<div id="search">
			<input type="text" id="search-input" placeholder="search here"> 
		</div>

		<div id="options"> 
			<ul id="list"> 
				<li><a href="pull.html">Pull requests</a></li>
				<li><a href="issues.html">Issues</a></li>
				<li><a href="">Marketplace</a></li>
				<li><a href="expoler.html">Explor</a></li>
			</ul>
		</div>

		<div id="profile">
			<img src="https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg" id="profile-img"> 
		</div>
		<div id="profile_user">
			<span class="iconify" data-icon="octicon:triangle-down-16"></span>
		</div>
		<div class="show_user_details">
			<ul> 
				<li>Signed in as</li>
				<li id="username"></li>
			</ul>
			<ul>
				<li>Your profile</li>
				<li>Your repositories</li>
				<li>Your codespaces</li>
				<li>Your organizations</li>
				<li>Your enterprises</li>
				<li>Your projects</li>
				<li>Your stars</li>
				<li>Your gits</li>
			</ul>
			<ul>
				<li>Upgrade</li>
				<li>Feature preview</li>
				<li>Help</li>
				<li>Settings</li>
			</ul>
			<p id="sign_out">Sign out</p>
		</div>

	</div>`
}


export default navbar;