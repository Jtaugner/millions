const FunctionalWindow = Vue.component("functional-window", {
    template: `<div class="functionalWindow" v-show="statSeen">
	<div class="innerFuncWindow">
		<h2 class="head" :class="[result === 1 ? 'win' : 'lose']">{{result === 1 ? "Победа" : "Поражение"}}</h2>
		<template v-if="result === 1">
		        <p>Поздравляем! Вы заработали {{money.toLocaleString('de-DE')}} рублей</p><br>
		        <p>На данный момент у вас {{myAllMoney.toLocaleString('de-DE')}} рублей</p><br>
		        <p>Вы можете позволить себе приобрести собственность, для этого перейдите в меню</p>
        </template>
        <template v-else>
                   <p v-if="timeOut" class="first">К сожалению, время вышло</p>
                <p v-else class="first">На этот раз удача отвернулась от вас.</p>
                 <p>Вы ответили на {{stage-1}}/8 вопросов.</p>
                <p>Не отчаивайтесь и попробуйте снова!</p>
        </template>

</div>
		<button class="bigButton" @click="returnMenu" v-if="result === 1">Перейти в меню</button> 
		<button class="bigButton" @click="startGame" v-else>Начать новую игру</button> 
		
</div>
`,
    store: store,
    computed: {
        ...Vuex.mapState(["stage", "result", "statSeen", "money", "myAllMoney", "timeOut"])
    },
    methods: {
        ...Vuex.mapMutations(["returnMenu", "startGame"])
    }
});