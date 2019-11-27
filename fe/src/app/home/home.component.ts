import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToDoItem, items, addToDo, loadToDos } from '../store/to-do';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../services/todo-services/todo.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  toDoItems: any[];

  constructor(public dialog: MatDialog, private store: Store<AppState>, private service: TodoService) {

    this.getTodos();

  }

  animal: string;
  name: string;

  private getTodos() {
    this.service.getTodos().subscribe((result: any) => {
      if (result.status === 'success') {
        const toDoItems = result.items;
        this.store.dispatch(loadToDos({ items: toDoItems }));
        this.store.pipe(select(items)).subscribe((resu) => {
          this.toDoItems = resu;
        });
      }
    });
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddToDoModal, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      this.getTodos();
    });
  }

  deactivate(todoId) {
    const payload = {
      todoId,
      status: 'deactivate'
    }
    this.service.changeStatus(payload).subscribe((result: any) => {
      if (result.status === 'success') {
        this.getTodos()
      }
    })
  }
  markAsDone(todoId) {
    const payload = {
      todoId,
      status: 'completed'
    }
    this.service.changeStatus(payload).subscribe((result: any) => {
      if (result.status === 'success') {
        this.getTodos()
      }
    })

  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class AddToDoModal {

  constructor(
    public dialogRef: MatDialogRef<AddToDoModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, private service: TodoService) { }

  todoForm = this.fb.group({
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
  })

  addTodo() {
    if (this.todoForm.valid) {
      const payload = {
        title: this.todoForm.controls.title.value,
        description: this.todoForm.controls.description.value,
        status: 'active'
      }
      this.service.addTodo(payload).subscribe((result: any) => {
        if (result.status === 'success') {
          this.dialogRef.close();
        }
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}