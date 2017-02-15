// Vue code
vm = new Vue({
	el: "#app",
	data: {
		campaigns: [],
		currentCampIndex: 0,
		currentCamp: new Campaign(),
		currentPlayerIndex: 0,
		currentView: "add-campaign"
	},
	created(){
		this.campaigns = this.loadFromLS();

		if(this.campaigns.length > 0){
			this.currentCamp = this.campaigns[0];
			this.currentView = "view-campaign";
		}
	},
	methods: {
		saveToLS(){
			let output = JSON.stringify(this.campaigns);
			localStorage.setItem("campaigns", output);
		},
		loadFromLS(){
			let input = "";

			// Get data from localStorage if there
			if(localStorage["campaigns"])
				input = localStorage.getItem("campaigns")
			else
				input = "[]";
			return JSON.parse(input);
		}
	}
});
