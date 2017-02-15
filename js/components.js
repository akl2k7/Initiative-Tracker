// Vue components
Vue.component("add-player",{
	template: `<div>
		<h2>Add Character</h2>
		<div class="form-group">
			<h3>Character Type</h3>
			<div>
				<label><input type="radio" name="characterType" value="player" v-model="characterType" checked/> Player</label>
				<label><input type="radio" name="characterType" value="npc" v-model="characterType"/> NPC</label>
			</div>
		</div>
		<div class="form-group">
			<label>Name</label>
			<input type="text" class="form-control" v-model="name"/>
		</div>
		<h3>Characteristics</h3>
		<div class="row">
			<div class='form-group col-xs-6'>
				<label>Willpower</label>
				<input type="number" class="form-control" v-model="willpower"/>
			</div>
			<div class="form-group col-xs-6">
				<label>Presence</label>
				<input type="number" class="form-control" v-model="presence"/>
			</div>
		</div>
		<h3>Skills</h3>
			<div class="form-group row">
				<div class="col-xs-6">
					<strong>Skill: </strong>
					<select id="skill-list" class="form-control" v-model="skillType">
					</select>
				</div>
				<div class="col-xs-6">
					<strong>Level</strong> <input type="number" class="form-control"/>
				</div>
				
			</div>
			<button class="btn btn-default">Add Skill</button>
		<div class="row">
			
			<div class="form-group col-xs-6">
				<label>Cool (Presence)</label>
				<input type="number" class="form-control" v-model="cool"/>
			</div>
			<div class="form-group col-xs-6">
				<label>Vigilance (Willpower)</label>
				<input type="number" class="form-control" v-model="vigilance"/>
			</div>
		</div>
		<button class="btn btn-primary">Save</button><button class="btn btn-danger" v-on:click="clearData">Clear</button>
	</div>
	`,
	data(){
		return {
			// Default values
			characterType: "player",
			name: "",
			presence: 0,
			willpower: 0,
			cool: 0,
			vigilance: 0,
			wounds: 0,
			woundThreshold: 0,
			strain: 0,
			strainThreshold: 0,
			skillType: "",
			skillLevel: 0,
			skills: {}
		};
	},
	methods: {
		savePlayer(){

		},
		clearData(){
			this.characterType = "player";
			this.name = "";
			this.presence = 0;
			this.willpower = 0;
			this.cool = 0;
			this.vigilance = 0;
			this.wounds = 0;
			this.woundThreshold = 0;
			this.strain = 0;
			this.strainThreshold = 0;
		}
	}
});

// Campaign components
Vue.component("add-campaign", {
	template: `<div>
		<h2>Add Campaign</h2>
		<div class="form-group">
			<label>Name</label>
			<input type="text" class="form-control" v-model="name"/>
		</div>
		<div class="form-group">
			<label>Description</label>
			<textarea class="form-control" v-model="description"></textarea>
		</div>
		<button class="btn btn-primary" v-on:click="addCampaign">Add Campaign</button>
	</div>`,
	data(){
		return {
			name: "",
			description: ""
		};
	},
	created(){
		console.log("loaded");
	},
	methods: {
		addCampaign(){
			let newCamp = new Campaign({
				name: this.name, 
				description: this.description
			});
			this.$root.campaigns.push(newCamp);
			this.$root.saveToLS();
			this.$root.currentView = "view-campaign";
		}
	}
})

Vue.component("view-campaign", {
	template: `<div>
		<h2>View Campaign</h2>
		<h3>{{campaign.name}}</h3>
		<p><strong>Description:</strong> {{campaign.description}}</p>
		<button class="btn btn-default" v-on:click="editCampaign">Edit</button> 
		<button class="btn btn-default" v-on:click="addCampaign">Add</button>
		<button class="btn btn-primary" v-on:click="changeCampaign">Change Campaign</button>
	</div>`,
	props: ["campaign"],
	methods: {
		addCampaign(){
			this.$root.currentView = "add-campaign";
		},
		editCampaign(){
			this.$root.currentView = "edit-campaign";
		},
		changeCampaign(){
			this.$root.currentView = "change-campaign";
		}
	}
});

Vue.component("edit-campaign", {
	props: ["campaign"],
	template: `<div>
		<h2>Edit Campaign</h2>
		<div class="form-group">
			<label>Name</label>
			<input type="text" class="form-control" v-bind="name" v-model="name"/>
		</div>
		<div class="form-group">
			<label>Description</label>
			<textarea class="form-control" v-bind="description">{{description}}</textarea>
		</div>
		<button class="btn btn-primary">Submit Changes</button>
	</div>`,
	data(){
		return {
			name: "",
			description: "",
			party: []
		};
	},
	created(){
		this.name = this.campaign.name;
		this.description = this.campaign.description;
	}
});

Vue.component("change-campaign", {
	template: `<div>
		<h2>Change Campaign</h2>
		<ul class="list-group">
			<li v-for="campaign in campaigns">
				<p><strong>{{campaign.name}}</p>
				<p>{{campaign.description}}</p>
			</li>
		</ul>
	</div>`,
	props: ["campaigns"]
});

// Navigation bar
Vue.component("navigation", {
	template: `<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapsed"
				data-target="#main-navbar" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Brand</a> 
			</div>

			<div class="collapse navbar-collapse" id="main-navbar">
				<ul class="nav navbar-nav">

					<!-- Campaign dropdown -->
					<li class="active dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" 
					role="button" aria-haspopup="true" aria-expanded="false">
					Campaigns <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a href="#" v-on:click="changeScreen('add-campaign')">Add Campaign</a></li>
							<li><a href="#" v-on:click="changeScreen('view-campaign')">View Current Campaign</a></li>
							<li><a href="#" v-on:click="changeScreen('edit-Campaign')">Edit Campaign</a></li>
							<li><a href="#" v-on:click="changeScreen('change-campaign')">Change Campaign</a></li>
						</ul>
					</li>

					<!-- Character dropdown -->
					<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" 
					role="button" aria-haspopup="true" aria-expanded="false">
					Characters<span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a href="#">View Character</a></li>
							<li><a href="#">New Character</a></li>
						</ul>
					</li>

					<li><a href="#" v-on:click="changeScreen('about-app')">About</a></li>
				</ul>
			</div>
		</div>
	</nav>`,
	methods: {
		changeScreen(newScreen){
			this.$root.currentView = newScreen;
		}
	}
});

// About the app
Vue.component("about-app",{
	template: `<div>
		<p>Copyright 2017, Andrew Laino.</p>
		<p>Built, designed and programmed by Andrew Laino using HTML, CSS, JavaScript, jQuery, AJAX, LocalStorage, PHP and Vue.js.</p>
	</div>`
});