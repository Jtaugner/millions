let bus;
if(property[4] !== -1){
    bus = setInterval(()=>{
        store.commit('business', achievements[4][property[4]].income);
    }, 600000)
}
const achievements = [
    [
        {name: "Ноутбук", price: 50000},
        {name: "Компьютер для игр", price: 100000},
        {name: "Для учёбы :)", price: 500000},
        {name: "Супер-компьютер", price: 2000000},
        {name: "Дата-центр", price: 5000000},
    ],
    [
        {name: "Обычная однушка", price: 1500000},
        {name: "Двухкомнатная квартира", price: 3000000},
        {name: "Четырёхкомнатная квартира", price: 6000000},
        {name: "Пентхаус в Москве", price: 20000000},
        {name: "Особняк у моря в Италии", price: 50000000}
    ],
    [
        {name: "Лада Веста", price: 500000},
        {name: "Ford Explorer", price: 2500000},
        {name: "BMW X7", price: 6000000},
        {name: "Mercedes-Maybach", price: 10000000},
        {name: "Rolls-Royce Phantom", price: 55000000},
    ],
    [
        {name: "Лодка с мотором", price: 50000},
        {name: "Катер", price: 1000000},
        {name: "Небольшая яхта", price: 5000000},
        {name: "Трёхэтажная яхта", price: 10000000},
        {name: "Элитная яхта", price: 44000000},
    ],
    [
        {name: "Забегаловка", price: 1000000, income: 100000},
        {name: "Ателье", price: 3000000, income: 400000},
        {name: "Ресторан", price: 5000000, income: 700000},
        {name: "Банк", price: 10000000, income: 1000000},
        {name: "Яндекс.Игры", price: 60000000, income: 10000000},
    ]
]
const Progress = Vue.component("progr", {
    template: `<div class="functionalWindow" v-if="progressSeen">
	<div class="innerFuncWindow rulesWindow">
		<h2 class="head">Собственность</h2>
		    <p>У вас {{myAllMoney.toLocaleString('de-DE')}} рублей, нажмите на название, чтобы купить</p>
	        <h3>Компьютеры {{property[0]+1}}/{{achievements[0].length}}</h3>
            <div class="achievement" :class="property[0] >= chose[0] ? 'done' : ''">
                <span class="left" @click="toggleAchLeft(0)"></span>
                <p class="achName" @click="buy(0)">{{achievements[0][chose[0]].name}} - {{achievements[0][chose[0]].price.toLocaleString('de-DE')}}</p>
                <span class="right" @click="toggleAchRight(0)"></span>
            </div>
            <h3>Квартиры {{property[1]+1}}/{{achievements[1].length}}</h3>
            <div class="achievement"  :class="property[1] >= chose[1] ? 'done' : ''">
                <span class="left" @click="toggleAchLeft(1)"></span>
                <p class="achName" @click="buy(1)">{{achievements[1][chose[1]].name}} - {{achievements[1][chose[1]].price.toLocaleString('de-DE')}}</p>
                <span class="right" @click="toggleAchRight(1)"></span>
            </div>
            <h3>Машины {{property[2]+1}}/{{achievements[2].length}}</h3>
            <div class="achievement" :class="property[2] >= chose[2] ? 'done' : ''">
                <span class="left" @click="toggleAchLeft(2)"></span>
                <p class="achName" @click="buy(2)">{{achievements[2][chose[2]].name}} - {{achievements[2][chose[2]].price.toLocaleString('de-DE')}}</p>
                <span class="right" @click="toggleAchRight(2)"></span>
            </div>
            <h3>Лодки {{property[3]+1}}/{{achievements[3].length}}</h3>
            <div class="achievement" :class="property[3] >= chose[3] ? 'done' : ''">
                <span class="left" @click="toggleAchLeft(3)"></span>
                <p class="achName" @click="buy(3)">{{achievements[3][chose[3]].name}} - {{achievements[3][chose[3]].price.toLocaleString('de-DE')}}</p>
                <span class="right" @click="toggleAchRight(3)"></span>
            </div>
            <h3>Бизнес - доход {{property[4]+1}}/{{achievements[4].length}}</h3>
            <div class="achievement" :class="property[4] >= chose[4] ? 'done' : ''">
                <span class="left" @click="toggleAchLeft(4)"></span>
                <p class="achName" @click="buy(4)">{{achievements[4][chose[4]].name}} - {{achievements[4][chose[4]].price.toLocaleString('de-DE')}} 
                - {{achievements[4][chose[4]].income.toLocaleString('de-DE')}}/10мин</p>
                <span class="right" @click="toggleAchRight(4)"></span>
            </div>
       </div>
	<button class="bigButton" @click="toggleProgress()">Вернуться в меню</button>
	 </div>`,
    store: store,
    data: () => ({
        progressSeen: false,
        chose: [0, 0, 0, 0, 0],
        achievements: achievements
    }),
    computed: {
        ...Vuex.mapState(["property", "myAllMoney"])
    },
    methods: {
        ...Vuex.mapMutations(["changeProperty"]),
        toggleProgress() {
            this.progressSeen = !this.progressSeen
        },
        toggleAchLeft(i){
            if(this.chose[i] === 0) return;
            this.chose.splice(i, 1, --this.chose[i]);
        },
        toggleAchRight(i){
            if(this.chose[i] === 4) return;
            this.chose.splice(i, 1, ++this.chose[i]);
        },
        buy(i){
            let n =  this.chose[i];
            if(this.myAllMoney >= this.achievements[i][n].price){
                if(this.property[i]+1 === n){
                    this.changeProperty({i: i, sum: this.achievements[i][n].price})
                    if(i === 4){
                        clearInterval(bus);
                        bus = setInterval(()=>{
                            store.commit('business', achievements[4][n].income);
                        }, 600000)
                    }
                }
            }


        }
    }
});