
window.onload = function() {
    const sumid = document.getElementById("sum");
    sumid.value = 5000000;
    const answers = document.querySelectorAll(".option input");
    document.onkeydown = function(e) {
        (e.ctrlKey && 187 === e.keyCode || e.ctrlKey && 189 === e.keyCode) && e.preventDefault()
    };
    document.onwheel = function(e) {
        e.ctrlKey && e.preventDefault()
    };
    const game = new Vue({
        el: ".game",
        store: store,
        data: {
            isPhone: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            selectedA: "0"
        },
        computed: {
            ...Vuex.mapState([ "numGame", "menu", "end", "content", "blackout", "achievementSeen", "answers",
                "money", "spareMoney", "sums",  "money", "question", "giveAnswer", "nextQuestion",
                "animation", "stage", "keepQuestions", "time"]),
            checkedMoney(){
                return store.state.sums[+this.selectedA];
            },
            maxMoney(){
                let cm = this.checkedMoney;
                if(store.state.spareMoney === 0){
                    return cm;
                }
                return cm + store.state.spareMoney;
            }
        },
        components: {
            Rules: Rules,
            FunctionalWindow: FunctionalWindow,
            Progress: Progress,
        },
        methods: {
            ...Vuex.mapMutations(["startGame", "changeSum", "returnMenu"]),
            toggleRules() {
                game.$refs.rules.toggleRules()
            },
            toggleProgress() {
                game.$refs.progress.toggleProgress()
            },
            changeSum(){
                let sum = document.querySelector('#sum').value;
                store.commit('changeSum', {
                    q: +this.selectedA,
                    sum: +sum
                });

            },
            changeValue(e){
                let a = e.target.value;
                sumid.value = store.state.sums[+a];
            },
            giveAnswer(){
                if(store.state.animation) return;
                store.commit('giveAnswer');
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                document.querySelector(".start").remove()
            })
        }
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.onpopstate = function() {
            if(!store.state.menu){
                store.state.menu = true;
                store.state.content = false;
            }
        };
        const e = {
            foo: "bar"
        };
        document.querySelector(".startGame").onclick = function() {
            window.history.pushState(e, "Скопа", "index.html");
        }



    }
};