 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import Alpha from './util/alpha.js';
 import  { sprintf } from 'sprintf-js';
import sleep from 'es7-sleep';
 import "./css/fill.css";

 

class App extends React.Component {
	
	constructor(){
		super();
		for(let i=0; i<20; i++){
			this.state.surface[i]=[];
			for(let j=0; j<40;j++){
				let alpha =new Alpha();
				alpha.fg='black';
				alpha.bg='black';
				this.state.surface[i][j]=alpha;	
			}
					}
	console.log(this.state.surface);
	}
	
	state = {
		surface:[],
		forecount : 0,
		count: 0,
		ellipse: 0,
		disabled: false,
	}
	
	async fill() {
		for(;;){
			
			
			this.state.forecount++;
			
			let alpha = new Alpha();
			let a =this.state.surface[alpha.line-1][alpha.column-1];
			
			if(a.fg =='black' && a.bg == 'black') {
				this.state.count++;
			
			}		
			
			this.state.surface[alpha.line-1][alpha.column-1] = alpha;
			
			this.forceUpdate();
			
			await sleep(5);
			
			if(this.state.count == 800){
				this.state.disabled = false;
				this.forceUpdate();
				break;
			}
		}
	}
	
	async timer() {
		for(;;){
			this.state.ellipse++;
			this.forceUpdate();
			await sleep(1000);
			
			if(this.state.count == 800){
				break;
			}
		}
	}
	
	btnCreate_click(e){
		this.state.disabled = true;	
		
		for(let i=0; i<20; i++){
			for(let j=0; j<40; j++){
				this.state.surface[i][j].fg ='black';
				this.state.surface[i][j].bg ='black';
				
			}
		}
		
		this.state.forecount=0;
		this.state.count=0;
		this.state.ellipse=0;
		this.forceUpdate();
		
		this.fill();
		this.timer();
	}
		
	render() {
		return(
			<>
			<button disabled={this.state.disabled} onClick={event => this.btnCreate_click(event)}>start</button>
			
			<hr/>
			<table border={1}>
			<thead>
			<tr>
				<th>forecount</th>
				<th>count</th>
				<th>ellipse</th>
			</tr>
			</thead>
			<tbody>
				<tr>
					<td>{this.state.forecount}</td>
					<td>{this.state.count}</td>
					<td>{this.state.ellipse}</td>
				</tr>
			</tbody>
			</table>
			<table className='collapse'
/*			<table style={{borderCollapse:'collapse', fontFamily:'monospace',fontSize:'2em'} }*/
			onMouseDown={event=> event.preventDefault()}
			onContextMenu={event => event.preventDefault()}
			>
				<tbody>
				{
					this.state.surface.map((row,k) =>
						<tr key={k}>
						{
							row.map((v,k) =>
							<td key={k} style={{color:v.fg, background:v.bg}}>{v.ch}</td>
						 )}
						
						</tr>
					)
				}
				</tbody>
			</table>
			</>
	)				
 }
}
let root = ReactDOM.createRoot(document.querySelector('#root')) 
root.render(<App/>)
 
 