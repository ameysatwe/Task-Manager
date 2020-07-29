import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/task.service';
import {List} from 'src/app/models/list.model'
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  lists:List;
  constructor(private taskService:TaskService,private router:Router) { }

  ngOnInit(): void {
  }
  createNewList(title:String)
  {
    console.log("tikde")
      this.taskService.createList(title).subscribe((list:List)=>{
        console.log(list)
        this.router.navigate(['/lists',list._id])
      })
  }
  //now we navigate to /lists/response._id
  
}
