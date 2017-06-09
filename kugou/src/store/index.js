import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
	state:{
		audio:{
			songUrl:'',
			imgUrl:'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
			title:'',
			singer:'',
			currentLength:0,
			songLength:0,
			currentFlag:false
		},
		head:{
			toggle:false,
			title:'',
			style:{'background':'rgba(43,162,251,0)'}
		},
		headNav:'head-nav1',
		audioLoadding:false,
		detailPlayerFlag:false,
		showPlayer:false,
		listenCount:0,
		isPlay:true,
		listInfo:{
			songList:[],
			songIndex:0
		}
	},
	getters:{
		head:state=>state.head,
		audio:state=>state.audio,
		audioLoadding:state=>state.audioLoadding,
		detailPlayerFlag:state=>state.detailPlayerFlag,
		showPlayer:state=>state.showPlayer,
		isPlay:state=>state.isPlay
	},
	mutations:{
		setAudio(state,audio){
			if(!state.listenCount){
				state.showPlayer=true;
			}	
			state.listenCount++;
			state.audio={...(state.audio),...audio};
		},
		showHead(state,flag){
			state.head.toggle=flag;
		},
		showPlayer:(state,flag)=>{
			state.showPlayer=flag;
		},
		setHeadNav:(state,index)=>{
			state.headNav='head-nav'+index;
		},
		setHeadTitle(state,title){
			state.head.title=title;
		},
		setHeadStyle(state,style){
			state.head.style=style;
		},
		resetHeadStyle:state=>{
			state.head.style={'background':'rgba(43,162,251,0)'};
		},
		toggleAudioLoadding:(state,flag)=>{
			state.audioLoadding=flag;
		},
		setListInfo:(state,{list,index})=>{
			state.listInfo.songList=list;
			state.listInfo.songIndex=index;
		},
		isPlay:(state,flag)=>{
			state.isPlay=flag;
		},
		setAudioTime(state,time){
			state.audio.currentLength=time;
		},
		setCurrent(state,flag){
			state.audio.currentFlag=flag;
		},
		showDetailPlayer:(state,flag)=>{
			state.detailPlayerFlag=flag;
		},
		setLrc:(state,lrc)=>{
			state.audio={...(state.audio),lrc}
		}
	},
	actions:{
		getSong({commit,state},hash){
			commit('toggleAudioLoadding',true);
			Vue.http.get(`http://cs003.m2828.com/apis/getKugouSong.php?hash=${hash}`).then(res=>{
				console.log(res)
				var json_obj=JSON.parse(res.data);
				var songUrl=json_obj.url,
					imgUrl=json_obj.imgUrl.split('{size}').join('100'),
					title=json_obj.songName,
					singer=json_obj.choricSinger,
					songLength=json_obj.timeLength,
					currentLength=0,
					audio={songUrl,imgUrl,title,singer,songLength,currentLength};
				commit('setAudio',audio);
				commit('toggleAudioLoadding',false);
			});
		},
		getLrc({commit,state},hash){
			Vue.http.get(`http://cs003.m2828.com/apis/getLrc.php?hash=${hash}`).then(res=>{
				commit('setLrc',res.data);
			})
		},
		next({dispatch,state}){
			var list=state.listInfo.songList;
			if(state.listInfo.songIndex==list.length-1){
				state.listInfo.songIndex=0
			}else{
				++state.listInfo.songIndex;
			};
			var hash=list[state.listInfo.songIndex].hash;
			dispatch('getSong',hash);
			dispatch('getLrc',hash);
		},
		prev({dispatch,state}){
			var list=state.listInfo.songList;
			if(state.listInfo.songIndex==0){
				state.listInfo.songIndex=list.length;
			}else{
				state.listInfo.songIndex--;
			}
			var hash=list[state.listInfo.songIndex].hash;
			dispatch('getSong',hash);
			dispatch('getLrc',hash);
		}
	}
});

export default store