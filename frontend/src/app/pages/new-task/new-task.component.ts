import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/task.service';
import {Task} from 'src/app/models/tasks.model'
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router) { }
  listId:string
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.listId=params['listId']
      //console.log(this.listId)
    });
  }
      
  createNewTask(title:string){
    this.taskService.createTask(this.listId,title).subscribe((newTask:Task)=>{
        this.router.navigate(['../'],{relativeTo:this.route})
    })
  }
}
