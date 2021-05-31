/* TS de la page 'app.component.html */

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
  // Initialisation de la liste des membres en liant avec les membres présents dans la BDD
  members:any = [];
  checkoutForm = this.formBuilder.group({
    name: ''
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}
  // À l'initialisation de la page
	ngOnInit() {
    // Requête GET pour récupérer tous les membres de la BDD
    this.http.get('https://upbeat-lamport-af75f5.netlify.app/.netlify/functions/get_all_members').subscribe((response) => {
      // Pour chaque membre récupéré
      Object.values(response).forEach((element:any) => {
        // on ajoute l'id et le nom du membre dans la liste
        this.members.push({id: element.ref["@ref"].id, name: element.data.name});
      });
    })
	}
  // À la validation du formulation
  onSubmit(): void {
    // Si le membre fait déjà parti de la liste
    if(this.members.some((x:any) => x.name === this.checkoutForm.value.name)) {
      // Envoi d'une alerte
      alert("Ce nom fait déjà parti des membres; veuillez réessayer avec un autre nom !");
    // Sinon
    } else {
      // Si le nombre de membres dans la liste a atteint 50
      if(this.members.length >= 50) {
        // Envoi d'une alerte
        alert("Vous avez atteint la limite de membres d'équipage !");
      // Sinon
      } else {
        // Requête POST pour ajouter un membre à la BDD
        this.http.post('https://upbeat-lamport-af75f5.netlify.app/.netlify/functions/create_member', this.checkoutForm.value.name).subscribe((response: any) => {
          // Ajout du nouveau membre à la BDD
          this.members.push({id: response.ref["@ref"].id, name: response.data.name});
        })
      }
      // Reset du formulaire
      this.checkoutForm.reset();
    }
  }

  // Au clic du bouton de suppression
  onDelete(memberId: string, memberName: string): void {
    // Requête POST pour supprimer le membre sélectionné de la BDD
    this.http.post('https://upbeat-lamport-af75f5.netlify.app/.netlify/functions/delete_member', memberId).subscribe((response) => {
      // Suppresion du membre sélectionné de la liste
      this.members.splice(this.members.findIndex((x:any) => x.name === memberName),1);
    })
  }
}
