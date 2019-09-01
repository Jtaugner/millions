const Rules = Vue.component("rules", {
    template: `<div class="functionalWindow rules" v-if="rulesSeen">\n
	<div class="innerFuncWindow rulesWindow">
		<h2 class="head">Правила</h2>
		<ul>
		<li>Добро пожаловать в Десять миллионов.</li>
		<li>Ваша задача - зарабатывать деньги, отвечая на вопросы.</li>
		<li>На одну игру вам даётся 10 миллинов и 8 вопросов.</li>
		<li>В каждом вопросе 4 варианта ответа. Вы можете распределить деньги на каждый вариант по своему усмотрению,
		 но лишь на одном - правильном - варианте деньги сохранятся, и вы продолжите игру.</li>
		 <li>Игра завершится, и вы потеряете всё в двух случаях: вышло время (40 секунд) или же на правильном варианте не оказалось денег</li>
		 <li>На заработанные деньги вы можете купить собственность, начиная от ноутбука и заканчивая бизнесом - Яндекс.Играми. На бизнесе также можно заработать.</li>
		 <li>Удачной игры!</li>
		 </ul>
		<p class="vopr">Если у вас есть какие-либо вопросы или предложения, пишите сюда: <a href="https://vk.com/jtaugner"  target="_blank" class="creator">https://vk.com/jtaugner</a></p> </div>
	<button class="bigButton" @click="toggleRules()">Продолжить игру</button>\n </div>`,
    store: store,
    data: () => ({
        rulesSeen: !1
    }),
    methods: {
        toggleRules() {
            /*
            let e = document.querySelector(".rules");
            e.classList.contains("none") ? e.classList.remove("none") : e.classList.add("none"),*/
                // "rules.html" === window.location.href.substr(-10) && this.rulesSeen && window.history.back(),
                this.rulesSeen = !this.rulesSeen;

        }
    }
});