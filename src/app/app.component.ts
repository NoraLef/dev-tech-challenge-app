import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dev-tech-challenge-app';
  members:string[] = [];

  constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http.get('https://upbeat-lamport-af75f5.netlify.app/.netlify/functions/members').subscribe((response) => {
			console.log('response: ', response);
      console.log('test');
      console.log(Object.values(response));
      Object.values(response).forEach(element => {
        console.log(element.data.name);
        this.members.push(element.data.name);
      });
		})
	}
}
