class Character {
	constructor (name, willpower, presence, skills={}){
		this.name = name;
		this.willpower = willpower;
		this.presence = presence;
		this.skills = skills;
	}
}
class Player extends Character {
	constructor(name, willpower, presence, skills={}){
		super(name, willpower, presence, skills);
		this.playable = true;
	}
}

class NPC extends Character {
	constructor(name, willpower, presence, skills={}){
		super(name, willpower, presence, skills);
		this.playable = false;
	}
}

class Campaign {
	constructor(obj){
		this.name = "";
		this.description = "";
		this.party = [];
		this.npcs = [];

		for(let key in obj){
			this[key] = obj[key];
		}
	}

	addPlayer(player){
		this.party.push(player);
	}

	addNPC(npc){
		this.npcs.push(npc);
	}
}

class Slot {

}