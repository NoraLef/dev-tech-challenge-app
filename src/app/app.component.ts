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
  members = [{id: "0", name: "test"}];
  HEROES = [
    {id: "1", name:'Superman'},
    {id: "2", name:'Batman'},
    {id: "5", name:'BatGirl'},
    {id: "3", name:'Robin'},
    {id: "4", name:'Flash'}
];
  checkoutForm = this.formBuilder.group({
    name: ''
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

	ngOnInit() {
    this.members = [];
		this.http.get('http://localhost:8888/.netlify/functions/get_all_members').subscribe((response) => {
      Object.values(response).forEach(element => {
        this.members.push({id: element.ref["@ref"].id, name: element.data.name});
      });
		})
    console.log(this.members);
    console.log(this.HEROES);
	}

  onSubmit(): void {
    if(this.members.includes(this.checkoutForm.value.name)) {
      alert("Ce nom fait déjà parti des membres; veuillez réessayer avec un autre nom !");
    } else {
      this.http.post('http://localhost:8888/.netlify/functions/create_member', this.checkoutForm.value.name, {responseType: 'text'}).subscribe((response) => {
        console.log(response);
      })
    this.members.push(this.checkoutForm.value.name);
    this.checkoutForm.reset();
    }
  }

  onDelete(memberId: string, memberName: string): void {
    this.http.post('http://localhost:8888/.netlify/functions/delete_member', memberId).subscribe((response) => {
      console.log(response);
    })
    this.members.splice(this.members.findIndex(x => x.name === memberName),1);
  }
}
