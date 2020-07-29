import { Injectable } from '@angular/core';
import { Task } from './app/models/tasks.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService:WebRequestService) { }

  createList(title:String)
  {
    return this.webReqService.post("lists",{ title })
  }
  getLists(){
    return this.webReqService.get("lists")
  }
  getTasks(listid:string){
    return this.webReqService.get(`lists/${listid}/tasks`)
  }
  createTask(listid:string,title:String)
  {
    return this.webReqService.post(`lists/${listid}/tasks`,{ title })
  }
  complete(task:Task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed:!task.completed
    })
  }
}
