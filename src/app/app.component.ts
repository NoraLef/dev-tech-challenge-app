import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dev-tech-challenge-app';

  constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http.get('https://upbeat-lamport-af75f5.netlify.app//.netlify/functions/products').subscribe((response) => {
			console.log('response: ', response)
		})
	}
}
