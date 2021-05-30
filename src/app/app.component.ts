import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dev-tech-challenge-app';
  members:string[] = [];
  checkoutForm = this.formBuilder.group({
    name: ''
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.http.get('https://upbeat-lamport-af75f5.netlify.app/.netlify/functions/get_all_members').subscribe((response) => {
      Object.values(response).forEach(element => {
        console.log(element.data.name);
        this.members.push(element.data.name);
      });
		})
	}

  onSubmit(): void {
    this.http.post('https://upbeat-lamport-af75f5.netlify.app/.netlify/functions/create_member', this.checkoutForm.value.name).subscribe((response) => {
      console.log(response);
    })
    console.log('Done: ', this.checkoutForm.value.name);
    this.checkoutForm.reset();
  }
}
