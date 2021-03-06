import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { Main, MainDataId, RawDataId, RawDataType } from 'src/app/Interface/RawDataInterface';
import { BackendService } from 'src/app/services/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  componentName: string = "BOARD";

  // public rawData: RawDataType;

  filterSprintNumber: string;

  constructor(private db: AngularFirestore, private router: Router, public navbarHandler: NavbarHandlerService, public backendService: BackendService) { }

  ngOnInit(): void {
    // Better way of use db.
    // this.rawCollection = this.db.collection<RawDataType>('RawData');
    // this.rawData = this.rawCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as RawDataType;
    //     this.currentSprintNumber = data.CurrentSprintId;
    //     this.currentSprintName = "S"+this.currentSprintNumber;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    // Efficient for now
    this.getCurrentSprint();
    this.readCurrentSprintData();
  }

  // Reading data as get() method

  // async getCurrentSprint() {
  //   this.rawDocument = this.db.doc<RawDataType>('Main/RawData');
  //   try {
  //     await this.rawDocument.ref.get().then(doc=> {
  //       if(doc.exists){
  //         var rawData = doc.data();
  //         this.currentSprintNumber = rawData.CurrentSprintId;
  //         this.currentSprintName = "S" + this.currentSprintNumber;
  //       } else {
  //         console.error("Document does not exists!")
  //       }
  //     });
  //     return "Success";
  //   } catch (error) {
  //     return "Error";
  //   }

  // }

  // Reading synchronous snapshot of data

  getCurrentSprint() {
    this.backendService.getCurrentSprint();

  }

  readCurrentSprintData() {
    this.backendService.readCurrentSprintData();
    // this.mainData = this.mainCollection.snapshotChanges().pipe(
    //   map()
    // )
  }

  showTasks(category: string) {
    this.router.navigate(['/Tasks', category, this.backendService.currentSprintName])
  }

  changeCurrentSprint(currentSprintNumber: number) {
    this.backendService.setCurrentSprint(currentSprintNumber);
  }
}
