import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../shared/services/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  public collection !: any[];
  public active !: number;
  constructor(private service: CollectionService) { }

  ngOnInit(): void {
    this.getCollection();
  }


  getCollection(): void {
    this.service.getAll().subscribe(data => {
      this.collection = data
    })
  }

  setImageData(event: any): void {
    let imageData: any = { name: event.target.files[0].name }
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      imageData.path = event.target?.result;
      this.service.create(imageData).subscribe(() => {
        this.getCollection()
      })
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  deleteImage(id : number){
    setTimeout(() => {
      this.service.delete(id).subscribe(() => {
        this.getCollection()
        this.active = -1;
      })
    }, 3000);

  }
}
