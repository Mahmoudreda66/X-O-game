let vueApp = Vue.createApp({
	data: function () {
		return {
			turn: true, // true means 'X'
			winnerALert: null
		}
	},
	methods: {
		hasPlayed: function (element) {
			if(element.target.textContent.length === 0){
				element.target.textContent = this.turnString;
				this.turn = !this.turn;
				this.checkWinner();
			}
		},
		checkWinner: function () {
			let thisParent = this;

			// get box text content
			function getContent (elementId, content = true) {
				let element = document.getElementById(elementId);
				if(element){
					if(content){
						return element.textContent;
					}

					return element;
				}

				return null;
			}

			// winner boxes animation
			function setWinnBoxes (el1, el2, el3) {
				let boxes = [
					getContent(el1, false),
					getContent(el2, false),
					getContent(el3, false)
				];

				boxes.forEach(el => {
					el.style.animationName = 'winnerBox';
				});

				thisParent.winnerALert = boxes[0].textContent;
			}

			// no solutions function
			function noSolutions () {
				let allBoxes = document.getElementsByClassName('box');

				for(let i = 0; i < allBoxes.length; i++){
					let box = allBoxes[i];
					box.style.animationName = 'winnerBox';
				}

				thisParent.winnerALert = 'No Solutions';
			}

			// first prospect
			if(getContent('e1') == getContent('e2') && getContent('e1') == getContent('e3') && getContent('e1') != ""){
				setWinnBoxes('e1', 'e2', 'e3');
			}

			// second prospect
			if(getContent('e4') == getContent('e5') && getContent('e4') == getContent('e6') && getContent('e4') != ""){
				setWinnBoxes('e4', 'e5', 'e6');
			}

			// third prospect
			if(getContent('e7') == getContent('e8') && getContent('e7') == getContent('e9') && getContent('e7') != ""){
				setWinnBoxes('e7', 'e8', 'e9');
			}

			// fourth prospect
			if(getContent('e3') == getContent('e5') && getContent('e3') == getContent('e7') && getContent('e3') != ""){
				setWinnBoxes('e3', 'e5', 'e7');
			}

			// fifth prospect
			if(getContent('e1') == getContent('e5') && getContent('e1') == getContent('e9') && getContent('e1') != ""){
				setWinnBoxes('e1', 'e5', 'e9');
			}

			// sixth prospect
			if(getContent('e1') == getContent('e4') && getContent('e1') == getContent('e7') && getContent('e1') != ""){
				setWinnBoxes('e1', 'e4', 'e7');
			}

			// seventh prospect
			if(getContent('e2') == getContent('e5') && getContent('e2') == getContent('e8') && getContent('e2') != ""){
				setWinnBoxes('e2', 'e5', 'e8');
			}

			// Eighth prospect
			if(getContent('e3') == getContent('e6') && getContent('e3') == getContent('e9') && getContent('e3') != ""){
				setWinnBoxes('e3', 'e6', 'e9');
			}

			if(
				getContent('e1') !== "" &&
				getContent('e2') !== "" &&
				getContent('e3') !== "" &&
				getContent('e4') !== "" &&
				getContent('e5') !== "" &&
				getContent('e6') !== "" &&
				getContent('e7') !== "" &&
				getContent('e8') !== "" &&
				getContent('e9') !== ""
			){
				noSolutions();
			}
		},
		restartGame: function () {
			let allBoxes = document.getElementsByClassName('box');

			for(let i = 0; i < allBoxes.length; i++){
				let box = allBoxes[i];

				box.textContent = '';
				box.style.animationName = '';
			}
			this.winnerALert = null;
			this.turn = true;
		}
	},
	computed: {
		turnString: {
			get: function () {
				return this.turn ? 'X' : 'O';
			}
		}
	}
});

vueApp.component('game-box', {
	template: `<div :id="itemId" @click.right.prevent></div>`,
	props: ['id'],
	computed: {
		itemId: {
			get: function () {
				return 'e' + (this.id);
			}
		}
	}
});

vueApp.mount('#app');