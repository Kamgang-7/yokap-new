import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { OperationsService } from '../services/operations.service';
import { BdoperationsService } from '../services/bdoperations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.page.html',
  styleUrls: ['./operation.page.scss'],
})
// interface Operation {
//   value: string;
//   label: string;
// }
export class OperationPage implements OnInit {
  
students:any[]=[];
  amount!: number
  operationType!: String
  label!: String
  date!: string
  total: number = 0
  etudiant:any={}
  transactionForm: any = {};


getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return formattedTime;
}
getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
  // operationType: string | null = null;
  // operationType: string = '';
  constructor(private alertController: AlertController, private http: HttpClient, public platform: Platform, private modalController: ModalController, private storage: Storage, private storage3: Storage, private storage2: Storage, private router: Router, private operationsService: OperationsService, private bdoperations:BdoperationsService,private toastController: ToastController) {
    this.transactionForm = {}; 
   }
  
  async ngOnInit() {
    // await this.storage1.create();
    await this.storage3.create();
    this.date = new Date().toISOString();
    // this.bdoperations.getdepot("operate").then((rep: any[])=>{
    //   this.students=rep
    // }) ;
  }
  // operations: Operation[] = [
  //   { value: 'entrée', label: 'Enregistrer une entrée' },
  //   { value: 'sortie', label: 'Enregistrer une sortie' },
  //   { value: 'pret', label: 'Faire un prêt' },
  //   { value: 'credit', label: 'Emprunter un crédit' },
  //   { value: 'epargne', label: 'Epargner' }
  // ];
  // saveoperationt(transactionData: FormData){
  //     this.bdoperations.newtrans(transactionData)
  //       .subscribe(
  //         (response) => {
  //           // Gérez la réponse de la sauvegarde de la transaction
  //           console.log('Transaction enregistrée avec succès !');
  //         },
  //         (error) => {
  //           // Gérez les erreurs de sauvegarde de transaction
  //           console.error('Erreur lors de l\'enregistrement de la transaction :', error);
  //         }
  //       );
    
  //   }
 
  saveoperationt(formData: any) {
    const formDataObject = new FormData();
    formDataObject.append('montant', formData.montant);
    formDataObject.append('dateenregistrement', formData.dateenregistrement);
    formDataObject.append('heureenregistrement', formData.heureenregistrement);
    formDataObject.append('type', formData.type);

    this.http.post('http://localhost/transactions/newtrans', formDataObject)
      .subscribe(
        (response) => {
          console.log('Transaction successful:', response);
          // Traitez la réponse ici
        },
        (error) => {
          console.error('Transaction failed:', error);
          // Traitez l'erreur ici
        }
      );
  }
  async sauvegarder() {

    console.log("Type d'opération : " + this.operationType + '\n', "Montant : " + this.amount + ' FCFA\n', "Libellé : " + this.label + '\n', "Date d'enregistrement : " + this.date);
    if (this.operationType === 'entrée' || this.operationType === 'epargne' || this.operationType === 'credit') {
      this.total += this.amount;
    } else if ((this.operationType === 'sortie' || this.operationType === 'pret') && this.amount < this.total) {
      this.total -= this.amount;
    } else if ((this.operationType === 'sortie' || this.operationType === 'pret') && this.amount > this.total) {
      alert("Solde insuffisant !!!!");
    }
    // handler: (data) => {
    //   if(data.total) {
    //     this.saveTotal(data.total);
    //   }
    // }
  // await this.operationsService.set('Total', this.total);
    this.storage3.set('total', this.total);
    console.log("Total : " + this.total + " FCFA");
    this.bdoperations.getoperations("detail",this.etudiant)
    if(this.etudiant.montant==undefined){
    this.presentToast('veillez remplir le formulaire')
    }else {
      this.presentToast('etudiant enregistrer avec succes')
    }
    console.log(this.etudiant)
    }
    async presentToast(message:string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 1000
      });
      toast.present()
  }
  
  saveTotal(){}
  // this.storage2.set('libelle', this.libelle);

}
