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
  members:any = [];
  checkoutForm = this.formBuilder.group({
    name: ''
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

	ngOnInit() {
    this.http.get('https://upbeat-lamport-af75f5.netlify.app/.netlify/functions/get_all_members').subscribe((response) => {
      Object.values(response).forEach((element:any) => {
        this.members.push({id: element.ref["@ref"].id, name: element.data.name});
      });
    })
	}

  onSubmit(): void {
    if(this.members.some((x:any) => x.name === this.checkoutForm.value.name)) {
      alert("Ce nom fait déjà parti des membres; veuillez réessayer avec un autre nom !");
    } else {
      if(this.members.length === 50) {
        alert("Vous avez atteint la limite de membres d'équipage !")
      } else {
        this.http.post('https://upbeat-lamport-af75f5.netlify.app/.netlify/functions/create_member', this.checkoutForm.value.name).subscribe((response: any) => {
          this.members.push({id: response.ref["@ref"].id, name: response.data.name});
        })
      }
      this.checkoutForm.reset();
    }
  }

  onDelete(memberId: string, memberName: string): void {
    this.http.post('https://upbeat-lamport-af75f5.netlify.app/.netlify/functions/delete_member', memberId).subscribe((response) => {
      this.members.splice(this.members.findIndex((x:any) => x.name === memberName),1);
    })
  }
}
